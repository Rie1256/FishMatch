# BACKEND
"""Fingerprint / device-unlock logins (passkeys). Only the PUBLIC key is stored, never the fingerprint."""
from database import db


def create(user_id, credential_id, public_key, sign_count, label):
    return db.execute("INSERT INTO passkeys(user_id,credential_id,public_key,sign_count,label) VALUES(?,?,?,?,?)",
                      (user_id, credential_id, public_key, sign_count, label))


def get_by_credential(credential_id):
    return db.fetch_one("SELECT * FROM passkeys WHERE credential_id=?", (credential_id,))


def list_for(user_id):
    return db.fetch_all("SELECT id, label, created_at, last_used FROM passkeys WHERE user_id=? ORDER BY id", (user_id,))


def credential_ids(user_id):
    return [r["credential_id"] for r in db.fetch_all("SELECT credential_id FROM passkeys WHERE user_id=?", (user_id,))]


def touch(pid, sign_count):
    db.execute("UPDATE passkeys SET sign_count=?, last_used=CURRENT_TIMESTAMP WHERE id=?", (sign_count, pid))


def delete(user_id, pid):
    db.execute("DELETE FROM passkeys WHERE id=? AND user_id=?", (pid, user_id))
