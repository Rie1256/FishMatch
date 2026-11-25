# BACKEND
"""Checks for: email rules, forgot password, Google login (mocked), delete account, fingerprint (passkey) login.
Run: python tests/test_accounts.py     (the fingerprint part needs the 'cryptography' package only for this test)"""
import base64
import hashlib
import json
import os
import struct
import sys
import tempfile
import threading
import urllib.error
import urllib.request
from http.cookiejar import CookieJar, DefaultCookiePolicy

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ["FISHMATCH_DB"] = os.path.join(tempfile.mkdtemp(), "test2.db")
os.environ["FISHMATCH_GOOGLE_CLIENT_ID"] = "test-client-id.apps.googleusercontent.com"

from application import google_auth, mailer, passkeys  # noqa: E402
from database.db import init_db  # noqa: E402
from presentation.api import make_server  # noqa: E402

init_db()
server = make_server("127.0.0.1", 0)
PORT = server.server_address[1]
BASE = "http://127.0.0.1:%d" % PORT
threading.Thread(target=server.serve_forever, daemon=True).start()

SENT = []
mailer.send = lambda to, subject, body: SENT.append((to, body)) or True   # catch "emails" instead of printing


class Client:
    def __init__(self):
        self.op = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(CookieJar(DefaultCookiePolicy(secure_protocols=("http", "https")))))

    def call(self, method, path, body=None):
        req = urllib.request.Request(BASE + path, method=method, data=json.dumps(body).encode() if body is not None else None,
                                     headers={"Content-Type": "application/json", "X-Requested-With": "fishmatch"})
        try:
            r = self.op.open(req)
            return r.status, json.loads(r.read())
        except urllib.error.HTTPError as e:
            return e.code, json.loads(e.read())


def check(label, cond):
    print(("PASS  " if cond else "FAIL  ") + label)
    if not cond:
        sys.exit(1)


reg = lambda n, e, pw="secret1": {"name": n, "email": e, "password": pw, "role": "fisherfolk", "phone": "0917-111-2222", "location": "Batangas"}

# ---------- email rules ----------
for bad in ["abc", "a@b", "a@b..com", "a b@x.com", "@x.com", "a@.com", "a@x.c", "a@@x.com", ".a@x.com"]:
    code, r = Client().call("POST", "/api/register", reg("X", bad))
    check("rejects invalid email %r" % bad, code == 400 and "valid email" in r["error"].lower())
c1 = Client()
check("valid email registers", c1.call("POST", "/api/register", reg("Juan", "Juan.Cruz@Gmail.com"))[0] == 201)
code, r = Client().call("POST", "/api/register", reg("Other", "juan.cruz@gmail.com"))
check("same email + same password is blocked", code == 400 and "already exists" in r["error"])
check("same email with another password is allowed", Client().call("POST", "/api/register", dict(reg("Other", "juan.cruz@gmail.com"), password="another1"))[0] == 201)
check("login works with different capital letters", Client().call("POST", "/api/login", {"email": "JUAN.CRUZ@GMAIL.COM", "password": "secret1"})[0] == 200)

