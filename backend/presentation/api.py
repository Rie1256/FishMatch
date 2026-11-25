# BACKEND
"""Presentation layer: JSON API + the single-page web interface. Calls only go downward to application/."""
import json
import os
import re
from http.cookies import SimpleCookie
import socket
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

import config
from application import admin, auth, orders, buyer_mgmt, fish_mgmt, google_auth, mailer, matching, passkeys, recovery, user_mgmt

# the FRONTEND folder sits next to backend/
STATIC = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "frontend")
STATIC_FILES = {"/style.css": "text/css", "/app.js": "application/javascript", "/i18n.js": "application/javascript",
                "/logo.png": "image/png", "/logo-light.png": "image/png", "/favicon.png": "image/png"}
COOKIE = "fm_session"  # renamed per port in make_server: browsers share cookies between localhost ports, which logged people out
ROUTES = []


class Ctx:
    def __init__(self, user, body, args, token, host=""):
        self.user, self.body, self.args, self.token, self.host = user, body, args, token, host
        self.new_token, self.clear = None, False


def route(method, pattern, needs_login=True):
    def deco(fn):
        ROUTES.append((method, re.compile("^" + pattern + "$"), needs_login, fn))
        return fn
    return deco


def _is_fisher(c):
    return c.user["role"] == "fisherfolk"


@route("POST", "/api/register", False)
def _register(c):
    c.new_token, user = auth.register(c.body)
    return 201, user


@route("POST", "/api/login", False)
def _login(c):
    c.new_token, user = auth.login(c.body.get("email"), c.body.get("password"))
    if c.body.get("remember") is True:  # "Save my login on this device"
        user = dict(user, device_token=auth.remember_device(user["id"]))
    return 200, user


@route("POST", "/api/login/saved", False)
def _login_saved(c):
    c.new_token, user = auth.login_saved(c.body.get("token"))
    return 200, user


@route("POST", "/api/login/forget", False)
def _login_forget(c):
    auth.forget_device(c.body.get("token"))
    return 200, {"ok": True}


@route("GET", "/api/config", False)
def _config(c):
    return 200, {"google_client_id": google_auth.client_id(), "email_configured": mailer.configured()}


@route("POST", "/api/password/forgot", False)
def _forgot(c):
    return 200, recovery.request_reset(c.body)


@route("POST", "/api/password/reset", False)
def _reset(c):
    return 200, recovery.reset_password(c.body)


@route("POST", "/api/google", False)
def _google(c):
    c.new_token, data = google_auth.login(c.body.get("credential"))
    return 200, data


@route("POST", "/api/google/complete", False)
def _google_complete(c):
    c.new_token, user = google_auth.complete(c.body)
    return 201, user


@route("POST", "/api/passkey/login/options", False)
def _pk_login_options(c):
    return 200, passkeys.login_options(c.host)


@route("POST", "/api/passkey/login", False)
def _pk_login(c):
    c.new_token, user = passkeys.login(c.host, c.body)
    return 200, user


@route("GET", "/api/passkeys")
def _pk_list(c):
    from data_access import passkey_repo
    return 200, passkey_repo.list_for(c.user["id"])


@route("POST", "/api/passkeys/options")
def _pk_reg_options(c):
    return 200, passkeys.register_options(c.user, c.host)


@route("POST", "/api/passkeys")
def _pk_register(c):
    return 201, passkeys.register(c.user, c.host, c.body)


@route("DELETE", r"/api/passkeys/(\d+)")
def _pk_delete(c):
    return 200, passkeys.remove(c.user, c.args[0])


@route("DELETE", "/api/me")
def _delete_me(c):
    out = user_mgmt.delete_account(c.user, c.body)
    c.clear = True
    return 200, out


@route("POST", "/api/logout", False)
def _logout(c):
    auth.logout(c.token)
    c.clear = True
    return 200, {"ok": True}


@route("GET", "/api/me", False)
def _me(c):
    return 200, {"user": c.user}


@route("PUT", "/api/me")
def _update_me(c):
    return 200, user_mgmt.update_profile(c.user, c.body)


@route("POST", "/api/orders")
def _buy(c):
    return 201, orders.buy(c.user, c.body)


@route("GET", "/api/orders")
def _orders(c):
    return 200, orders.history(c.user)


@route("POST", r"/api/orders/(\d+)/(complete|cancel)")
def _order_finish(c):
    return 200, orders.finish(c.user, c.args[0], c.args[1])


@route("POST", r"/api/users/(\d+)/report")
def _report(c):
    return 200, admin.report(c.user, c.args[0], c.body)


@route("GET", "/api/admin/users")
def _admin_users(c):
    return 200, admin.users(c.user)


@route("POST", "/api/admin/ban")
def _ban(c):
    return 200, admin.ban(c.user, c.body)


@route("POST", "/api/admin/unban")
def _unban(c):
    return 200, admin.unban(c.user, c.body)


@route("GET", "/api/stats")
def _stats(c):
    return 200, (fish_mgmt if _is_fisher(c) else buyer_mgmt).stats(c.user)


@route("GET", "/api/listings")
def _my_listings(c):
    return 200, fish_mgmt.my_listings(c.user)


@route("POST", "/api/listings")
def _post_listing(c):
    return 201, fish_mgmt.post_listing(c.user, c.body)


@route("GET", r"/api/listings/(\d+)")
def _listing(c):
    return 200, fish_mgmt.get_details(c.user, int(c.args[0]))


@route("PUT", r"/api/listings/(\d+)")
def _edit_listing(c):
    return 200, fish_mgmt.update_listing(c.user, int(c.args[0]), c.body)


@route("GET", "/api/market")
def _market(c):
    return 200, fish_mgmt.market(c.user)


