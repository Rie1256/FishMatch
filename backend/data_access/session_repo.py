# BACKEND
"""Login sessions, stored in the database so they survive a server restart. Only a hash of the token is stored."""
from database import db


def create(token_hash, user_id, expires_at):
    db.execute("INSERT INTO sessions(token_hash,user_id,expires_at) VALUES(?,?,?)", (token_hash, user_id, expires_at))


def get(token_hash):
    return db.fetch_one("SELECT * FROM sessions WHERE token_hash=?", (token_hash,))


def delete(token_hash):
    db.execute("DELETE FROM sessions WHERE token_hash=?", (token_hash,))


def delete_for_user(user_id):
    db.execute("DELETE FROM sessions WHERE user_id=?", (user_id,))