# ---------- forgot password ----------
code, r = Client().call("POST", "/api/password/forgot", {"email": "nobody@x.com"})
check("forgot: unknown email gets the same OK answer (no probing)", code == 200 and r["ok"] and not SENT)
code, r = Client().call("POST", "/api/password/forgot", {"email": "not-an-email"})
check("forgot: invalid email rejected", code == 400)
dev = Client()
code, u = dev.call("POST", "/api/login", {"email": "juan.cruz@gmail.com", "password": "secret1", "remember": True})
tok = u["device_token"]
Client().call("POST", "/api/password/forgot", {"email": "juan.cruz@gmail.com"})
check("forgot: code emailed to the right address", len(SENT) == 1 and SENT[0][0] == "juan.cruz@gmail.com")
code6 = [w for w in SENT[0][1].split() if w.isdigit() and len(w) == 6][0]
Client().call("POST", "/api/password/forgot", {"email": "juan.cruz@gmail.com"})
check("forgot: asking again within a minute does not send a new code", len(SENT) == 1)
check("reset: short password rejected", Client().call("POST", "/api/password/reset", {"email": "juan.cruz@gmail.com", "code": code6, "password": "123"})[0] == 400)
check("reset: wrong code rejected", Client().call("POST", "/api/password/reset", {"email": "juan.cruz@gmail.com", "code": "000000" if code6 != "000000" else "111111", "password": "newpass1"})[0] == 400)
code, _ = Client().call("POST", "/api/password/reset", {"email": "juan.cruz@gmail.com", "code": code6, "password": "newpass1"})
check("reset: right code sets the new password", code == 200)
check("reset: old password no longer works", Client().call("POST", "/api/login", {"email": "juan.cruz@gmail.com", "password": "secret1"})[0] == 401)
check("reset: new password works", Client().call("POST", "/api/login", {"email": "juan.cruz@gmail.com", "password": "newpass1"})[0] == 200)
check("reset: code cannot be used twice", Client().call("POST", "/api/password/reset", {"email": "juan.cruz@gmail.com", "code": code6, "password": "again123"})[0] == 400)
check("reset: saved logins on other devices were revoked", Client().call("POST", "/api/login/saved", {"token": tok})[0] == 401)
check("reset: old open session was logged out", c1.call("GET", "/api/me")[1]["user"] is None)
# brute force: 5 wrong guesses kill the code
Client().call("POST", "/api/register", reg("Ana", "ana@x.com"))
import application.recovery as rec  # noqa: E402
import time  # noqa: E402
rec.RESEND_WAIT = 0
Client().call("POST", "/api/password/forgot", {"email": "ana@x.com"})
good = [w for w in SENT[-1][1].split() if w.isdigit() and len(w) == 6][0]
for _ in range(5):
    Client().call("POST", "/api/password/reset", {"email": "ana@x.com", "code": "999999" if good != "999999" else "888888", "password": "zzzzzz1"})
check("reset: 5 wrong guesses lock the code", Client().call("POST", "/api/password/reset", {"email": "ana@x.com", "code": good, "password": "zzzzzz1"})[0] == 400)

# ---------- Google login (Google's server is mocked) ----------
def fake_google(email, aud=os.environ["FISHMATCH_GOOGLE_CLIENT_ID"], verified="true", iss="https://accounts.google.com"):
    google_auth._fetch = lambda url: {"aud": aud, "iss": iss, "exp": str(time.time() + 600), "email": email, "email_verified": verified, "name": "Maria Santos"}


g = Client()
fake_google("maria@gmail.com")
code, r = g.call("POST", "/api/google", {"credential": "tok"})
check("google: new email asks for role/phone/location", code == 200 and r.get("needs_profile") and r["email"] == "maria@gmail.com")
check("google: not logged in before finishing", g.call("GET", "/api/me")[1]["user"] is None)
check("google: finishing needs a role", g.call("POST", "/api/google/complete", {"ticket": r["ticket"], "phone": "09171234567", "location": "Cavite"})[0] == 400)
r2 = g.call("POST", "/api/google", {"credential": "tok"})[1]
code, u = g.call("POST", "/api/google/complete", {"ticket": r2["ticket"], "role": "buyer", "phone": "09171234567", "location": "Cavite"})
check("google: account created and logged in", code == 201 and u["email"] == "maria@gmail.com" and u["has_password"] == 0 and g.call("GET", "/api/me")[1]["user"]["name"] == "Maria Santos")
check("google: ticket cannot be reused", g.call("POST", "/api/google/complete", {"ticket": r2["ticket"], "role": "buyer", "phone": "09171234567", "location": "Cavite"})[0] == 400)
code, u = Client().call("POST", "/api/google", {"credential": "tok"})
check("google: same email next time just logs in", code == 200 and u["user"]["email"] == "maria@gmail.com")
check("google: Google-only account cannot use password login", "Google" in Client().call("POST", "/api/login", {"email": "maria@gmail.com", "password": "x"})[1]["error"])
fake_google("hacker@gmail.com", aud="someone-elses-app")
check("google: token for another app rejected", Client().call("POST", "/api/google", {"credential": "t"})[0] == 401)
fake_google("hacker@gmail.com", verified="false")
check("google: unverified email rejected", Client().call("POST", "/api/google", {"credential": "t"})[0] == 401)
fake_google("hacker@gmail.com", iss="evil.example")
check("google: wrong issuer rejected", Client().call("POST", "/api/google", {"credential": "t"})[0] == 401)
fake_google("ana@x.com")
code, u = Client().call("POST", "/api/google", {"credential": "t"})
check("google: logs in to an existing password account with the same email ", code == 200 and u["user"]["email"] == "ana@x.com")
os.environ["FISHMATCH_GOOGLE_CLIENT_ID"] = ""
check("google: clear message when not set up", "not set up" in Client().call("POST", "/api/google", {"credential": "t"})[1]["error"])
os.environ["FISHMATCH_GOOGLE_CLIENT_ID"] = "test-client-id.apps.googleusercontent.com"

