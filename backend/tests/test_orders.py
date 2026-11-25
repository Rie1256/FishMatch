# BACKEND
"""Checks for: buying reduces kg, history, cancel restores kg, reports, admin ban. Run: python tests/test_orders.py"""
import os
import sys
import tempfile

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ["FISHMATCH_DB"] = os.path.join(tempfile.mkdtemp(), "orders.db")

from application import admin, auth, fish_mgmt, orders  # noqa: E402
from data_access import fish_repo  # noqa: E402
from database import db  # noqa: E402
from database.db import init_db  # noqa: E402

init_db()
fails = []


def check(name, ok):
    print(("PASS  " if ok else "FAIL  ") + name)
    if not ok:
        fails.append(name)


def raises(fn, exc):
    try:
        fn()
    except exc:
        return True
    except Exception:
        return False
    return False


def acct(email, role):
    _, u = auth.register({"name": "Test " + role, "email": email, "password": "Passw0rd!", "role": role, "phone": "09171234567", "location": "Bulan, Sorsogon"}), None
    return auth.public(db.fetch_one("SELECT * FROM users WHERE email=?", (email,)))


seller, buyer, buyer2, boss = acct("s@x.com", "fisherfolk"), acct("b@x.com", "buyer"), acct("b2@x.com", "buyer"), acct("a@x.com", "buyer")
db.execute("UPDATE users SET is_admin=1 WHERE id=?", (boss["id"],))
boss = auth.public(db.fetch_one("SELECT * FROM users WHERE id=?", (boss["id"],)))
lid = fish_repo.create(seller["id"], {"species": "Tilapia", "quantity_kg": 10, "price_per_kg": 100, "location": "Bulan, Sorsogon", "freshness": "fresh",
                                      "catch_date": "2026-11-25", "notes": "", "photo": "", "source": "wild", "delivery": "pickup", "min_order_kg": 1})
kg_left = lambda: fish_repo.get(lid)["quantity_kg"]

orders.buy(buyer, {"listing_id": lid, "kg": 4})
check("buying 4 kg leaves 6 kg", kg_left() == 6)
check("cannot buy more than what is left", raises(lambda: orders.buy(buyer2, {"listing_id": lid, "kg": 7}), ValueError) and kg_left() == 6)
check("cannot buy below the minimum order", raises(lambda: orders.buy(buyer2, {"listing_id": lid, "kg": 0.5}), ValueError))
check("a fisherfolk cannot buy", raises(lambda: orders.buy(seller, {"listing_id": lid, "kg": 1}), auth.Forbidden))
check("bad numbers are rejected", raises(lambda: orders.buy(buyer2, {"listing_id": lid, "kg": "nan"}), ValueError) and raises(lambda: orders.buy(buyer2, {"listing_id": lid, "kg": -3}), ValueError))
orders.buy(buyer2, {"listing_id": lid, "kg": 6})
check("buying the rest marks the listing sold", kg_left() == 0 and fish_repo.get(lid)["status"] == "sold")
check("sold-out fish cannot be bought", raises(lambda: orders.buy(buyer, {"listing_id": lid, "kg": 1}), LookupError))
check("buyer history shows own order", [o["quantity_kg"] for o in orders.history(buyer)] == [4])
check("seller history shows both sales", len(orders.history(seller)) == 2)
o1 = orders.history(buyer)[0]["id"]
check("a stranger cannot cancel", raises(lambda: orders.finish(boss, o1, "cancel"), LookupError))
check("buyer cannot mark completed", raises(lambda: orders.finish(buyer, o1, "complete"), auth.Forbidden))
orders.finish(buyer, o1, "cancel")
check("cancelling puts the kg back on sale", kg_left() == 4 and fish_repo.get(lid)["status"] == "active")
orders.finish(seller, orders.history(buyer2)[0]["id"], "complete")
check("seller can complete an order", orders.history(buyer2)[0]["status"] == "completed")

check("normal user cannot ban", raises(lambda: admin.ban(buyer, {"user_id": seller["id"]}), auth.Forbidden))
check("report needs a reason", raises(lambda: admin.report(buyer, seller["id"], {"reason": ""}), ValueError))
admin.report(buyer, buyer2["id"], {"reason": "Fake buyer"})
check("admin sees the report", [u["reports"] for u in admin.users(boss) if u["id"] == buyer2["id"]] == [1])
tok = auth.login("s@x.com", "Passw0rd!")[0]
check("seller session works before ban", auth.user_from_token(tok) is not None)
admin.ban(boss, {"user_id": seller["id"], "reason": "Fake account"})
check("ban kills the session", auth.user_from_token(tok) is None)
check("banned account cannot log in", raises(lambda: auth.login("s@x.com", "Passw0rd!"), auth.Forbidden))
check("ban removes their listings from sale", fish_repo.get(lid)["status"] == "removed")
check("admins cannot be banned", raises(lambda: admin.ban(boss, {"user_id": boss["id"]}), auth.Forbidden))
admin.unban(boss, {"user_id": seller["id"]})
check("unban lets them log in again", auth.login("s@x.com", "Passw0rd!")[0] is not None)
print("\nAll checks passed." if not fails else "\nFAILED: %d" % len(fails))
sys.exit(1 if fails else 0)
