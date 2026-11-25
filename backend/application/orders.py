# BACKEND
"""Buying: reserves kg from a listing (atomically), keeps history, and lets either side cancel (kg goes back)."""
import math
from contextlib import closing
from application import auth
from database import db

MAX_OPEN = 10  # a buyer can hold at most this many unfinished orders, so one fake account cannot lock up the market


def _int(v, what):
    try:
        return int(v)
    except (TypeError, ValueError):
        raise ValueError("Invalid %s." % what)


def buy(user, d):
    auth.require_role(user, "buyer")
    lid, kg = _int(d.get("listing_id"), "listing"), None
    try:
        kg = round(float(d.get("kg")), 2)
    except (TypeError, ValueError):
        raise ValueError("Enter how many kg you want to buy.")
    if not math.isfinite(kg) or kg <= 0 or kg > 100000:
        raise ValueError("Enter a valid number of kg.")
    with closing(db.connect()) as c:
        l = c.execute("SELECT l.*, u.banned FROM fish_listings l JOIN users u ON u.id=l.owner_id WHERE l.id=?", (lid,)).fetchone()
        if not l or l["status"] != "active" or l["banned"]:
            raise LookupError("This fish is no longer available.")
        if kg < l["min_order_kg"]:
            raise ValueError("The minimum order is %g kg." % l["min_order_kg"])
        if c.execute("SELECT COUNT(*) FROM orders WHERE buyer_id=? AND status='reserved'", (user["id"],)).fetchone()[0] >= MAX_OPEN:
            raise ValueError("You have too many open orders. Wait for the sellers to finish or cancel some.")
        cur = c.execute("UPDATE fish_listings SET quantity_kg=ROUND(quantity_kg-?,2) WHERE id=? AND status='active' AND quantity_kg>=?", (kg, lid, kg))
        if cur.rowcount != 1:  # someone else bought first, or not enough left
            c.rollback()
            raise ValueError("Only %g kg is left. Choose a smaller amount." % l["quantity_kg"])
        c.execute("UPDATE fish_listings SET status='sold' WHERE id=? AND quantity_kg<=0", (lid,))
        oid = c.execute("INSERT INTO orders(listing_id,seller_id,buyer_id,species,quantity_kg,price_per_kg,total) VALUES(?,?,?,?,?,?,?)",
                        (lid, l["owner_id"], user["id"], l["species"], kg, l["price_per_kg"], round(kg * l["price_per_kg"], 2))).lastrowid
        c.commit()
    return {"id": oid, "kg": kg}


def history(user):
    mine, other = ("seller_id", "buyer_id") if user["role"] == "fisherfolk" else ("buyer_id", "seller_id")
    return db.fetch_all(
        "SELECT o.*, u.name AS other_name, u.phone AS other_phone FROM orders o JOIN users u ON u.id=o.%s WHERE o.%s=? ORDER BY o.id DESC LIMIT 300"
        % (other, mine), (user["id"],))


def finish(user, oid, action):
    o = db.fetch_one("SELECT * FROM orders WHERE id=?", (_int(oid, "order"),))
    if not o or user["id"] not in (o["seller_id"], o["buyer_id"]):
        raise LookupError("Order not found.")
    if o["status"] != "reserved":
        raise ValueError("This order is already %s." % o["status"])
    if action == "complete":
        if user["id"] != o["seller_id"]:
            raise auth.Forbidden("Only the seller can mark an order as completed.")
        db.execute("UPDATE orders SET status='completed' WHERE id=?", (o["id"],))
    else:  # cancel: the kg go back on sale
        db.transaction([("UPDATE orders SET status='cancelled' WHERE id=?", (o["id"],)),
                        ("UPDATE fish_listings SET quantity_kg=ROUND(quantity_kg+?,2), status='active' WHERE id=? AND status IN ('active','sold')", (o["quantity_kg"], o["listing_id"]))])
    return {"ok": True}
