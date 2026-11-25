# BACKEND
"""One pending password-reset code per email. Only a hash of the code is stored."""
from database import db


def save(email, code_hash, expires_at, last_sent):
    db.execute("INSERT OR REPLACE INTO password_resets(email,code_hash,expires_at,attempts,last_sent) VALUES(?,?,?,0,?)",
               (email, code_hash, expires_at, last_sent))


def get(email):
    return db.fetch_one("SELECT * FROM password_resets WHERE email=?", (email,))


def add_attempt(email):
    db.execute("UPDATE password_resets SET attempts=attempts+1 WHERE email=?", (email,))


def delete(email):
    db.execute("DELETE FROM password_resets WHERE email=?", (email,))
