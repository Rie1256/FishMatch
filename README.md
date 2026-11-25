# FishMatch – Fish Buyer Matching Platform

Needs only Python 3.8+ (standard library, no installs).

```
fishmatch/
├── frontend/          FRONTEND  what the user sees in the browser
│   ├── index.html       page shell
│   ├── style.css        all design (teal theme, login, dashboard, profile)
│   ├── logo.png         FishMatch logo (for light backgrounds)
│   ├── logo-light.png   same logo, light version for the dark teal panels
│   ├── favicon.png      browser tab icon
│   └── app.js           pages, forms, search, profile, calls the backend
├── app.py, seed.py, run.bat, run.sh   shortcuts to start the backend
├── backend/           BACKEND   the server, rules and database
│   ├── app.py           start the server
│   ├── seed.py          optional demo accounts and sample fish
│   ├── config.example.json  copy to config.json for Google login and email
│   ├── presentation/    api.py: the /api routes, also serves the frontend files
│   ├── application/     auth, profile, fish, requirements, matching
│   ├── data_access/     reads and writes the tables
│   ├── database/        SQLite schema (db.py)
│   └── tests/           smoke_test.py
└── fishmatch.db       created on first run
```

## Run it

Open Command Prompt / Terminal **inside the `fishmatch` folder** (the one that has `backend` and `frontend`), then:

```bash
python seed.py      # optional: demo accounts and sample fish
python app.py       # then open http://localhost:8000
```

Windows: you can also just double-click `run.bat`. Mac/Linux: `./run.sh` (use `python3` if `python` is not found).
It also works from inside the `backend` folder (`cd backend`, then the same two commands).

People simply **Create account** on the Register page. (`python seed.py` is optional and only loads sample accounts and fish for testing: `fisher@demo.com`, `fisher2@demo.com`, `buyer@demo.com`, password `demo123`.)

**Always open the site as `http://localhost:8000`** (not `127.0.0.1`), because fingerprint login does not work on an IP address.

Run the tests: `cd backend`, then `python tests/smoke_test.py` and `python tests/test_accounts.py` (the second one uses the `cryptography` package for its fake fingerprint device; it skips that part if you do not have it).

## Features

- Fisherfolk post fish with a photo, source (wild or farmed), delivery option and minimum order, then edit, mark sold or delete. Buyers browse and search all active fish.
- Profile: every user can add a profile picture and a short bio. They are saved in the database (`users.avatar`, `users.bio`), so they are still there at the next login. Sellers' pictures show on Browse fish and listing details. 
- Saved logins are turned off: nothing is remembered between visits, and you are logged out when you close the browser (or press Log out).
- Location is saved as **Municipality, Province** (e.g. `Calamba, Laguna`). The dropdown has all municipalities and cities of Metro Manila, CALABARZON and Bicol; for other provinces, type it in the same format (add more in `MUNI` in `frontend/app.js`). Same province gives partial location points in matching.
- Email already on the device: the login page fills in your last-used email, uses the browser's saved logins (Chrome/Edge/Android), and, once Google login is set up, shows Google One Tap with the accounts already signed in on that phone or laptop.
- Search: fish and location boxes are searchable dropdowns (type to filter, or type your own text). Manage listings, Manage requirements and Matching results have a fish + location search bar.

## Accounts, security and settings

- **The same email or mobile number can be used again.** Emails must be valid (like `name@gmail.com`) and are stored in lower case. Log in checks the password against every account with that email, so the only thing refused is the very same email *and* the very same password. Your account, profile and picture are saved in the database.
- **Settings** page (sidebar): **Light / Dark / Match my device** mode (remembered on that device), add or remove **fingerprint** logins, forget saved logins on this device, and **Delete account** (asks for your password; Google accounts type their email). Deleting removes the account, its listings, requirements, matches, saved logins and fingerprints.
- **Forgot password:** enter your email, get a 6-digit code (valid 15 minutes, 5 tries, one new code per minute), then choose a new password. This logs the account out everywhere. The answer is the same whether or not the email has an account.
- **Fingerprint login (passkeys):** Settings, then *Add fingerprint on this device*. After that the login page has *Log in with fingerprint* (no email or password needed). It uses your device's own fingerprint / face / PIN (Windows Hello, Touch ID, Android). Only a public key is stored. It needs `http://localhost:8000` (or https on a real domain).
- **Continue with Google** (Login and Create account) needs a Google client ID, see below. Without it the button explains that setup is needed.

### Turn on Google login
1. Go to https://console.cloud.google.com, create a project, then *APIs & Services* → *OAuth consent screen* (External, add your app name and email).
2. *Credentials* → *Create credentials* → *OAuth client ID* → *Web application*. Under *Authorized JavaScript origins* add `http://localhost:8000` (and your real website address later).
3. Copy the **Client ID**. Copy `backend/config.example.json` to `backend/config.json` and put it in `google_client_id`. Restart the server.

New Google users are asked for their role, mobile number and location, because matching needs them. An existing account with the same email just logs in.

### Turn on real emails (forgot password)
Without email settings, the reset code is printed in the server window (fine for testing on your own computer). To send real emails, fill in `smtp_host`, `smtp_port`, `smtp_user`, `smtp_password` and `smtp_from` in `backend/config.json`. For Gmail use `smtp.gmail.com`, port `587`, and a Google *App password* (not your normal password). Never share `config.json`.

## How the backend is layered

Calls only go downward: presentation → application → data access → database.

| Layer | Folder | Job |
|---|---|---|
| Presentation | `backend/presentation/` | `api.py` routes, serves `frontend/` |
| Application | `backend/application/` | Authentication, Account Validation, Role-Based Access Control, profile, fish, requirements, matching |
| Data Access | `backend/data_access/` | `user_repo`, `fish_repo`, `buyer_repo`, `match_repo` |
| Database | `backend/database/db.py` | users, fish_listings, buyer_requirements, match_results (SQLite) |

## Weighted matching

Score out of 100 = species 40 + price 25 + quantity 15 + location 10 + freshness 10.
A listing must be the requested species and score at least 50. Change `WEIGHTS` and `MIN_SCORE` in `backend/application/matching.py`.

## Prototype limits (before real use)

- Sessions are HttpOnly cookies that expire after 7 days and are kept in memory (restarting the server logs everyone out). State-changing requests need an `X-Requested-With` header as basic CSRF protection. Add HTTPS before deploying.
- Location matching is text-based (exact = full points, partial text = half).
- No messaging or ordering yet; buyers see the fisherfolk's phone and email on the details page.

## History, buying and banning fake accounts
- **Buying:** a buyer opens a listing and enters how many kg to buy. The kg are taken off the listing at once (safe even if two people buy at the same time). When it reaches 0 the listing is marked sold. Either side can cancel an open order and the kg go back on sale.
- **History:** the *History* page lists every sale (fisherfolk) or purchase (buyer) with date, quantity, total and the other person.
- **Fake accounts:** any user can press *Report this account* on a listing. Admins see reports on the *Admin* page and can **Ban** (logged out everywhere, can never log in, listings removed, open orders cancelled) or **Unban**.
- **Make an admin:** create the account normally, then run `python make_admin.py you@email.com` and log in again.
