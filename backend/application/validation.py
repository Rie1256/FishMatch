# BACKEND
"""Shared input checks. Raise ValueError with a message the user can act on."""
import re
from datetime import date, datetime

_EMAIL = re.compile(r"^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*"
                    r"@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,24}$")


def clean_email(value):
    """Lower-case, trimmed, and checked to be a real-looking address. One email = one account."""
    v = str(value or "").strip().lower()
    if not v:
        raise ValueError("Email is required.")
    if len(v) > 254 or len(v.split("@")[0]) > 64 or not _EMAIL.match(v):
        raise ValueError("Enter a valid email address, like name@gmail.com.")
    return v

FRESHNESS = ("fresh", "good", "fair")


def text(d, key, label, required=True, maxlen=120):
    v = d.get(key)
    v = "" if v is None else str(v).strip()
    if required and not v:
        raise ValueError("%s is required." % label)
    if len(v) > maxlen:
        raise ValueError("%s is too long." % label)
    return v


def number(d, key, label):
    try:
        v = float(d.get(key))
    except (TypeError, ValueError):
        raise ValueError("%s must be a number." % label)
    if not (0 < v <= 10000000):
        raise ValueError("%s must be greater than 0." % label)
    return v


def day(d, key):
    v = str(d.get(key) or "").strip() or date.today().isoformat()
    try:
        datetime.strptime(v, "%Y-%m-%d")
    except ValueError:
        raise ValueError("Catch date must look like 2026-11-21.")
    return v


def choice(d, key, label, options, default):
    v = str(d.get(key) or default).strip().lower()
    if v not in options:
        raise ValueError("%s must be one of: %s." % (label, ", ".join(options)))
    return v


def breakdown(rows, key, limit=3):
    """Share of total kg per key value, largest first."""
    totals = {}
    for r in rows:
        totals[r[key]] = totals.get(r[key], 0) + r["quantity_kg"]
    whole = sum(totals.values()) or 1
    out = [{"name": k, "kg": round(v, 1), "pct": round(100.0 * v / whole)} for k, v in totals.items()]
    return sorted(out, key=lambda x: -x["kg"])[:limit]
