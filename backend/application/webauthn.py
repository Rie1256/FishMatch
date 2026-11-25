# BACKEND
"""Fingerprint / Face / PIN login with passkeys (WebAuthn), using only the Python standard library.

The browser asks the device (Windows Hello, Touch ID, Android fingerprint...) to unlock a private key that never
leaves the device. We store the PUBLIC key and check the signature. The fingerprint itself is never sent anywhere.
Supports the two algorithms real devices use: ES256 (ECDSA P-256) and RS256.
"""
import base64
import hashlib
import hmac
import json

# ---------- small helpers ----------
def b64u_enc(b):
    return base64.urlsafe_b64encode(b).rstrip(b"=").decode()


def b64u_dec(s):
    try:
        s = str(s)
        return base64.urlsafe_b64decode(s + "=" * (-len(s) % 4))
    except Exception:
        raise ValueError("Bad fingerprint data.")


# ---------- minimal CBOR reader (enough for WebAuthn) ----------
def cbor(data, i=0, depth=0):
    """Read one CBOR item at data[i:]. Returns (value, next_index)."""
    if depth > 8:
        raise ValueError("Bad fingerprint data.")
    try:
        ib = data[i]
        major, info = ib >> 5, ib & 31
        i += 1
        if info < 24:
            val = info
        elif 24 <= info <= 27:
            n = 1 << (info - 24)
            val = int.from_bytes(data[i:i + n], "big")
            i += n
        else:
            raise ValueError
        if major == 0:
            return val, i
        if major == 1:
            return -1 - val, i
        if major in (2, 3):
            chunk = bytes(data[i:i + val])
            if len(chunk) != val:
                raise ValueError
            return (chunk if major == 2 else chunk.decode()), i + val
        if major == 4:
            out = []
            for _ in range(val):
                item, i = cbor(data, i, depth + 1)
                out.append(item)
            return out, i
        if major == 5:
            out = {}
            for _ in range(val):
                k, i = cbor(data, i, depth + 1)
                v, i = cbor(data, i, depth + 1)
                out[k] = v
            return out, i
        if major == 7 and val in (20, 21, 22):
            return {20: False, 21: True, 22: None}[val], i
    except (IndexError, ValueError, UnicodeDecodeError):
        pass
    raise ValueError("Bad fingerprint data.")


# ---------- ECDSA P-256 verify ----------
_P = 0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff
_A = _P - 3
_B = 0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b
_G = (0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296,
      0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5)
_N = 0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551


def _add(p, q):
    if p is None:
        return q
    if q is None:
        return p
    (x1, y1), (x2, y2) = p, q
    if x1 == x2:
        if (y1 + y2) % _P == 0:
            return None
        m = (3 * x1 * x1 + _A) * pow(2 * y1, -1, _P) % _P
    else:
        m = (y2 - y1) * pow(x2 - x1, -1, _P) % _P
    x3 = (m * m - x1 - x2) % _P
    return x3, (m * (x1 - x3) - y1) % _P


def _mul(k, p):
    r = None
    while k:
        if k & 1:
            r = _add(r, p)
        p = _add(p, p)
        k >>= 1
    return r


def _on_curve(x, y):
    return 0 < x < _P and 0 < y < _P and (y * y - (x * x * x + _A * x + _B)) % _P == 0


def _der_sig(sig):
    try:
        if sig[0] != 0x30:
            raise ValueError
        i = 2 if sig[1] < 0x80 else 2 + (sig[1] & 0x7f)
        out = []
        for _ in range(2):
            if sig[i] != 0x02:
                raise ValueError
            n = sig[i + 1]
            out.append(int.from_bytes(sig[i + 2:i + 2 + n], "big"))
            i += 2 + n
        return out
    except (IndexError, ValueError):
        raise ValueError("Bad fingerprint signature.")


def _verify_es256(key, message, sig):
    x, y = int(key["x"], 16), int(key["y"], 16)
    r, s = _der_sig(sig)
    if not (1 <= r < _N and 1 <= s < _N) or not _on_curve(x, y):
        return False
    z = int.from_bytes(hashlib.sha256(message).digest(), "big")
    w = pow(s, -1, _N)
    pt = _add(_mul(z * w % _N, _G), _mul(r * w % _N, (x, y)))
    return pt is not None and pt[0] % _N == r


