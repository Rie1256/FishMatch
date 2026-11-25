# BACKEND
"""Forgot password: a 6-digit code is emailed, then the person picks a new password."""
import hashlib
import hmac
import secrets
import time

from application import auth, mailer
from application.validation import clean_email
from data_access import device_repo, reset_repo, user_repo

CODE_TTL = 15 * 60
MAX_ATTEMPTS = 5
RESEND_WAIT = 60
BAD_CODE = "That code is wrong or expired. Ask for a new one."


def _chash(email, code):
    return hashlib.sha256((email + ":" + code).encode()).hexdigest()


def request_reset(d):
    email = clean_email(d.get("email"))
    user = user_repo.get_by_email(email)
    if user:
        row = reset_repo.get(email)
        if not (row and time.time() - row["last_sent"] < RESEND_WAIT):
            code = "%06d" % secrets.randbelow(10 ** 6)
            reset_repo.save(email, _chash(email, code), time.time() + CODE_TTL, time.time())
            mailer.send(email, "Your FishMatch password reset code",
                        "Hello %s,\n\nYour FishMatch password reset code is: %s\n\nIt works for 15 minutes. "
                        "If you did not ask for this, you can ignore this email.\n" % (user["name"], code))
    # same answer whether or not the email has an account, so nobody can probe who is registered
    return {"ok": True, "email_configured": mailer.configured()}


def reset_password(d):
    email = clean_email(d.get("email"))
    code = str(d.get("code") or "").strip()
    password = str(d.get("password") or "")
    if len(password) < 6:
        raise ValueError("Password must be at least 6 characters.")
    row = reset_repo.get(email)
    users = user_repo.list_by_email(email)
    if not row or not users or row["expires_at"] < time.time() or row["attempts"] >= MAX_ATTEMPTS:
        if row:
            reset_repo.delete(email)
        raise ValueError(BAD_CODE)
    if not hmac.compare_digest(row["code_hash"], _chash(email, code)):
        reset_repo.add_attempt(email)
        raise ValueError(BAD_CODE)
    for user in users:
        user_repo.set_password(user["id"], auth.hash_password(password))
        reset_repo.delete(email)
        device_repo.delete_for_user(user["id"])  # saved logins on all devices stop working
        auth.drop_sessions(user["id"])           # and everyone is logged out
    return {"ok": True}