@route("POST", r"/api/listings/(\d+)/sold")
def _sold(c):
    return 200, fish_mgmt.mark_sold(c.user, int(c.args[0]))


@route("DELETE", r"/api/listings/(\d+)")
def _del_listing(c):
    return 200, fish_mgmt.delete_listing(c.user, int(c.args[0]))


@route("GET", "/api/requirements")
def _reqs(c):
    return 200, buyer_mgmt.list_requirements(c.user)


@route("POST", "/api/requirements")
def _submit_req(c):
    req = buyer_mgmt.submit_requirement(c.user, c.body)
    found = matching.run_matching(c.user)
    return 201, {"requirement": req, "matches": len([m for m in found if m["requirement_id"] == req["id"]])}


@route("DELETE", r"/api/requirements/(\d+)")
def _cancel_req(c):
    return 200, buyer_mgmt.cancel_requirement(c.user, int(c.args[0]))


@route("POST", "/api/match")
def _match(c):
    auth.require_role(c.user, "buyer")
    return 200, matching.run_matching(c.user)


@route("GET", "/api/matches")
def _matches(c):
    return 200, (matching.for_owner if _is_fisher(c) else matching.for_buyer)(c.user)


class Handler(BaseHTTPRequestHandler):
    def log_message(self, *args):
        pass

    def _send(self, code, body, ctype="application/json", cookie=None):
        data = body if isinstance(body, bytes) else json.dumps(body, default=str).encode()
        self.send_response(code)
        self.send_header("Content-Type", ctype if ctype.startswith("image/") else ctype + "; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        if cookie:
            self.send_header("Set-Cookie", cookie)
        self.end_headers()
        self.wfile.write(data)

    def _token(self):
        t = (self.headers.get("X-Session-Token") or "").strip()  # sent by the page itself: works even when the browser drops cookies
        if t:
            return t
        c = SimpleCookie(self.headers.get("Cookie") or "")
        return c[COOKIE].value if COOKIE in c else None

    def _dispatch(self, method):
        path = self.path.split("?")[0]
        if not path.startswith("/api/"):
            name, ctype = ("index.html", "text/html") if path not in STATIC_FILES else (path.lstrip("/"), STATIC_FILES[path])
            with open(os.path.join(STATIC, name), "rb") as f:
                return self._send(200, f.read(), ctype)
        match = None
        for m, rx, needs_login, fn in ROUTES:
            found = rx.match(path) if m == method else None
            if found:
                match = (needs_login, fn, found.groups())
                break
        if not match:
            return self._send(404, {"error": "Not found."})
        needs_login, fn, args = match
        token = self._token()
        try:
            if method != "GET" and self.headers.get("X-Requested-With") != "fishmatch":
                raise auth.Forbidden("Request blocked.")
            body = {}
            n = int(self.headers.get("Content-Length") or 0)
            if n:
                if n > 700000:
                    raise ValueError("Request too large.")
                body = json.loads(self.rfile.read(n).decode("utf-8"))
                if not isinstance(body, dict):
                    raise ValueError("Bad request.")
            user = auth.user_from_token(token)
            if needs_login and not user:
                raise auth.AuthError("Please log in.")
            ctx = Ctx(user, body, args, token, self.headers.get("Host") or "")
            code, data = fn(ctx)
            cookie = None
            # On localhost the page may be shown inside another page (e.g. VS Code's built-in browser). Browsers then
            # treat our cookie as "third-party" and drop it unless it is SameSite=None; Secure (localhost counts as secure).
            host = (self.headers.get("Host") or "").split(":")[0]
            ua = self.headers.get("User-Agent") or ""
            safari = "Safari" in ua and not any(b in ua for b in ("Chrome", "Chromium", "Edg", "Android"))
            # Safari drops "Secure" cookies on plain http://localhost, so it gets SameSite=Lax instead
            same_site = "SameSite=None; Secure" if host in ("localhost", "127.0.0.1") and not safari else "SameSite=Lax"
            if ctx.new_token:
                cookie = "%s=%s; HttpOnly; Path=/; %s" % (COOKIE, ctx.new_token, same_site)
            if ctx.new_token and isinstance(data, dict):
                data = dict(data, session_token=ctx.new_token)
            if not ctx.new_token and ctx.clear:
                cookie = "%s=; HttpOnly; Path=/; %s; Max-Age=0" % (COOKIE, same_site)
            return self._send(code, data, cookie=cookie)
        except auth.AuthError as e:
            return self._send(401, {"error": str(e)})
        except auth.Forbidden as e:
            return self._send(403, {"error": str(e)})
        except LookupError as e:
            return self._send(404, {"error": str(e.args[0] if e.args else "Not found.")})
        except (ValueError, UnicodeDecodeError) as e:
            return self._send(400, {"error": str(e)})

    def do_GET(self):
        self._dispatch("GET")

    def do_POST(self):
        self._dispatch("POST")

    def do_PUT(self):
        self._dispatch("PUT")

    def do_DELETE(self):
        self._dispatch("DELETE")


class _Server(ThreadingHTTPServer):
    """On Windows, SO_REUSEADDR lets two servers share one port and requests bounce between them (random 'session ended').
    Take the port exclusively there, so a second copy fails loudly instead."""
    allow_reuse_address = not hasattr(socket, "SO_EXCLUSIVEADDRUSE")

    def server_bind(self):
        if hasattr(socket, "SO_EXCLUSIVEADDRUSE"):
            self.socket.setsockopt(socket.SOL_SOCKET, socket.SO_EXCLUSIVEADDRUSE, 1)
        super().server_bind()


def make_server(host, port):
    srv = _Server((host, port), Handler)
    global COOKIE
    COOKIE = "fm_session_%d" % srv.server_address[1]
    return srv
