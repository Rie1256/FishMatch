# BACKEND
"""Fake-account control: people report, admins ban. Ban = logged out everywhere, can never log in, listings removed."""
from application import auth
from database import db


def _admin(user):
    if not user.get("is_admin"):
        raise auth.Forbidden("Admins only.")


def _target(uid):
    try:
        u = db.fetch_one("SELECT * FROM users WHERE id=?", (int(uid),))
    except (TypeError, ValueError):
        u = None
    if not u:
        raise LookupError("User not found.")
    return u


def users(user):
    _admin(user)
    return db.fetch_all(
        "SELECT u.id,u.name,u.email,u.phone,u.role,u.location,u.banned,u.ban_reason,u.created_at,"
        "(SELECT COUNT(*) FROM reports r WHERE r.user_id=u.id) AS reports,"
        "(SELECT COUNT(*) FROM orders o WHERE o.seller_id=u.id OR o.buyer_id=u.id) AS orders "
        "FROM users u WHERE u.is_admin=0 ORDER BY u.banned, reports DESC, u.id DESC")


def ban(user, d):
    _admin(user)
    t = _target(d.get("user_id"))
    if t["is_admin"] or t["id"] == user["id"]:
        raise auth.Forbidden("You cannot ban this account.")
    reason = str(d.get("reason") or "").strip()[:200] or "Fake or suspicious account"
    db.transaction([
        ("UPDATE users SET banned=1, ban_reason=? WHERE id=?", (reason, t["id"])),
        ("DELETE FROM sessions WHERE user_id=?", (t["id"],)),
        ("DELETE FROM device_tokens WHERE user_id=?", (t["id"],)),
        ("DELETE FROM passkeys WHERE user_id=?", (t["id"],)),
        ("UPDATE fish_listings SET status='removed' WHERE owner_id=? AND status='active'", (t["id"],)),
        ("UPDATE buyer_requirements SET status='removed' WHERE buyer_id=? AND status='active'", (t["id"],)),
        ("UPDATE orders SET status='cancelled' WHERE status='reserved' AND (buyer_id=? OR seller_id=?)", (t["id"], t["id"]))])
    return {"ok": True}


def unban(user, d):
    _admin(user)
    t = _target(d.get("user_id"))
    db.execute("UPDATE users SET banned=0, ban_reason='' WHERE id=?", (t["id"],))
    return {"ok": True}


def report(user, uid, d):
    t = _target(uid)
    if t["id"] == user["id"] or t["is_admin"]:
        raise ValueError("You cannot report this account.")
    reason = str(d.get("reason") or "").strip()[:200]
    if len(reason) < 3:
        raise ValueError("Please tell us briefly why you are reporting this account.")
    db.execute("INSERT OR REPLACE INTO reports(reporter_id,user_id,reason) VALUES(?,?,?)", (user["id"], t["id"], reason))
    return {"ok": True}
