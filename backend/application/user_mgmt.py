# BACKEND
import re

from application import auth
from application.validation import text
from data_access import reset_repo, user_repo


def _avatar(d):
    """None = leave unchanged, '' = remove, otherwise a validated image data URL."""
    v = d.get("avatar")
    if v is None:
        return None
    v = str(v)
    if v == "":
        return ""
    if not re.match(r"^data:image/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$", v):
        raise ValueError("Profile picture must be a JPG, PNG or WebP image.")
    if len(v) > 300000:
        raise ValueError("That picture is too large. Choose a smaller one.")
    return v


def update_profile(user, d):
    if not user:
        raise auth.AuthError("Please log in.")
    name = text(d, "name", "Name", maxlen=80)
    phone = text(d, "phone", "Mobile number", maxlen=30)
    location = text(d, "location", "Location", maxlen=80)
    bio = text(d, "bio", "About you", required=False, maxlen=300)
    user_repo.update(user["id"], name, phone, location, bio, _avatar(d))
    return auth.public(user_repo.get_by_id(user["id"]))


def delete_account(user, d):
    """Permanently delete the account and everything it owns. Needs the password (or, for Google accounts, the email)."""
    if not user:
        raise auth.AuthError("Please log in.")
    row = user_repo.get_by_id(user["id"])
    if row["has_password"]:
        if not auth.verify_password(str(d.get("password") or ""), row["password_hash"]):
            raise ValueError("Wrong password. Your account was not deleted.")
    elif str(d.get("confirm") or "").strip().lower() != row["email"]:
        raise ValueError("Type your email exactly to confirm.")
    user_repo.delete(row["id"])
    reset_repo.delete(row["email"])
    auth.drop_sessions(row["id"])
    return {"ok": True}
