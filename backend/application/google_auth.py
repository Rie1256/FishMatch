# BACKEND
"""Continue with Google. The browser gets an ID token from Google; we ask Google to verify it, so no Google
library is needed. You must set google_client_id first (see README)."""
import json
import secrets
import time
import urllib.error
import urllib.parse
import urllib.request

import config
from application import auth
from application.validation import clean_email, text
from data_access import user_repo

TOKENINFO = "https://oauth2.googleapis.com/tokeninfo?id_token="
_tickets = {}  # ticket -> (profile, expires_at): Google said the email is real, we still need role/phone/location


def client_id():
    return config.get("google_client_id")


def _fetch(url):
    with urllib.request.urlopen(url, timeout=10) as r:
        return json.loads(r.read().decode("utf-8"))


def verify(credential):
    cid = client_id()
    if not cid:
        raise ValueError("Google login is not set up yet. The owner of this site needs to add a Google client ID (see README).")
    try:
        info = _fetch(TOKENINFO + urllib.parse.quote(str(credential or ""), safe=""))
    except (urllib.error.URLError, ValueError, OSError):
        raise auth.AuthError("Google could not verify this login. Check your internet and try again.")
    if info.get("aud") != cid or info.get("iss") not in ("accounts.google.com", "https://accounts.google.com"):
        raise auth.AuthError("Google login was rejected.")
    if float(info.get("exp") or 0) < time.time() or str(info.get("email_verified")).lower() != "true":
        raise auth.AuthError("Your Google email is not verified.")
    email = clean_email(info.get("email"))
    return {"email": email, "name": str(info.get("name") or email.split("@")[0])[:80]}


def login(credential):
    """Existing account -> logged in. New email -> a ticket, so the person can finish their profile."""
    p = verify(credential)
    user = user_repo.get_by_email(p["email"])
    if user:
        return auth._new_session(user["id"]), {"user": auth.public(user)}
    now = time.time()
    for k in [k for k, v in _tickets.items() if v[1] < now]:
        _tickets.pop(k, None)
    ticket = secrets.token_urlsafe(24)
    _tickets[ticket] = (p, now + 600)
    return None, {"needs_profile": True, "ticket": ticket, "email": p["email"], "name": p["name"]}


def complete(d):
    t = _tickets.pop(str(d.get("ticket") or ""), None)
    if not t or t[1] < time.time():
        raise ValueError("That Google sign-up expired. Please press the Google button again.")
    p = t[0]
    role = str(d.get("role") or "").strip()
    if role not in auth.ROLES:
        raise ValueError("Choose whether you are a fisherfolk or a fish buyer.")
    phone = text(d, "phone", "Mobile number", maxlen=30)
    if len("".join(ch for ch in phone if ch.isdigit())) < 7:
        raise ValueError("Enter a valid mobile number.")
    name = text(d, "name", "Name", required=False, maxlen=80) or p["name"]
    uid = user_repo.create(name, p["email"], auth.hash_password(secrets.token_urlsafe(32)), role, phone,
                           text(d, "location", "Location", maxlen=80), has_password=0)
    return auth._new_session(uid), auth.public(user_repo.get_by_id(uid))