# ---------- delete account ----------
d = Client()
d.call("POST", "/api/register", reg("Pedro", "pedro@x.com"))
d.call("POST", "/api/listings", {"species": "Bangus", "quantity_kg": 50, "price_per_kg": 150, "location": "Batangas", "freshness": "fresh"})
code, r = d.call("DELETE", "/api/me", {"password": "wrong"})
check("delete: wrong password refuses", code == 400 and d.call("GET", "/api/me")[1]["user"] is not None)
code, r = d.call("DELETE", "/api/me", {"password": "secret1"})
check("delete: right password deletes and logs out", code == 200 and d.call("GET", "/api/me")[1]["user"] is None)
check("delete: account is really gone", Client().call("POST", "/api/login", {"email": "pedro@x.com", "password": "secret1"})[0] == 401)
check("delete: email can be registered again", Client().call("POST", "/api/register", reg("Pedro 2", "pedro@x.com"))[0] == 201)
check("delete: Google account needs the email typed", g.call("DELETE", "/api/me", {"confirm": "wrong@x.com"})[0] == 400 and g.call("DELETE", "/api/me", {"confirm": "maria@gmail.com"})[0] == 200)

# ---------- fingerprint (passkey) login with a software authenticator ----------
try:
    from cryptography.hazmat.primitives import hashes
    from cryptography.hazmat.primitives.asymmetric import ec
except ImportError:
    print("SKIP  fingerprint tests (pip install cryptography to run them)")
    print("\nAll checks passed.")
    sys.exit(0)

b64 = lambda b: base64.urlsafe_b64encode(b).rstrip(b"=").decode()
unb64 = lambda s: base64.urlsafe_b64decode(s + "=" * (-len(s) % 4))


def enc(x):  # tiny CBOR writer
    def head(m, n):
        return bytes([m << 5 | n]) if n < 24 else bytes([m << 5 | 24, n]) if n < 256 else bytes([m << 5 | 25]) + n.to_bytes(2, "big")
    if isinstance(x, bool) or x is None:
        raise TypeError
    if isinstance(x, int):
        return head(0, x) if x >= 0 else head(1, -1 - x)
    if isinstance(x, bytes):
        return head(2, len(x)) + x
    if isinstance(x, str):
        return head(3, len(x.encode())) + x.encode()
    if isinstance(x, dict):
        return head(5, len(x)) + b"".join(enc(k) + enc(v) for k, v in x.items())


class Device:
    """Pretends to be a phone/laptop with a fingerprint reader."""
    def __init__(self):
        self.key = ec.generate_private_key(ec.SECP256R1())
        self.cred_id = os.urandom(32)
        self.count = 0

    def _cd(self, typ, challenge, origin=BASE):
        return json.dumps({"type": typ, "challenge": challenge, "origin": origin}).encode()

    def create(self, opts, origin=BASE, flags=0x45):
        n = self.key.public_key().public_numbers()
        cose = enc({1: 2, 3: -7, -1: 1, -2: n.x.to_bytes(32, "big"), -3: n.y.to_bytes(32, "big")})
        ad = hashlib.sha256(b"127.0.0.1").digest() + bytes([flags]) + struct.pack(">I", 0) + b"\0" * 16 + len(self.cred_id).to_bytes(2, "big") + self.cred_id + cose
        return {"clientDataJSON": b64(self._cd("webauthn.create", opts["challenge"], origin)), "attestationObject": b64(enc({"fmt": "none", "attStmt": {}, "authData": ad})), "label": "Test phone"}

    def get(self, opts, origin=BASE, flags=0x05, bump=1, tamper=False):
        self.count += bump
        ad = hashlib.sha256(b"127.0.0.1").digest() + bytes([flags]) + struct.pack(">I", self.count)
        cd = self._cd("webauthn.get", opts["challenge"], origin)
        sig = self.key.sign(ad + hashlib.sha256(cd).digest() + (b"x" if tamper else b""), ec.ECDSA(hashes.SHA256()))
        return {"cid": opts["cid"], "id": b64(self.cred_id), "clientDataJSON": b64(cd), "authenticatorData": b64(ad), "signature": b64(sig)}


