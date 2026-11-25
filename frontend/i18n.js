/* FRONTEND: language picker (English / Filipino).
   Works by translating the text that app.js puts on the screen, so app.js does not need to change.
   Anything not in the dictionary simply stays in English. To add words, add lines to FIL below.
   To add another language (e.g. Cebuano), copy FIL, translate it, and add it to LANGS. */
(function () {
  const FIL = {
    // ---- login / register / forgot password ----
    'A smarter catch-to-market connection': 'Mas matalinong ugnayan mula huli hanggang palengke',
    'Good catch.': 'Magandang huli.',
    'Better connections.': 'Mas magandang ugnayan.',
    'Bringing fisherfolk and fish buyers closer through a simple, smarter matching experience.': 'Pinalalapit ang mga mangingisda at mamimili ng isda sa simple at mas matalinong pagtutugma.',
    'FishMatch · Fisherfolk and fish buyers': 'FishMatch · Mga mangingisda at mamimili ng isda',
    'Log in': 'Mag-log in',
    'Create account': 'Gumawa ng account',
    'Welcome back': 'Maligayang pagbabalik',
    'Log in to FishMatch': 'Mag-log in sa FishMatch',
    'Enter your account details to continue.': 'Ilagay ang detalye ng iyong account para magpatuloy.',
    'Email address': 'Email address',
    'Forgot password?': 'Nakalimutan ang password?',
    'Save my login on this device (one click next time)': 'I-save ang login ko sa device na ito (isang click na lang sa susunod)',
    'or': 'o',
    'Log in with fingerprint': 'Mag-log in gamit ang fingerprint',
    'Continue with Google': 'Magpatuloy gamit ang Google',
    '← Back to saved logins': '← Bumalik sa mga naka-save na login',
    'Get started': 'Magsimula',
    'Create your account': 'Gawin ang iyong account',
    'Tell us who you are so we can match you.': 'Sabihin kung sino ka para maitugma ka namin.',
    'First name': 'Pangalan',
    'Surname': 'Apelyido',
    'Password (6+ characters)': 'Password (hindi bababa sa 6 na karakter)',
    'New password (6+ characters)': 'Bagong password (hindi bababa sa 6 na karakter)',
    'Mobile number': 'Numero ng cellphone',
    'Location': 'Lokasyon',
    'Municipality or city, province (e.g. Calamba, Laguna)': 'Bayan o lungsod, probinsya (hal. Calamba, Laguna)',
    'I am a': 'Ako ay isang',
    'Fisherfolk': 'Mangingisda',
    'Fish buyer': 'Mamimili ng isda',
    'By creating an account, you agree to share your phone and email with matched buyers or sellers so you can arrange the sale.': 'Sa paggawa ng account, pumapayag kang ibahagi ang iyong numero at email sa mga katugmang mamimili o nagbebenta para maayos ninyo ang bentahan.',
    'Already have an account?': 'May account ka na?',
    'Almost done': 'Halos tapos na',
    'Enter your code': 'Ilagay ang iyong code',
    'We made a 6-digit code for': 'Gumawa kami ng 6-digit na code para sa',
    '. Check your inbox (and spam folder).': '. Tingnan ang iyong inbox (at spam folder).',
    'Email sending is not set up on this computer': 'Hindi pa naka-set up ang pagpapadala ng email sa computer na ito',
    ', so the code is shown in the server window (the Command Prompt that is running FishMatch).': ', kaya ipinapakita ang code sa server window (ang Command Prompt na nagpapatakbo ng FishMatch).',
    '6-digit code': '6-digit na code',
    'Save new password': 'I-save ang bagong password',
    'Use a different email': 'Gumamit ng ibang email',
    'Forgot password': 'Nakalimutan ang password',
    'Reset your password': 'I-reset ang iyong password',
    'Enter the email of your account. We will send you a 6-digit code.': 'Ilagay ang email ng iyong account. Magpapadala kami ng 6-digit na code.',
    'Send code': 'Ipadala ang code',
    '← Back to log in': '← Bumalik sa pag-log in',
    'Almost there': 'Malapit na',
    'Finish your account': 'Tapusin ang iyong account',
    'Google confirmed': 'Kinumpirma ng Google ang',
    '. Tell us a bit more so we can match you.': '. Sabihin pa ang kaunti tungkol sa iyo para maitugma ka namin.',
    'Name': 'Pangalan',
    'Cancel': 'Kanselahin',
    'Show password': 'Ipakita ang password',
    'Language': 'Wika',

    // ---- saved logins / switch account ----
    'Recent logins': 'Mga kamakailang login',
    'Click your picture to log in.': 'I-click ang iyong larawan para mag-log in.',
    'Log in to another account': 'Mag-log in sa ibang account',
    'Saved logins on this device': 'Mga naka-save na login sa device na ito',
    'Use this on a shared computer': 'Gamitin ito sa shared na computer',
    'Forget all saved logins': 'Kalimutan ang lahat ng naka-save na login',
    'Forget all saved logins on this device?': 'Kalimutan ang lahat ng naka-save na login sa device na ito?',
    'Remove from this device': 'Alisin sa device na ito',
    'Remove this account from this device?': 'Alisin ang account na ito sa device na ito?',
    'Switch account': 'Palitan ang account',
    'Log out': 'Mag-log out',
    'Log out and forget this device': 'Mag-log out at kalimutan ang device na ito',
    'Ends this session': 'Tatapusin ang session na ito',
    'You can come back with one click': 'Makakabalik ka sa isang click lang',

    // ---- menu / pages ----
    'Dashboard': 'Dashboard',
    'Post fish': 'Mag-post ng isda',
    'Manage listings': 'Pamahalaan ang mga listing',
    'Matching results': 'Mga resulta ng pagtutugma',
    'Profile': 'Profile',
    'Settings': 'Mga setting',
    'Browse fish': 'Maghanap ng isda',
    'Submit requirement': 'Magsumite ng kailangan',
    'Manage requirements': 'Pamahalaan ang mga kailangan',
    'History': 'Kasaysayan',
    'Admin': 'Admin',
    'View profile': 'Tingnan ang profile',
    'Back to dashboard': 'Bumalik sa dashboard',
    'Something went wrong': 'May nagkamali',

    // ---- fish, listings, matches ----
    'Fish': 'Isda',
    'Species': 'Uri ng isda',
    'Price': 'Presyo',
    'Quantity': 'Dami',
    'Available': 'Available',
    'Seller': 'Nagbebenta',
    'Buyer': 'Mamimili',
    'Wants': 'Gusto',
    'Pays up to': 'Hanggang magkano ang bayad',
    'Your fish': 'Iyong isda',
    'Contact': 'Kontak',
    'Score': 'Puntos',
    'Match score': 'Puntos ng tugma',
    'Freshness': 'Kasariwaan',
    'Details': 'Detalye',
    'Delivery': 'Paghahatid',
    'Source': 'Pinagmulan',
    'Status': 'Katayuan',
    'Total': 'Kabuuan',
    'Date': 'Petsa',
    'Orders': 'Mga order',
    'Reports': 'Mga report',
    'Active': 'Aktibo',
    'Banned': 'Naka-ban',
    'Role': 'Papel',
    'Email': 'Email',
    'Email / phone': 'Email / numero',
    'Best match': 'Pinakamahusay na tugma',
    'Top match': 'Nangungunang tugma',
    'Buy now': 'Bilhin na',
    'Edit': 'I-edit',
    'Delete': 'Burahin',
    'Remove': 'Alisin',
    'Close': 'Isara',
    'Clear': 'I-clear',
    'Ban': 'I-ban',
    'Unban': 'I-unban',
    'Mark sold': 'Markahang naibenta',
    'Mark completed': 'Markahang tapos na',
    'View listing': 'Tingnan ang listing',
    'Find matches': 'Maghanap ng tugma',
    'Refresh matches': 'I-refresh ang mga tugma',
    'See all matches': 'Tingnan ang lahat ng tugma',
    'Save changes': 'I-save ang mga pagbabago',
    'Newest': 'Pinakabago',
    'Lowest price': 'Pinakamababang presyo',
    'Highest price': 'Pinakamataas na presyo',
    'Most available': 'Pinakamaraming available',
    'Good': 'Maganda',
    'Fresh only': 'Sariwa lang',
    'Fair is fine': 'Pwede na ang katamtaman',
    'Lowest freshness': 'Pinakamababang kasariwaan',
    'Search fish': 'Maghanap ng isda',
    'Search fish, e.g. Tilapia': 'Maghanap ng isda, hal. Tilapia',
    'Search location': 'Maghanap ng lokasyon',
    'Max price/kg': 'Pinakamataas na presyo/kg',
    'Max price per kg': 'Pinakamataas na presyo kada kg',
    'Highest price per kg (₱)': 'Pinakamataas na presyo kada kg (₱)',
    'Price per kg (₱)': 'Presyo kada kg (₱)',
    'Quantity available (kg)': 'Dami na available (kg)',
    'Quantity needed (kg)': 'Dami na kailangan (kg)',
    'How many kg do you want?': 'Ilang kg ang gusto mo?',
    'Minimum order (kg, optional)': 'Minimum na order (kg, opsyonal)',
    'Catch or harvest date': 'Petsa ng huli o ani',
    'Notes (optional)': 'Mga tala (opsyonal)',
    'Size, how it was kept, best time to pick up': 'Laki, paano iningatan, pinakamagandang oras ng pagkuha',
    'Photo of your fish': 'Larawan ng iyong isda',
    'Choose photo': 'Pumili ng larawan',
    'Choose picture': 'Pumili ng larawan',
    'Buyers trust listings with a clear photo. JPG, PNG or WebP.': 'Mas pinagkakatiwalaan ng mga mamimili ang listing na may malinaw na larawan. JPG, PNG o WebP.',
    'Tell us what fish you need.': 'Sabihin kung anong isda ang kailangan mo.',
    'per kg': 'kada kg',
    'By species': 'Ayon sa uri',
    'By location': 'Ayon sa lokasyon',
    'Sort': 'Ayusin',
    'No matches yet.': 'Wala pang tugma.',
    'No matches yet. When a buyer asks for fish like yours, they show up here.': 'Wala pang tugma. Kapag may mamimiling naghahanap ng isdang tulad ng sa iyo, lalabas sila dito.',
    ' or check back after fisherfolk post new fish.': ' o bumalik kapag may bagong isda nang na-post ang mga mangingisda.',
    'No requirements yet.': 'Wala pang naisusumiteng kailangan.',
    'No match fits your search.': 'Walang tugma sa hinanap mo.',
    'No listing matches your search.': 'Walang listing na tugma sa hinanap mo.',
    'No requirement matches your search.': 'Walang kailangan na tugma sa hinanap mo.',
    'No fish matches your search. Try a different species or location.': 'Walang isdang tugma sa hinanap mo. Subukan ang ibang uri o lokasyon.',
    'You have not posted any fish yet. Post your first catch so buyers can find it.': 'Wala ka pang na-post na isda. I-post ang una mong huli para makita ito ng mga mamimili.',
    'This fish is sold out.': 'Ubos na ang isdang ito.',

    // ---- profile / settings ----
    'About you (optional)': 'Tungkol sa iyo (opsyonal)',
    'Tell buyers or sellers who you are: what you catch or buy, where, and when you are available.': 'Sabihin sa mga mamimili o nagbebenta kung sino ka: ano ang hinuhuli o binibili mo, saan, at kailan ka available.',
    'Account type': 'Uri ng account',
    'Appearance': 'Itsura',
    'Theme': 'Tema',
    'Choose how FishMatch looks on this device.': 'Piliin kung paano makikita ang FishMatch sa device na ito.',
    'Add fingerprint on this device': 'Magdagdag ng fingerprint sa device na ito',
    'No fingerprint added yet.': 'Wala pang naidagdag na fingerprint.',
    'This browser does not support fingerprint login.': 'Hindi sinusuportahan ng browser na ito ang fingerprint login.',
    'Use your phone or laptop\'s fingerprint, face or PIN instead of typing a password. Your fingerprint never leaves your device. FishMatch only keeps a public key.': 'Gamitin ang fingerprint, mukha o PIN ng iyong phone o laptop imbes na mag-type ng password. Hindi umaalis sa device mo ang fingerprint mo. Public key lang ang itinatabi ng FishMatch.',
    'Delete account': 'Burahin ang account',
    'Delete my account': 'Burahin ang aking account',
    'Delete your account?': 'Burahin ang iyong account?',
    'Yes, delete everything': 'Oo, burahin lahat',
    'Report this account': 'I-report ang account na ito',
    'Ban fake accounts here. A banned account is logged out, can never log in, and its listings are removed.': 'I-ban dito ang mga pekeng account. Ang naka-ban na account ay malolog out, hindi na makakapag-log in, at buburahin ang mga listing nito.',

    // ---- toasts, confirmations ----
    'Fish posted.': 'Na-post na ang isda.',
    'Listing updated.': 'Na-update ang listing.',
    'Listing deleted.': 'Nabura ang listing.',
    'Delete this listing?': 'Burahin ang listing na ito?',
    'Profile saved.': 'Na-save ang profile.',
    'Marked as sold.': 'Namarkahang naibenta.',
    'Marked as completed.': 'Namarkahang tapos na.',
    'Matches refreshed.': 'Na-refresh ang mga tugma.',
    'Order placed. The kg were taken off the listing.': 'Naisagawa ang order. Binawas na ang kg sa listing.',
    'Order cancelled.': 'Nakansela ang order.',
    'Cancel this order? The kg go back on sale.': 'Kanselahin ang order na ito? Ibabalik sa bentahan ang mga kg.',
    'Requirement cancelled.': 'Nakansela ang kailangan.',
    'Cancel this requirement?': 'Kanselahin ang kailangan na ito?',
    'Requirement saved. No matches yet.': 'Na-save ang kailangan. Wala pang tugma.',
    'Removed.': 'Naalis.',
    'Remove this fingerprint login?': 'Alisin ang fingerprint login na ito?',
    'Fingerprint added. You can now log in with it.': 'Naidagdag ang fingerprint. Pwede ka nang mag-log in gamit ito.',
    'Fingerprint was cancelled or timed out.': 'Nakansela o nag-time out ang fingerprint.',
    'Fingerprint did not work.': 'Hindi gumana ang fingerprint.',
    'Password changed. Please log in.': 'Napalitan ang password. Mag-log in.',
    'Your account was deleted.': 'Nabura na ang iyong account.',
    'Account banned.': 'Na-ban ang account.',
    'Account unbanned.': 'Na-unban ang account.',
    'Unban this account?': 'I-unban ang account na ito?',
    'Thanks. An admin will review this account.': 'Salamat. Rerepasuhin ng admin ang account na ito.',
    'Picture removed. Press Save changes to keep this.': 'Naalis ang larawan. Pindutin ang I-save ang mga pagbabago para mapanatili ito.',
    'Pick a picture, then press': 'Pumili ng larawan, tapos pindutin ang',
    'to keep it.': 'para mapanatili ito.',
    'That saved login expired. Please log in again.': 'Nag-expire na ang naka-save na login na iyon. Mag-log in muli.',
    'Your saved login expired. Please log in again.': 'Nag-expire na ang naka-save mong login. Mag-log in muli.',
    'Your session ended. Please log in again.': 'Natapos ang iyong session. Mag-log in muli.',

    // ---- messages from the server ----
    'Wrong email or password.': 'Maling email o password.',
    'This account was made with Google. Use the Google button, or Forgot password to set a password.': 'Ang account na ito ay ginawa gamit ang Google. Gamitin ang Google button, o ang "Nakalimutan ang password" para magtakda ng password.',
    'That email is already registered. Log in instead, or use Forgot password.': 'Naka-rehistro na ang email na iyon. Mag-log in na lang, o gamitin ang "Nakalimutan ang password".',
    'That email is already registered. Log in instead.': 'Naka-rehistro na ang email na iyon. Mag-log in na lang.',
    'Password must be at least 6 characters.': 'Ang password ay dapat hindi bababa sa 6 na karakter.',
    'Choose whether you are a fisherfolk or a fish buyer.': 'Piliin kung ikaw ay mangingisda o mamimili ng isda.',
    'Enter a valid mobile number.': 'Maglagay ng tamang numero ng cellphone.',
    'Enter a valid email address, like name@gmail.com.': 'Maglagay ng tamang email address, tulad ng pangalan@gmail.com.',
    'Please log in.': 'Mag-log in muna.',
    'Request blocked.': 'Na-block ang request.',
    'Request too large.': 'Masyadong malaki ang request.',
    'Not found.': 'Hindi nahanap.',
    'Something went wrong. Try again.': 'May nagkamali. Subukan muli.',
    'Wrong password. Your account was not deleted.': 'Maling password. Hindi nabura ang iyong account.',
    'Google could not verify this login. Check your internet and try again.': 'Hindi ma-verify ng Google ang login na ito. Tingnan ang internet mo at subukan muli.',
    'Fingerprint could not be verified.': 'Hindi ma-verify ang fingerprint.',
    'Account not found.': 'Hindi nahanap ang account.',
    'This account has been banned for suspicious activity. Contact FishMatch support if this is a mistake.': 'Na-ban ang account na ito dahil sa kahina-hinalang aktibidad. Makipag-ugnayan sa FishMatch support kung may pagkakamali.',
    'Failed to fetch': 'Hindi maabot ang FishMatch server. Siguraduhing tumatakbo ito.',
    'Cannot reach the FishMatch server. Make sure it is running, then open it from the address shown in its window (usually http://localhost:8000) and refresh.': 'Hindi maabot ang FishMatch server. Siguraduhing tumatakbo ito, tapos buksan sa address na nakasulat sa window nito (karaniwan http://localhost:8000) at i-refresh.',
    'Your browser did not keep the login. Open FishMatch from the address shown in the server window (usually http://localhost:8000, not a saved file or another program), allow cookies for it, then try again.': 'Hindi na-save ng browser mo ang login. Buksan ang FishMatch sa address na nakasulat sa server window (karaniwan http://localhost:8000, hindi sa saved file o ibang program), payagan ang cookies, tapos subukan muli.'
  };

  const FIELD = {Name: 'pangalan', Email: 'email', 'Mobile number': 'numero ng cellphone', Location: 'lokasyon', Species: 'uri ng isda', Password: 'password'};
  // messages with a changing part, e.g. "Name is required."
  const RX = [
    [/^(.+) is required\.$/, m => 'Kailangan ang ' + (FIELD[m[1]] || m[1]) + '.'],
    [/^(.+) is too long\.$/, m => 'Masyadong mahaba ang ' + (FIELD[m[1]] || m[1]) + '.'],
    [/^(.+) must be a number\.$/, m => 'Dapat numero ang ' + (FIELD[m[1]] || m[1]) + '.'],
    [/^Found (\d+) matching listings?\.$/, m => 'May ' + m[1] + ' tugmang listing na nakita.'],
    [/^Requirement saved\. No matches yet\.$/, () => 'Na-save ang kailangan. Wala pang tugma.']
  ];

  const LANGS = {en: 'English', fil: 'Filipino'};
  const DICT = {fil: FIL};
  const KEY = 'fm_lang';

  function initial() {
    try { const s = localStorage.getItem(KEY); if (LANGS[s]) return s; } catch (e) {}
    const n = (navigator.language || '').toLowerCase();
    return (n.startsWith('fil') || n.startsWith('tl')) ? 'fil' : 'en';
  }
  let lang = initial();

  function tr(s) {
    if (lang === 'en') return s;
    const k = String(s).trim(); if (!k) return s;
    let v = DICT[lang][k];
    if (v === undefined) for (const [re, fn] of RX) { const m = k.match(re); if (m) { v = fn(m); break; } }
    return v === undefined ? s : String(s).replace(k, () => v);
  }
  window.tr = tr;
  window.fmLang = () => lang;

  // remember each node's original English so we can switch back
  const orig = new WeakMap();
  const ATTRS = ['placeholder', 'aria-label', 'title'];
  function doText(n) {
    let o = orig.get(n);
    if (!o || o.shown !== n.nodeValue) o = {src: n.nodeValue};  // the app wrote new text: that is the new original
    o.shown = lang === 'en' ? o.src : tr(o.src);
    orig.set(n, o);
    if (n.nodeValue !== o.shown) n.nodeValue = o.shown;
  }
  function doAttrs(el) {
    let o = orig.get(el); if (!o) { o = {}; orig.set(el, o); }
    for (const a of ATTRS) {
      const cur = el.getAttribute && el.getAttribute(a); if (cur == null) continue;
      let r = o[a]; if (!r || r.shown !== cur) r = {src: cur};
      r.shown = lang === 'en' ? r.src : tr(r.src); o[a] = r;
      if (cur !== r.shown) el.setAttribute(a, r.shown);
    }
  }
  const SKIP = /^(SCRIPT|STYLE|TEXTAREA|OPTION|OPTGROUP)$/;
  function walk(root) {
    if (!root) return;
    if (root.nodeType === 3) { if (!SKIP.test(root.parentNode && root.parentNode.nodeName)) doText(root); return; }
    if (root.nodeType !== 1 || SKIP.test(root.nodeName)) return;
    doAttrs(root);
    const w = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    for (let n = w.nextNode(); n; n = w.nextNode()) {
      if (n.nodeType === 3) { if (!SKIP.test(n.parentNode.nodeName)) doText(n); }
      else if (!SKIP.test(n.nodeName)) doAttrs(n);
    }
  }

  const obs = new MutationObserver(recs => {
    obs.disconnect();
    try {
      for (const r of recs) {
        if (r.type === 'childList') r.addedNodes.forEach(walk);
        else if (r.type === 'characterData') walk(r.target);
        else if (r.type === 'attributes') doAttrs(r.target);
      }
    } finally { start(); }
  });
  function start() { obs.observe(document.body, {childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS}); }

  // native pop-ups (confirm / prompt / alert) use the same words
  for (const f of ['confirm', 'prompt', 'alert']) { const o = window[f].bind(window); window[f] = (m, d) => o(tr(m), d); }

  function setLang(l) {
    if (!LANGS[l]) return;
    lang = l;
    try { localStorage.setItem(KEY, l); } catch (e) {}
    document.documentElement.lang = l === 'fil' ? 'fil' : 'en';
    obs.disconnect(); walk(document.body); start();
    const sel = document.querySelector('#langpick select'); if (sel) sel.value = l;
    window.dispatchEvent(new Event('fmlang'));
  }

  function mount() {
    const box = document.createElement('label');
    box.id = 'langpick';
    box.innerHTML = '<span aria-hidden="true">🌐</span><select aria-label="Language">' +
      Object.entries(LANGS).map(([k, v]) => '<option value="' + k + '">' + v + '</option>').join('') + '</select>';
    const sel = box.querySelector('select'); sel.value = lang;
    sel.addEventListener('change', () => setLang(sel.value));
    document.body.appendChild(box);
  }

  document.documentElement.lang = lang === 'fil' ? 'fil' : 'en';
  mount(); walk(document.body); start();
})();
