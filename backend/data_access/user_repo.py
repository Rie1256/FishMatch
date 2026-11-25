# BACKEND
from database import db


def create(name, email, password_hash, role, phone, location, has_password=1):
    return db.execute("INSERT INTO users(name,email,password_hash,role,phone,location,has_password) VALUES(?,?,?,?,?,?,?)",
                      (name, email.lower(), password_hash, role, phone, location, has_password))


def set_password(uid, password_hash):
    db.execute("UPDATE users SET password_hash=?, has_password=1 WHERE id=?", (password_hash, uid))


def delete(uid):
    """Also removes the user's listings, requirements, matches, saved logins and fingerprints (ON DELETE CASCADE)."""
    db.execute("DELETE FROM users WHERE id=?", (uid,))


def get_by_id(uid):
    return db.fetch_one("SELECT * FROM users WHERE id=?", (uid,))


def get_by_email(email):
    return db.fetch_one("SELECT * FROM users WHERE email=?", (str(email).strip().lower(),))


def list_by_email(email):
    """Several accounts may share one email, so login checks each one's password."""
    return db.fetch_all("SELECT * FROM users WHERE email=? ORDER BY id", (str(email).strip().lower(),))


def update(uid, name, phone, location, bio, avatar=None):
    """avatar None = leave unchanged, '' = remove, otherwise a data URL."""
    if avatar is None:
        db.execute("UPDATE users SET name=?, phone=?, location=?, bio=? WHERE id=?", (name, phone, location, bio, uid))
    else:
        db.execute("UPDATE users SET name=?, phone=?, location=?, bio=?, avatar=? WHERE id=?",
                   (name, phone, location, bio, avatar, uid))
