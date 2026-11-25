"""Make an account an admin (can ban fake accounts):  python make_admin.py you@email.com"""
import sys
sys.path.insert(0, "backend")
from database import db
db.init_db()
if len(sys.argv) < 2:
    sys.exit("Usage: python make_admin.py you@email.com")
email = sys.argv[1].strip().lower()
if not db.fetch_one("SELECT id FROM users WHERE email=?", (email,)):
    sys.exit("No account with that email. Create the account first.")
db.execute("UPDATE users SET is_admin=1 WHERE email=?", (email,))
print("Done. %s is now an admin. Log out and log in again to see the Admin page." % email)
