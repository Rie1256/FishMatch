# BACKEND
"""Optional settings: Google login and email sending.

Put them in backend/config.json (see config.example.json) or in environment variables named
FISHMATCH_<KEY IN CAPITALS>, for example FISHMATCH_GOOGLE_CLIENT_ID. The environment wins.
"""
import json
import os

_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "config.json")


def get(key, default=""):
    env = os.environ.get("FISHMATCH_" + key.upper())
    if env:
        return env
    try:
        with open(_FILE, encoding="utf-8") as f:
            return str(json.load(f).get(key) or default)
    except (OSError, ValueError, AttributeError):
        return default