f = Client()
f.call("POST", "/api/register", reg("Lito", "lito@x.com"))
phone = Device()
check("fingerprint: needs login to add one", Client().call("POST", "/api/passkeys/options")[0] == 401)
code, opts = f.call("POST", "/api/passkeys/options")
check("fingerprint: registration options", code == 200 and len(opts["challenge"]) > 30 and opts["rp"]["id"] == "127.0.0.1")
check("fingerprint: wrong website origin rejected", f.call("POST", "/api/passkeys", phone.create(opts, origin="http://evil.example"))[0] == 400)
opts = f.call("POST", "/api/passkeys/options")[1]
check("fingerprint: reader that did not check the finger (no UV) rejected", f.call("POST", "/api/passkeys", phone.create(opts, flags=0x41))[0] == 400)
opts = f.call("POST", "/api/passkeys/options")[1]
code, lst = f.call("POST", "/api/passkeys", phone.create(opts))
check("fingerprint: added and listed", code == 201 and len(lst) == 1 and lst[0]["label"] == "Test phone")
opts = f.call("POST", "/api/passkeys/options")[1]
check("fingerprint: same device cannot be added twice", f.call("POST", "/api/passkeys", phone.create(opts))[0] == 400)

lo = Client().call("POST", "/api/passkey/login/options")[1]
w = Client()
code, u = w.call("POST", "/api/passkey/login", phone.get(lo))
check("fingerprint: login works without email or password", code == 200 and u["email"] == "lito@x.com" and w.call("GET", "/api/me")[1]["user"]["email"] == "lito@x.com")
check("fingerprint: same answer cannot be replayed", Client().call("POST", "/api/passkey/login", phone.get(lo, bump=0))[0] == 400)
lo = Client().call("POST", "/api/passkey/login/options")[1]
check("fingerprint: tampered signature rejected", Client().call("POST", "/api/passkey/login", phone.get(lo, tamper=True))[0] == 401)
lo = Client().call("POST", "/api/passkey/login/options")[1]
check("fingerprint: wrong origin rejected", Client().call("POST", "/api/passkey/login", phone.get(lo, origin="http://evil.example"))[0] == 400)
lo = Client().call("POST", "/api/passkey/login/options")[1]
check("fingerprint: no user verification rejected", Client().call("POST", "/api/passkey/login", phone.get(lo, flags=0x01))[0] == 400)
lo = Client().call("POST", "/api/passkey/login/options")[1]
phone.count = 1  # the server last saw 1
check("fingerprint: copied key (counter goes backwards) blocked", Client().call("POST", "/api/passkey/login", phone.get(lo, bump=-1))[0] == 401)
lo = Client().call("POST", "/api/passkey/login/options")[1]
stranger = Device()
check("fingerprint: unknown device rejected", Client().call("POST", "/api/passkey/login", stranger.get(lo))[0] == 401)
lo = Client().call("POST", "/api/passkey/login/options")[1]
phone.count = 10
check("fingerprint: counter going up still works", Client().call("POST", "/api/passkey/login", phone.get(lo, bump=1))[0] == 200)
pid = f.call("GET", "/api/passkeys")[1][0]["id"]
check("fingerprint: other user cannot remove it", (Client().call("DELETE", "/api/passkeys/%d" % pid)[0] == 401))
check("fingerprint: removed", f.call("DELETE", "/api/passkeys/%d" % pid)[1] == [])
lo = Client().call("POST", "/api/passkey/login/options")[1]
check("fingerprint: removed device can no longer log in", Client().call("POST", "/api/passkey/login", phone.get(lo))[0] == 401)
print("\nAll checks passed.")