# ---------- RSASSA-PKCS1-v1_5 SHA-256 verify ----------
_SHA256_PREFIX = bytes.fromhex("3031300d060960864801650304020105000420")


def _verify_rs256(key, message, sig):
    n, e = int(key["n"], 16), int(key["e"], 16)
    k = (n.bit_length() + 7) // 8
    if len(sig) != k or int.from_bytes(sig, "big") >= n:
        return False
    em = pow(int.from_bytes(sig, "big"), e, n).to_bytes(k, "big")
    t = _SHA256_PREFIX + hashlib.sha256(message).digest()
    return hmac.compare_digest(em, b"\x00\x01" + b"\xff" * (k - len(t) - 3) + b"\x00" + t)


def verify_signature(key, message, sig):
    return _verify_es256(key, message, sig) if key["alg"] == -7 else _verify_rs256(key, message, sig)


# ---------- parsing what the browser sends ----------
def key_from_cose(m):
    """COSE key -> {'alg':..., ...} (hex strings, safe to store as JSON)."""
    if not isinstance(m, dict):
        raise ValueError("Bad fingerprint data.")
    if m.get(1) == 2 and m.get(3) == -7 and m.get(-1) == 1:
        x, y = m.get(-2), m.get(-3)
        if not (isinstance(x, bytes) and isinstance(y, bytes) and len(x) == 32 and len(y) == 32):
            raise ValueError("Bad fingerprint key.")
        if not _on_curve(int.from_bytes(x, "big"), int.from_bytes(y, "big")):
            raise ValueError("Bad fingerprint key.")
        return {"alg": -7, "x": x.hex(), "y": y.hex()}
    if m.get(1) == 3 and m.get(3) == -257:
        n, e = m.get(-1), m.get(-2)
        if not (isinstance(n, bytes) and isinstance(e, bytes)) or len(n) < 128:
            raise ValueError("Bad fingerprint key.")
        return {"alg": -257, "n": n.hex(), "e": e.hex()}
    raise ValueError("This device uses a fingerprint type we do not support yet.")


def parse_auth_data(ad):
    if len(ad) < 37:
        raise ValueError("Bad fingerprint data.")
    return {"rp_hash": ad[:32], "flags": ad[32], "count": int.from_bytes(ad[33:37], "big"), "rest": ad[37:]}


def check_client_data(raw, expected_type, expected_challenge, allowed_origins):
    try:
        cd = json.loads(raw.decode("utf-8"))
    except (ValueError, UnicodeDecodeError):
        raise ValueError("Bad fingerprint data.")
    if cd.get("type") != expected_type:
        raise ValueError("Fingerprint check failed (wrong type).")
    if not hmac.compare_digest(str(cd.get("challenge", "")), expected_challenge):
        raise ValueError("Fingerprint check expired. Please try again.")
    if cd.get("origin") not in allowed_origins:
        raise ValueError("Open the site as http://localhost:8000 (not 127.0.0.1) to use fingerprint login.")
    return cd


def check_flags(flags, rp_hash, rp_id):
    if not hmac.compare_digest(rp_hash, hashlib.sha256(rp_id.encode()).digest()):
        raise ValueError("Fingerprint check failed (wrong site).")
    if not flags & 0x01:
        raise ValueError("Fingerprint check failed (no user present).")
    if not flags & 0x04:
        raise ValueError("Your device did not verify your fingerprint or PIN.")


def parse_attestation(att_obj):
    """Return (credential_id bytes, key dict, auth data dict) from a registration response."""
    obj, _ = cbor(att_obj)
    ad = parse_auth_data(obj.get("authData", b"") if isinstance(obj, dict) else b"")
    if not ad["flags"] & 0x40 or len(ad["rest"]) < 18:
        raise ValueError("Bad fingerprint data.")
    rest = ad["rest"]
    n = int.from_bytes(rest[16:18], "big")
    cred_id = rest[18:18 + n]
    cose, _ = cbor(rest, 18 + n)
    return cred_id, key_from_cose(cose), ad
