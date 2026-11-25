# BACKEND
"""Add, list, remove and use fingerprint (passkey) logins."""
import hashlib
import os
import secrets
import time

import config
from application import auth, webauthn
from data_access import passkey_repo, user_repo

CHALLENGE_TTL = 300
_challenges = {}  # key -> (challenge b64url, expires_at)


def _rp_id(host):
    return str(host or "").split(":")[0].lower()


def _origins(host):
    out = {"http://" + str(host), "https://" + str(host)}
    if config.get("public_origin"):
        out.add(config.get("public_origin").rstrip("/"))
    return out


def _new_challenge(key):
    now = time.time()
    for k in [k for k, v in _challenges.items() if v[1] < now]:
        _challenges.pop(k, None)
    ch = webauthn.b64u_enc(os.urandom(32))
    _challenges[key] = (ch, now + CHALLENGE_TTL)
    return ch


def _take_challenge(key):
    v = _challenges.pop(key, None)  # one use only
    if not v or v[1] < time.time():
        raise ValueError("Fingerprint check expired. Please try again.")
    return v[0]


def register_options(user, host):
    return {"challenge": _new_challenge(("reg", user["id"])),
            "rp": {"name": "FishMatch", "id": _rp_id(host)},
            "user": {"id": webauthn.b64u_enc(str(user["id"]).encode()), "name": user["email"], "displayName": user["name"]},
            "exclude": passkey_repo.credential_ids(user["id"])}


def register(user, host, d):
    expected = _take_challenge(("reg", user["id"]))
    webauthn.check_client_data(webauthn.b64u_dec(d.get("clientDataJSON")), "webauthn.create", expected, _origins(host))
    cred_id, key, ad = webauthn.parse_attestation(webauthn.b64u_dec(d.get("attestationObject")))
    webauthn.check_flags(ad["flags"], ad["rp_hash"], _rp_id(host))
    cid = webauthn.b64u_enc(cred_id)
    if passkey_repo.get_by_credential(cid):
        raise ValueError("This fingerprint is already added.")
    import json
    label = (str(d.get("label") or "").strip() or "This device")[:40]
    passkey_repo.create(user["id"], cid, json.dumps(key), ad["count"], label)
    return passkey_repo.list_for(user["id"])


def login_options(host):
    cid = secrets.token_urlsafe(16)
    return {"cid": cid, "challenge": _new_challenge(("login", cid)), "rpId": _rp_id(host)}


def login(host, d):
    import json
    expected = _take_challenge(("login", str(d.get("cid"))))
    row = passkey_repo.get_by_credential(str(d.get("id") or ""))
    if not row:
        raise auth.AuthError("This fingerprint is not registered here. Log in with your password first, then add it in Settings.")
    raw_cd, ad_raw = webauthn.b64u_dec(d.get("clientDataJSON")), webauthn.b64u_dec(d.get("authenticatorData"))
    webauthn.check_client_data(raw_cd, "webauthn.get", expected, _origins(host))
    ad = webauthn.parse_auth_data(ad_raw)
    webauthn.check_flags(ad["flags"], ad["rp_hash"], _rp_id(host))
    signed = ad_raw + hashlib.sha256(raw_cd).digest()
    if not webauthn.verify_signature(json.loads(row["public_key"]), signed, webauthn.b64u_dec(d.get("signature"))):
        raise auth.AuthError("Fingerprint could not be verified.")
    if (ad["count"] or row["sign_count"]) and ad["count"] <= row["sign_count"]:
        raise auth.AuthError("This fingerprint login looks copied. It was blocked.")  # replay / cloned key protection
    user = user_repo.get_by_id(row["user_id"])
    if not user:
        raise auth.AuthError("Account not found.")
    passkey_repo.touch(row["id"], ad["count"])
    return auth._new_session(user["id"]), auth.public(user)


def remove(user, pid):
    passkey_repo.delete(user["id"], int(pid))
    return passkey_repo.list_for(user["id"])
