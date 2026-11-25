# BACKEND
"""Authentication, Account Validation, Role-Based Access Control."""
import hashlib
import hmac
import os
import re
import secrets
import time

from application.validation import clean_email, text
from data_access import device_repo, session_repo, user_repo

ROLES = ("fisherfolk", "buyer")
SESSION_TTL = 7 * 24 * 3600
DEVICE_TTL = 30 * 24 * 3600  # a saved login on a device lasts 30 days
_sh = lambda t: hashlib.sha256(t.encode()).hexdigest()


class AuthError(Exception):
    """Not logged in / wrong credentials -> HTTP 401."""


class Forbidden(Exception):
    """Logged in but not allowed -> HTTP 403."""


def _hash(password, salt):
    return hashlib.pbkdf2_hmac("sha256", password.encode(), bytes.fromhex(salt), 120000).hex()


def hash_password(password):
    salt = os.urandom(16).hex()
    return salt + "$" + _hash(password, salt)


def verify_password(password, stored):
    salt, digest = stored.split("$")
    return hmac.compare_digest(_hash(password, salt), digest)


def public(user):
    return {k: v for k, v in user.items() if k != "password_hash"}


# ---- Account Validation ----
def validate_account(d):
    email = clean_email(d.get("email"))
    password = str(d.get("password") or "")
    if len(password) < 6:
        raise ValueError("Password must be at least 6 characters.")
    role = str(d.get("role") or "").strip()
    if role not in ROLES:
        raise ValueError("Choose whether you are a fisherfolk or a fish buyer.")
    phone = text(d, "phone", "Mobile number", maxlen=30)
    if len(re.sub(r"\D", "", phone)) < 7:
        raise ValueError("Enter a valid mobile number.")
    return {"name": text(d, "name", "Name", maxlen=80), "email": email, "password": password,
            "role": role, "phone": phone, "location": text(d, "location", "Location", maxlen=80)}


# ---- Authentication ----
def _new_session(user_id):
    u = user_repo.get_by_id(user_id)
    if u and u.get("banned"):
        raise Forbidden("This account has been banned for suspicious activity. Contact FishMatch support if this is a mistake.")
    token = secrets.token_urlsafe(32)
    session_repo.create(_sh(token), user_id, time.time() + SESSION_TTL)
    return token


def register(d):
    c = validate_account(d)
    # the same email (and mobile number) may be used again; only the very same email + password pair is refused,
    # because then log in could not tell the two accounts apart
    for other in user_repo.list_by_email(c["email"]):
        if other["has_password"] and verify_password(c["password"], other["password_hash"]):
            raise ValueError("An account with this email and password already exists. Log in, or choose a different password.")
    uid = user_repo.create(c["name"], c["email"], hash_password(c["password"]), c["role"], c["phone"], c["location"])
    return _new_session(uid), public(user_repo.get_by_id(uid))


def login(email, password):
    accounts = user_repo.list_by_email(email or "")
    user = next((u for u in accounts if u["has_password"] and verify_password(str(password or ""), u["password_hash"])), None)
    if not user:
        if accounts and not any(u["has_password"] for u in accounts):
            raise AuthError("This account was made with Google. Use the Google button, or Forgot password to set a password.")
        raise AuthError("Wrong email or password.")
    return _new_session(user["id"]), public(user)


# ---- Saved logins ("recent logins" on this device) ----
def _dhash(token):
    return hashlib.sha256(str(token or "").encode()).hexdigest()


def remember_device(user_id):
    """Return a new device token. The browser keeps it; the database keeps only its hash."""
    device_repo.delete_expired(time.time())
    token = secrets.token_urlsafe(32)
    device_repo.create(user_id, _dhash(token), time.time() + DEVICE_TTL)
    return token


def login_saved(token):
    row = device_repo.get(_dhash(token))
    if row and row["expires_at"] < time.time():
        device_repo.delete(row["token_hash"])
        row = None
    user = user_repo.get_by_id(row["user_id"]) if row else None
    if not user:
        raise AuthError("Your saved login expired. Please log in again.")
    return _new_session(user["id"]), public(user)


def forget_device(token):
    if token:
        device_repo.delete(_dhash(token))


def user_from_token(token):
    s = session_repo.get(_sh(token)) if token else None
    if not s:
        return None
    if s["expires_at"] < time.time():
        session_repo.delete(_sh(token))
        return None
    user = user_repo.get_by_id(s["user_id"])
    return public(user) if user and not user.get("banned") else None


def drop_sessions(user_id):
    """Log the user out everywhere (used after a password reset or account deletion)."""
    session_repo.delete_for_user(user_id)


def logout(token):
    if token:
        session_repo.delete(_sh(token))


# ---- Role-Based Access Control ----
def require_role(user, role):
    if not user:
        raise AuthError("Please log in.")
    if user["role"] != role:
        raise Forbidden("Only %s accounts can do this." % ("fisherfolk" if role == "fisherfolk" else "buyer"))
