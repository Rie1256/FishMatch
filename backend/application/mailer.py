# BACKEND
"""Sends email through your SMTP account (see config.py). With no SMTP set up, the message is printed in the
server window instead, so you can still test password reset on your own computer."""
import smtplib
import ssl
from email.message import EmailMessage

import config


def configured():
    return bool(config.get("smtp_host"))


def send(to, subject, body):
    if not configured():
        print("\n[FishMatch - email is not set up, so this is shown here instead]\nTo: %s\nSubject: %s\n%s\n" % (to, subject, body))
        return False
    msg = EmailMessage()
    msg["To"], msg["Subject"] = to, subject
    msg["From"] = config.get("smtp_from") or config.get("smtp_user")
    msg.set_content(body)
    try:
        host, port = config.get("smtp_host"), int(config.get("smtp_port", "587") or 587)
        if port == 465:
            server = smtplib.SMTP_SSL(host, port, timeout=15, context=ssl.create_default_context())
        else:
            server = smtplib.SMTP(host, port, timeout=15)
            server.starttls(context=ssl.create_default_context())
        with server:
            if config.get("smtp_user"):
                server.login(config.get("smtp_user"), config.get("smtp_password"))
            server.send_message(msg)
        return True
    except Exception as e:  # never crash a request because email failed
        print("[FishMatch] Could not send email:", e)
        return False
