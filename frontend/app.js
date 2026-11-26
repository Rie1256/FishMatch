(function(){try{var s=document.createElement('style');s.id='fm-extra-css';s.textContent=`
/* ===== MOBILE / TABLET: full-screen pages, menu hidden behind a three-dot button ===== */
#navtoggle{display:none!important}
@media (max-width:820px){
  body:has(.app) #navtoggle{display:flex}
  html,body{-webkit-text-size-adjust:100%;overflow-x:clip;max-width:100vw}
  body{font-size:16px}
  input,select,textarea{font-size:16px!important}
  .app{display:block;padding:0;gap:0}
  main{padding:0 10px 20px;min-width:0}
  .side{display:flex;flex-direction:column;justify-content:flex-start;align-items:stretch;position:fixed;left:0;top:0;bottom:0;right:auto;width:270px;max-width:82vw;height:100%;z-index:110;
    gap:6px;padding:22px 14px;border-radius:0 24px 24px 0;overflow-y:auto;overflow-x:hidden;box-sizing:border-box;
    transform:translateX(-105%);visibility:hidden;pointer-events:none;transition:transform .25s ease,visibility .25s}
  body.navopen .side{transform:none;visibility:visible;pointer-events:auto}
  body.navopen::after{content:"";position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:100}
  .side .lgcard{display:block}.side .sp{display:block;flex:1}.sidepro{display:flex}
  .nav{flex:0 0 auto;flex-direction:row;gap:12px;padding:12px;text-align:left;justify-content:flex-start;font-size:15px;line-height:1.2;white-space:normal;border-radius:14px}
  .nav svg{width:22px;height:22px}
  .top{position:sticky;top:0;z-index:90;margin:0 -10px 8px;padding:8px 10px;min-height:44px;background:rgba(232,245,243,.92);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}
  html[data-theme="dark"] .top{background:rgba(8,26,32,.92)}
  .top h1{cursor:pointer;-webkit-tap-highlight-color:transparent;user-select:none}
  .top h1::after{content:"";display:inline-block;margin-left:8px;border:6px solid transparent;border-top-color:currentColor;vertical-align:-2px;transition:transform .2s}
  body.navopen .top h1::after{transform:rotate(-90deg);vertical-align:0}
  .chip{display:none}
  .top h1{font-size:22px;min-width:0;flex:0 1 auto}
  .card{border-radius:16px;padding:14px;margin-bottom:8px;min-width:0;max-width:100%;box-sizing:border-box}
  .card h3{font-size:14px;margin-bottom:4px}
  .btn,.btn-create,.btn-login{min-height:44px;font-size:16px;border-radius:12px}
  .filters{grid-template-columns:1fr}
  .grid{grid-template-columns:minmax(0,1fr);gap:8px}
  .card:has(table),.tw,.tablewrap{overflow-x:auto}
  table{display:block;overflow-x:auto;max-width:100%;font-size:12px}
  th,td{padding:6px 4px}
  body:has(.app) #langpick{bottom:auto;top:6px;z-index:95;transform:scale(.85);transform-origin:top right}
  .fish{display:none}.hero{display:none}
  .gauge{margin-top:4px}.gauge svg{display:none}.gauge b{font-size:18px;margin:2px 0}
  .av.xl{width:76px;height:76px;font-size:30px;border-width:3px}
  .pcard h2{font-size:18px;margin:8px 0 4px}
  .pcard .pbio{font-size:13px;margin:8px 0;line-height:1.4}
  .pcard .phint,.pcard .pinfo,.pcard .since{display:none}
  .form label{margin-bottom:8px;font-size:12px}
  .form input,.form select,.form textarea{padding:8px 10px;margin-top:3px}
  .form textarea{min-height:60px;height:60px}
  .form .g{gap:8px}
}
#gbtn{color-scheme:light;background:transparent}
#gbtn iframe{color-scheme:light;border-radius:999px}


/* ===== NEW DASHBOARD (My Activity) ===== */
.dwrap{display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:20px;align-items:start}
.dmain,.dside{display:flex;flex-direction:column;gap:18px;min-width:0}
.dmain .card,.dside .card{margin:0}
.dh{font-size:16px;font-weight:700;color:#0f3d4c;margin:6px 0 0}
.dhero{display:flex;flex-wrap:wrap;gap:18px 28px;align-items:center;justify-content:space-between}
.dwho{display:flex;gap:16px;align-items:center;min-width:0}
.dwho .av{width:88px;height:88px;font-size:34px;border:3px solid #fff;box-shadow:0 6px 18px rgba(15,61,76,.18)}
.dtxt h2{font-size:22px;color:#0f3d4c;margin:0 0 6px}
.dmeta{display:flex;flex-wrap:wrap;gap:4px 16px;margin-top:8px;font-size:13px;color:var(--mute)}
.dmeta span{display:inline-flex;align-items:center;gap:6px}.dmeta svg{width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:1.7}
.dnums{display:flex;gap:28px;flex-wrap:wrap}
.dnums small{display:block;font-size:12px;color:var(--mute)}
.dnums b{font-size:26px;color:#0f3d4c;font-weight:700}.dnums i{font-size:13px;font-style:normal;color:var(--mute);font-weight:500}
.dsum{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.dsum a{display:flex;flex-direction:column;gap:2px;padding:16px;border-radius:20px;text-decoration:none;color:#0f3d4c;min-height:110px;transition:transform .15s}
.dsum a:hover{transform:translateY(-2px)}
.dsum small{font-size:12.5px;font-weight:600;opacity:.8}
.dsum b{font-size:34px;font-weight:700;margin-top:auto;line-height:1.1}
.dsum em{font-style:normal;font-size:12px;opacity:.7}
.sc1{background:#e5f6b8}.sc2{background:#b9ece3}.sc3{background:#fbc9d3}
.feed{display:flex;flex-direction:column;gap:6px}
.fi{display:flex;align-items:center;gap:10px;padding:8px;border-radius:14px;text-decoration:none;color:var(--ink)}
.fi:hover{background:#edf7f5}
.fav{width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#9fe0cc,#1b8c85);color:#fff;display:grid;place-items:center;font-weight:700;flex-shrink:0}
.ft{display:flex;flex-direction:column;min-width:0;flex:1}.ft b{font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ft small{font-size:12px;color:var(--mute);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
html[data-theme="dark"] .dh,html[data-theme="dark"] .dtxt h2,html[data-theme="dark"] .dnums b{color:var(--ink)}
html[data-theme="dark"] .fi:hover{background:rgba(255,255,255,.06)}
@media(max-width:1100px){.dwrap{grid-template-columns:1fr}}
@media(max-width:820px){
  .dwrap,.dmain,.dside{gap:8px}
  .dhero{gap:10px}
  .dwho{gap:10px}
  .dwho .av{width:60px;height:60px;font-size:24px}
  .dtxt h2{font-size:17px;margin-bottom:2px}
  .dmeta{font-size:12px;margin-top:4px;gap:2px 10px}
  .dnums{gap:6px;width:100%;justify-content:space-between}
  .dnums b{font-size:19px}.dnums small{font-size:11px}
  .dsum{gap:6px}
  .dsum a{padding:10px;min-height:84px;border-radius:14px}
  .dsum small{font-size:10.5px}.dsum b{font-size:24px}.dsum em{font-size:10.5px}
  .dh{font-size:14px;margin:2px 0 0}
}
`;document.head.appendChild(s);}catch(e){}
try{document.addEventListener('click',function(e){var t=e.target,b=document.body;if(!t.closest)return;
if(window.innerWidth<=820&&t.closest('.top h1')){b.classList.toggle('navopen');return;}
if(b.classList.contains('navopen')&&(!t.closest('.side')||t.closest('.side a, .side button')))b.classList.remove('navopen');});
window.addEventListener('hashchange',function(){document.body.classList.remove('navopen');});}catch(e){}})();
/* FRONTEND: pages, forms, search, profile and talking to the backend API (/api/...) */
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const peso = n => '₱' + Number(n).toLocaleString('en-PH', {maximumFractionDigits: 2});
const kg = n => Number(n).toLocaleString('en-PH', {maximumFractionDigits: 1}) + ' kg';
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
let me;

let TOKEN = '';  // login token: kept for this tab only, and sent with every request (does not depend on cookies)
try { TOKEN = sessionStorage.getItem('fm_tok') || ''; } catch (e) {}
function setToken(t) { TOKEN = t || ''; try { if (t) sessionStorage.setItem('fm_tok', t); else sessionStorage.removeItem('fm_tok'); } catch (e) {} }
async function api(method, url, body) {
  let r;
  const headers = {'Content-Type': 'application/json', 'X-Requested-With': 'fishmatch'};
  if (TOKEN) headers['X-Session-Token'] = TOKEN;
  try { r = await fetch(url, {method, credentials: 'same-origin', headers, body: body ? JSON.stringify(body) : undefined}); }
  catch (e) { throw new Error('Cannot reach the FishMatch server. Run "python app.py" and open http://localhost:8000 (do not open index.html directly).'); }
  const d = await r.json().catch(() => ({}));
  if (!r.ok) { const e = new Error(d.error || 'Something went wrong. Try again.'); e.status = r.status; throw e; }
  if (d && d.session_token) { setToken(d.session_token); delete d.session_token; }
  if (url === '/api/logout' || (method === 'DELETE' && url === '/api/me')) setToken('');
  if (method === 'POST' && /^\/api\/(login|register|google|passkey\/login)/.test(url)) loginAt = Date.now();
  return d;
}
let loginAt = 0;  // when we last logged in, to tell "cookie was not kept" apart from a normal expired session
let tt;
function toast(msg, bad) {
  const t = $('#toast'); t.textContent = msg; t.className = 'show' + (bad ? ' err' : '');
  clearTimeout(tt); tt = setTimeout(() => t.className = '', 3200);
}
const go = h => location.hash === h ? render() : (location.hash = h);

const LOGO = '<svg viewBox="0 0 48 48"><path d="M4 24c8-12 22-14 32-6l8-6v24l-8-6C26 38 12 36 4 24z" fill="#1d5a8e"/><circle cx="14" cy="22" r="2" fill="#fff"/></svg>';
const EYE = '<svg viewBox="0 0 24 24"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
const EYE_OFF = '<svg viewBox="0 0 24 24"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M3 3l18 18"/></svg>';
const ICON = {
  dashboard: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
  post: '<path d="M3 12c4-6 11-7 16-3l2-2v10l-2-2c-5 4-12 3-16-3z"/>',
  listings: '<path d="M4 6h16M4 12h16M4 18h10"/>',
  match: '<circle cx="9" cy="12" r="5"/><circle cx="15" cy="12" r="5"/>',
  profile: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-5 15-5 16 0"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  out: '<path d="M9 4H5v16h4M16 8l4 4-4 4M20 12H9"/>',
  pin: '<path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  swap: '<path d="M7 7h12l-3-3M17 17H5l3 3"/>',
  sliders: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
  monitor: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  finger: '<path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/><path d="M14 13.12c0 2.38 0 6.38-1 8.88"/><path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"/><path d="M2 12a10 10 0 0 1 18-6"/><path d="M21.8 16c.2-2 .131-5.354 0-6"/><path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"/><path d="M8.65 22c.21-.66.45-1.32.57-2"/><path d="M9 6.8a6 6 0 0 1 9 5.2v2"/>'
};
const ico = k => `<svg viewBox="0 0 24 24">${ICON[k]}</svg>`;
const PROV = ['Abra','Agusan del Norte','Agusan del Sur','Aklan','Albay','Antique','Apayao','Aurora','Basilan','Bataan','Batanes','Batangas','Benguet','Biliran','Bohol','Bukidnon','Bulacan','Cagayan','Camarines Norte','Camarines Sur','Camiguin','Capiz','Catanduanes','Cavite','Cebu','Cotabato','Davao de Oro','Davao del Norte','Davao del Sur','Davao Oriental','Dinagat Islands','Eastern Samar','Guimaras','Ifugao','Ilocos Norte','Ilocos Sur','Iloilo','Isabela','Kalinga','La Union','Laguna','Lanao del Norte','Lanao del Sur','Leyte','Maguindanao','Marinduque','Masbate','Misamis Occidental','Misamis Oriental','Mountain Province','Negros Occidental','Negros Oriental','Northern Samar','Nueva Ecija','Nueva Vizcaya','Occidental Mindoro','Oriental Mindoro','Palawan','Pampanga','Pangasinan','Quezon','Quirino','Rizal','Romblon','Samar','Sarangani','Siquijor','Sorsogon','South Cotabato','Southern Leyte','Sultan Kudarat','Sulu','Surigao del Norte','Surigao del Sur','Tarlac','Tawi-Tawi','Zambales','Zamboanga del Norte','Zamboanga del Sur','Zamboanga Sibugay','Metro Manila','Dasmariñas','Navotas','Malabon','Bacoor','Lucena','Calapan','Puerto Princesa','Roxas City','General Santos','Davao City','Cebu City','Iloilo City'];
/* Municipalities and cities (Metro Manila, CALABARZON, Bicol). Stored as "Municipality, Province". For other provinces, type the municipality yourself, e.g. "Hinigaran, Negros Occidental". */
const MUNI = {
  'Laguna': 'Alaminos,Bay,Biñan,Cabuyao,Calamba,Calauan,Cavinti,Famy,Kalayaan,Liliw,Los Baños,Luisiana,Lumban,Mabitac,Magdalena,Majayjay,Nagcarlan,Paete,Pagsanjan,Pakil,Pangil,Pila,Rizal,San Pablo,San Pedro,Santa Cruz,Santa Maria,Santa Rosa,Siniloan,Victoria',
  'Cavite': 'Alfonso,Amadeo,Bacoor,Carmona,Cavite City,Dasmariñas,General Emilio Aguinaldo,General Mariano Alvarez,General Trias,Imus,Indang,Kawit,Magallanes,Maragondon,Mendez,Naic,Noveleta,Rosario,Silang,Tagaytay,Tanza,Ternate,Trece Martires',
  'Batangas': 'Agoncillo,Alitagtag,Balayan,Balete,Batangas City,Bauan,Calaca,Calatagan,Cuenca,Ibaan,Laurel,Lemery,Lian,Lipa,Lobo,Mabini,Malvar,Mataasnakahoy,Nasugbu,Padre Garcia,Rosario,San Jose,San Juan,San Luis,San Nicolas,San Pascual,Santa Teresita,Santo Tomas,Taal,Talisay,Tanauan,Taysan,Tingloy,Tuy',
  'Rizal': 'Angono,Antipolo,Baras,Binangonan,Cainta,Cardona,Jala-Jala,Morong,Pililla,Rodriguez,San Mateo,Tanay,Taytay,Teresa',
  'Quezon': 'Agdangan,Alabat,Atimonan,Buenavista,Burdeos,Calauag,Candelaria,Catanauan,Dolores,General Luna,General Nakar,Guinayangan,Gumaca,Infanta,Jomalig,Lopez,Lucban,Lucena,Macalelon,Mauban,Mulanay,Padre Burgos,Pagbilao,Panukulan,Patnanungan,Perez,Pitogo,Plaridel,Polillo,Quezon,Real,Sampaloc,San Andres,San Antonio,San Francisco,San Narciso,Sariaya,Tagkawayan,Tayabas,Tiaong,Unisan',
  'Sorsogon': 'Barcelona,Bulan,Bulusan,Casiguran,Castilla,Donsol,Gubat,Irosin,Juban,Magallanes,Matnog,Pilar,Prieto Diaz,Santa Magdalena,Sorsogon City',
  'Albay': 'Bacacay,Camalig,Daraga,Guinobatan,Jovellar,Legazpi City,Libon,Ligao City,Malilipot,Malinao,Manito,Oas,Pio Duran,Polangui,Rapu-Rapu,Santo Domingo,Tabaco City,Tiwi',
  'Camarines Norte': 'Basud,Capalonga,Daet,Jose Panganiban,Labo,Mercedes,Paracale,San Lorenzo Ruiz,San Vicente,Santa Elena,Talisay,Vinzons',
  'Camarines Sur': 'Baao,Balatan,Bato,Bombon,Buhi,Bula,Cabusao,Calabanga,Camaligan,Canaman,Caramoan,Del Gallego,Gainza,Garchitorena,Goa,Iriga City,Lagonoy,Libmanan,Lupi,Magarao,Milaor,Minalabac,Nabua,Naga City,Ocampo,Pamplona,Pasacao,Pili,Presentacion,Ragay,Sagñay,San Fernando,San Jose,Sipocot,Siruma,Tigaon,Tinambac',
  'Catanduanes': 'Bagamanoc,Baras,Bato,Caramoran,Gigmoto,Pandan,Panganiban,San Andres,San Miguel,Viga,Virac',
  'Masbate': 'Aroroy,Baleno,Balud,Batuan,Cataingan,Cawayan,Claveria,Dimasalang,Esperanza,Mandaon,Masbate City,Milagros,Mobo,Monreal,Palanas,Pio V. Corpuz,Placer,San Fernando,San Jacinto,San Pascual,Uson',
  'Metro Manila': 'Caloocan,Las Piñas,Makati,Malabon,Mandaluyong,Manila,Marikina,Muntinlupa,Navotas,Parañaque,Pasay,Pasig,Pateros,Quezon City,San Juan,Taguig,Valenzuela'
};
const PLACES = [...Object.entries(MUNI).flatMap(([pr, m]) => m.split(',').map(x => x + ', ' + pr)), ...PROV].sort((a, b) => a.localeCompare(b));
const SPECIES = ['Alimango','Alimasag','Ayungin','Banak','Bangus','Biya','Bisugo','Dalag','Dalagang Bukid','Dilis','Galunggong','Hasa-hasa','Hipon','Hito','Kitang','Lapu-Lapu','Lawlaw','Maya-Maya','Pampano','Pusit','Sapsap','Squid','Sugpo','Tahong','Talaba','Talakitok','Tamban','Tanigue','Tawilis','Tilapia','Tulingan','Tuna'];
const dl = (id, a) => `<datalist id="${id}">${a.map(x => `<option value="${x}">`).join('')}</datalist>`;
const pw = (name, ph, ac) => `<div class="pw"><input type="password" name="${name}" placeholder="${ph}" autocomplete="${ac}" required><button type="button" class="eye" data-eye aria-label="Show password">${EYE}</button></div>`;
const FISH = `<svg class="fish" viewBox="0 0 300 120"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fa7ba"/><stop offset=".55" stop-color="#cfdbe5"/><stop offset="1" stop-color="#f3f7fa"/></linearGradient></defs><path d="M10 62C50 14 140 10 215 50l62-30v84l-62-30C140 112 52 110 10 62z" fill="url(#g)"/><path d="M215 50l62-30v84l-62-30" fill="#7e98ad" opacity=".55"/><circle cx="52" cy="54" r="5" fill="#0f2a43"/><path d="M80 40c40 20 90 24 130 10" stroke="#6f8aa0" stroke-width="2" fill="none" opacity=".6"/></svg>`;
const gauge = s => `<div class="gauge">Match score<svg viewBox="0 0 200 110"><path d="M20 100A80 80 0 0 1 180 100" fill="none" style="stroke:var(--track)" stroke-width="12" stroke-linecap="round"/><path d="M20 100A80 80 0 0 1 180 100" fill="none" stroke="#1b8c85" stroke-width="12" stroke-linecap="round" stroke-dasharray="${(s / 100 * 251.3).toFixed(1)} 251.3"/></svg><b>${Math.round(s)}<small style="font-size:12px;color:var(--mute)">/100</small></b></div>`;
const scoreTag = s => `<span class="score ${s >= 80 ? '' : 'mid'}">${Math.round(s)}</span>`;

/* ---------- public pages ---------- */
const MARK = '<svg viewBox="0 0 48 48"><path d="M4 24c8-12 22-14 32-6l8-6v24l-8-6C26 38 12 36 4 24z" fill="#fff"/><circle cx="14" cy="22" r="2.4" fill="#1b8c85"/></svg>';
const authShell = (tab, form) => `<section class="sa"><aside class="panel"><div class="brand"><span class="lgcard"><img src="/logo-light.png" alt="FishMatch"></span></div>
  <div class="mid"><small class="eyebrow-l">A smarter catch-to-market connection</small><h1>Good catch.<br><span>Better connections.</span></h1>
  <p>Bringing fisherfolk and fish buyers closer through a simple, smarter matching experience.</p></div><div class="foot">FishMatch · Fisherfolk and fish buyers</div></aside>
  <div class="pane"><div class="box"><nav class="tabs"><a href="#/login" class="${tab === 'login' ? 'on' : ''}">Log in</a><a href="#/register" class="${tab === 'register' ? 'on' : ''}">Create account</a></nav>${form}</div></div></section>`;
const pub = {
  login: arg => (accounts().length && arg !== 'new') ? authShell('login', savedPicker()) : authShell('login', `<p class="eb">Welcome back</p><h2>Log in to FishMatch</h2><p class="sub">Enter your account details to continue.</p>
    <form data-form="login"><div class="err-msg" id="err"></div>
    <label>Email address<input type="email" name="email" autocomplete="off" value="${esc(lastEmail())}" required></label>
    <label>Password${pw('password', '', 'current-password')}</label>
    <a class="forgot" href="#/forgot">Forgot password?</a>
    <button class="go">Log in <span>→</span></button></form>
    ${social('login')}${accounts().length ? '<p class="alt"><a href="#/login">← Back to saved logins</a></p>' : ''}`),
  register: () => authShell('register', `<p class="eb">Get started</p><h2>Create your account</h2><p class="sub">Tell us who you are so we can match you.</p>
    <form data-form="register"><div class="err-msg" id="err"></div>
    <div class="row"><label>First name<input name="first" autocomplete="given-name" required></label><label>Surname<input name="last" autocomplete="family-name" required></label></div>
    <label>Email address<input type="email" name="email" autocomplete="email" required></label>
    <label>Password (6+ characters)${pw('password', '', 'new-password')}</label>
    <div class="row"><label>Mobile number<input type="tel" name="phone" autocomplete="tel" required></label><label>Location${cb(`name="location" placeholder="Municipality or city, province (e.g. Calamba, Laguna)" required`, 'PLACES')}</label></div>
    <label style="margin-bottom:0">I am a</label>
    <div class="rolebox"><label>Fisherfolk <input type="radio" name="role" value="fisherfolk" required></label><label>Fish buyer <input type="radio" name="role" value="buyer"></label></div>
    <p class="fine">By creating an account, you agree to share your phone and email with matched buyers or sellers so you can arrange the sale.</p>
    <button class="go">Create account <span>→</span></button></form>
    ${social('register')}<p class="alt">Already have an account? <a href="#/login">Log in</a></p>`),
  forgot: () => authShell('login', RESET.email
    ? `<p class="eb">Almost done</p><h2>Enter your code</h2><p class="sub">We made a 6-digit code for <b>${esc(RESET.email)}</b>. ${RESET.emailOk ? 'Check your inbox (and spam folder).' : '<b>Email sending is not set up on this computer</b>, so the code is shown in the server window (the Command Prompt that is running FishMatch).'}</p>
      <form data-form="reset"><div class="err-msg" id="err"></div>
      <label>6-digit code<input name="code" inputmode="numeric" maxlength="6" pattern="[0-9]{6}" autocomplete="one-time-code" required></label>
      <label>New password (6+ characters)${pw('password', '', 'new-password')}</label>
      <button class="go">Save new password <span>→</span></button></form>
      <p class="alt"><a href="#/forgot" data-act="resetBack">Use a different email</a></p>`
    : `<p class="eb">Forgot password</p><h2>Reset your password</h2><p class="sub">Enter the email of your account. We will send you a 6-digit code.</p>
      <form data-form="forgot"><div class="err-msg" id="err"></div>
      <label>Email address<input type="email" name="email" autocomplete="email" required></label>
      <button class="go">Send code <span>→</span></button></form>
      <p class="alt"><a href="#/login">← Back to log in</a></p>`),
  google: () => authShell('register', `<p class="eb">Almost there</p><h2>Finish your account</h2><p class="sub">Google confirmed <b>${esc(GOOGLE.email)}</b>. Tell us a bit more so we can match you.</p>
    <form data-form="googleFinish"><div class="err-msg" id="err"></div>
    <label>Name<input name="name" value="${esc(GOOGLE.name)}" autocomplete="name" required></label>
    <div class="row"><label>Mobile number<input type="tel" name="phone" autocomplete="tel" required></label><label>Location${cb(`name="location" placeholder="Municipality or city, province (e.g. Calamba, Laguna)" required`, 'PLACES')}</label></div>
    <label style="margin-bottom:0">I am a</label>
    <div class="rolebox"><label>Fisherfolk <input type="radio" name="role" value="fisherfolk" required></label><label>Fish buyer <input type="radio" name="role" value="buyer"></label></div>
    <button class="go">Create account <span>→</span></button></form>
    <p class="alt"><a href="#/register" data-act="googleCancel">Cancel</a></p>`)
};
pub.landing = pub.login;

/* ---------- app shell ---------- */
const NAV = {
  fisherfolk: [['dashboard', 'Dashboard', 'dashboard'], ['post', 'Post fish', 'post'], ['listings', 'Manage listings', 'listings'], ['matches', 'Matching results', 'match'], ['profile', 'Profile', 'profile'], ['settings', 'Settings', 'sliders']],
  buyer: [['dashboard', 'Dashboard', 'dashboard'], ['market', 'Browse fish', 'search'], ['requirement', 'Submit requirement', 'post'], ['requirements', 'Manage requirements', 'listings'], ['matches', 'Matching results', 'match'], ['profile', 'Profile', 'profile'], ['settings', 'Settings', 'sliders']]
};
const shell = (page, title, html, stat) => `<div class="app"><aside class="side"><a class="lgcard" href="#/dashboard"><img src="/logo-light.png" alt="FishMatch"></a>
  ${[...NAV[me.role], ['history', 'History', 'listings'], ...(me.is_admin ? [['admin', 'Admin', 'profile']] : [])].map(([k, label, ic]) => `<a class="nav ${k === page ? 'on' : ''}" href="#/${k}">${ico(ic)}${label}</a>`).join('')}
  <div class="sp"></div><a class="sidepro" href="#/profile">${av(me)}<span>${esc(me.name)}<small>View profile</small></span></a><button class="nav" data-act="switcher">${ico('swap')}Switch account</button><button class="nav" data-act="logout">${ico('out')}Log out</button></aside>
  <main><div class="top"><h1>${title}</h1>${stat || ''}<a class="chip" href="#/profile">${av(me)}<div>${esc(me.name)}<small>${me.role === 'buyer' ? 'Fish buyer' : 'Fisherfolk'} · ${esc(me.location)}</small></div></a></div>${html}</main></div>`;

const fisher = () => me.role === 'fisherfolk';
function matchTable(rows, searching) {
  if (!rows.length && searching) return '<p class="empty">No match fits your search.</p>';
  if (!rows.length) return fisher()
    ? `<p class="empty">No matches yet. When a buyer asks for fish like yours, they show up here.</p>`
    : `<p class="empty">No matches yet. <a href="#/requirement">Submit a requirement</a> or check back after fisherfolk post new fish.</p>`;
  return fisher()
    ? `<div class="tw"><table><thead><tr><th>Buyer</th><th>Wants</th><th>Pays up to</th><th>Your fish</th><th>Contact</th><th>Score</th></tr></thead><tbody>${rows.map(m => `<tr><td>${esc(m.buyer_name)}<br><small style="color:var(--mute)">${esc(m.buyer_location)}</small></td><td>${esc(m.species)}, ${kg(m.wanted_kg)}</td><td>${peso(m.max_price_per_kg)}/kg</td><td>${kg(m.quantity_kg)} at ${peso(m.price_per_kg)}/kg</td><td>${esc(m.buyer_phone)}</td><td>${scoreTag(m.score)}</td></tr>`).join('')}</tbody></table></div>`
    : `<div class="tw"><table><thead><tr><th>Fish</th><th>Seller</th><th>Available</th><th>Price</th><th>Location</th><th>Freshness</th><th>Score</th><th></th></tr></thead><tbody>${rows.map(m => `<tr><td><b>${esc(m.species)}</b></td><td>${esc(m.fisher_name)}</td><td>${kg(m.quantity_kg)}</td><td>${peso(m.price_per_kg)}/kg</td><td>${esc(m.location)}</td><td>${cap(esc(m.freshness))}</td><td>${scoreTag(m.score)}</td><td><a class="sm" href="#/listing/${m.listing_id}">Details</a></td></tr>`).join('')}</tbody></table></div>`;
}

/* ---------- private pages ---------- */
const priv = {
  async dashboard() {
    const [s, m, ords] = await Promise.all([api('GET', '/api/stats'), api('GET', '/api/matches'), api('GET', '/api/orders')]);
    const f = fisher();
    const done = ords.filter(o => o.status === 'completed'), open = ords.filter(o => o.status === 'reserved');
    const doneTotal = done.reduce((a, o) => a + o.total, 0), openKg = open.reduce((a, o) => a + o.quantity_kg, 0);
    const role = f ? 'Fisherfolk' : 'Fish buyer';
    const hero = `<div class="card dhero"><div class="dwho">${av(me)}<div class="dtxt"><h2>${esc(me.name)}</h2><span class="badge">${role}</span>
        <div class="dmeta"><span>${ico('pin')}${esc(me.location)}</span><span>${ico('phone')}${esc(me.phone)}</span></div></div></div>
      <div class="dnums"><div><small>${f ? 'Fish posted' : 'Fish wanted'}</small><b>${s.kg}<i> kg</i></b></div>
        <div><small>${f ? 'Buyers interested' : 'Sellers matched'}</small><b>${s.people}</b></div>
        <div><small>${f ? 'Avg price / kg' : 'Avg budget / kg'}</small><b>${s.avg_price ? peso(s.avg_price) : '—'}</b></div></div></div>`;
    const sum = `<h3 class="dh">${f ? 'Sales Overview' : 'Purchase Overview'}</h3><div class="dsum">
      <a class="sc1" href="#/history"><small>${f ? 'Total sales' : 'Total spent'}</small><b>${peso(doneTotal)}</b><em>${done.length} completed ${done.length === 1 ? 'order' : 'orders'}</em></a>
      <a class="sc2" href="#/history"><small>Open orders</small><b>${open.length}</b><em>${kg(openKg)} ${f ? 'to deliver' : 'to receive'}</em></a>
      <a class="sc3" href="#/matches"><small>${f ? 'Buyer matches' : 'Seller matches'}</small><b>${m.length}</b><em>${s.people} ${f ? (s.people === 1 ? 'buyer' : 'buyers') : (s.people === 1 ? 'seller' : 'sellers')}</em></a></div>`;
    const table = `<div class="card"><h3 class="dh" style="margin-top:0">Matching results</h3>${matchTable(m.slice(0, 5))}${m.length > 5 ? '<a class="link" href="#/matches">See all matches</a>' : ''}</div>`;
    const oi = ords.slice(0, 4).map(o => `<a class="fi" href="#/history"><span class="fav">${esc((o.other_name || '?').slice(0, 1).toUpperCase())}</span>
        <span class="ft"><b>${esc(o.species)} · ${kg(o.quantity_kg)}</b><small>${f ? 'Sold to' : 'Bought from'} ${esc(o.other_name)} · ${peso(o.total)}</small></span><span class="score ${o.status === 'completed' ? '' : 'mid'}">${esc(o.status)}</span></a>`).join('');
    const mi = m.slice(0, Math.max(2, 6 - Math.min(4, ords.length))).map(x => {
      const who = f ? x.buyer_name : x.fisher_name;
      return `<a class="fi" ${f ? 'href="#/matches"' : `href="#/listing/${x.listing_id}"`}><span class="fav">${esc((who || '?').slice(0, 1).toUpperCase())}</span>
        <span class="ft"><b>${esc(who)}</b><small>Match · ${esc(x.species)} · ${f ? kg(x.wanted_kg) : kg(x.quantity_kg) + ' at ' + peso(x.price_per_kg) + '/kg'}</small></span>${scoreTag(x.score)}</a>`;
    }).join('');
    const feed = (oi + mi) || `<p class="empty">${f ? 'Post fish and orders and matches appear here.' : 'Submit a requirement or browse fish to get started.'}</p>`;
    const side = `<aside class="dside"><div class="card"><h3 class="dh" style="margin-top:0">Live Feed</h3><div class="feed">${feed}</div></div>
      <div class="card"><h3 class="dh" style="margin-top:0">${f ? 'Post fish' : 'Find fish'}</h3><p class="empty" style="padding:0 0 10px">${f ? 'New listings are matched to buyer requirements right away.' : 'Tell us what you need and we will rank the best listings.'}</p><a class="btn" href="#/${f ? 'post' : 'requirement'}">${f ? 'Post fish' : 'Submit requirement'}</a>${f ? '' : ' <a class="sm" href="#/market">Browse fish</a>'}</div></aside>`;
    return {title: 'My Dashboard', html: `<div class="dwrap"><div class="dmain">${hero}${sum}${table}</div>${side}</div>`};
  },
  async post(id) {
    let l = {species: '', quantity_kg: '', price_per_kg: '', min_order_kg: '', location: me.location, freshness: 'fresh', source: 'wild', delivery: 'pickup', catch_date: new Date().toISOString().slice(0, 10), notes: '', photo: ''};
    if (id) l = await api('GET', '/api/listings/' + encodeURIComponent(id));
    photoState.changed = false;
    const opt = (cur, v, label) => `<option value="${v}" ${cur === v ? 'selected' : ''}>${label}</option>`;
    return {title: id ? 'Edit listing' : 'Post fish', html: `<div class="card form" style="max-width:660px"><form data-form="post"><div class="err-msg" id="err"></div>
    <input type="hidden" name="id" value="${id ? esc(id) : ''}"><input type="hidden" name="photo" id="photoVal" value="">
    <span class="lbl2">Photo of your fish</span>
    <div class="drop"><div id="prev">${l.photo ? `<img src="${esc(l.photo)}" alt="Fish photo">` : 'No photo yet'}</div>
      <div><button type="button" class="sm" data-act="pickPhoto">Choose photo</button> <button type="button" class="sm del" data-act="rmPhoto">Remove</button>
      <input type="file" id="photoFile" accept="image/*" hidden><small>Buyers trust listings with a clear photo. JPG, PNG or WebP.</small></div></div>
    <label>Species${cb(`name="species" required placeholder="Tilapia" value="${esc(l.species)}"`, 'SPECIES')}</label>
    <div class="g"><label>Quantity available (kg)<input type="number" name="quantity_kg" min="1" step="any" required value="${esc(l.quantity_kg)}"></label><label>Price per kg (₱)<input type="number" name="price_per_kg" min="1" step="any" required value="${esc(l.price_per_kg)}"></label></div>
    <div class="g"><label>Minimum order (kg, optional)<input type="number" name="min_order_kg" min="0" step="any" value="${l.min_order_kg ? esc(l.min_order_kg) : ''}"></label><label>Location${cb(`name="location" required value="${esc(l.location)}"`, 'PLACES')}</label></div>
    <div class="g"><label>Freshness<select name="freshness">${opt(l.freshness, 'fresh', 'Fresh (caught today)')}${opt(l.freshness, 'good', 'Good')}${opt(l.freshness, 'fair', 'Fair')}</select></label>
      <label>Source<select name="source">${opt(l.source, 'wild', 'Wild-caught')}${opt(l.source, 'farmed', 'Farm-raised')}</select></label></div>
    <div class="g"><label>Delivery<select name="delivery">${opt(l.delivery, 'pickup', 'Buyer picks up')}${opt(l.delivery, 'delivery', 'I can deliver')}${opt(l.delivery, 'both', 'Pickup or delivery')}</select></label>
      <label>Catch or harvest date<input type="date" name="catch_date" value="${esc(l.catch_date)}"></label></div>
    <label>Notes (optional)<textarea name="notes" rows="2" maxlength="300" placeholder="Size, how it was kept, best time to pick up">${esc(l.notes)}</textarea></label>
    <button class="btn">${id ? 'Save changes' : 'Post fish'}</button> ${id ? '<a class="sm" href="#/listings">Cancel</a>' : ''}</form></div>`};
  },
  async listings() {
    const rows = await api('GET', '/api/listings');
    LIST = {rows, table: listingTable};
    return {title: 'Manage listings', html: `<div class="card"><div class="lhead">${rows.length ? searchBar() : '<span></span>'}<a class="btn" href="#/post">Post fish</a></div><div id="lres">${listingTable(rows, false)}</div></div>`};
  },
  requirement: async () => ({title: 'Submit requirement', html: `<div class="card form"><form data-form="requirement"><div class="err-msg" id="err"></div>
    <label>Species wanted${cb(`name="species" required placeholder="Tilapia"`, 'SPECIES')}</label>
    <div class="g"><label>Quantity needed (kg)<input type="number" name="quantity_kg" min="1" step="any" required></label><label>Highest price per kg (₱)<input type="number" name="max_price_per_kg" min="1" step="any" required></label></div>
    <div class="g"><label>Your location${cb(`name="location" required value="${esc(me.location)}"`, 'PLACES')}</label><label>Lowest freshness<select name="min_freshness"><option value="good">Good</option><option value="fresh">Fresh only</option><option value="fair">Fair is fine</option></select></label></div>
    <button class="btn">Find matches</button></form></div>`}),
  async requirements() {
    const rows = await api('GET', '/api/requirements');
    LIST = {rows, table: reqTable};
    return {title: 'Manage requirements', html: `<div class="card">${rows.length ? `<div class="lhead">${searchBar()}</div>` : ''}<div id="lres">${reqTable(rows, false)}</div></div>`};
  },
  async matches() {
    const rows = await api('GET', '/api/matches');
    LIST = {rows, table: matchTable};
    return {title: 'Matching results', html: `<div class="card"><div class="lhead">${rows.length ? searchBar() : '<span></span>'}${fisher() ? '' : '<button class="sm" data-act="rematch">Refresh matches</button>'}</div><div id="lres">${matchTable(rows, false)}</div></div>`};
  },
  async listing(id) {
    const l = await api('GET', '/api/listings/' + encodeURIComponent(id));
    const dv = {pickup: 'Buyer picks up', delivery: 'Delivery available', both: 'Pickup or delivery'}[l.delivery] || '';
    return {title: 'Fish listing details', html: `<div class="card feat" style="max-width:480px">${l.photo ? `<img class="dphoto" src="${esc(l.photo)}" alt="${esc(l.species)}">` : FISH}<h2>${esc(l.species)}</h2>
      <div class="facts"><span>• ${kg(l.quantity_kg)} available</span><span>• ${peso(l.price_per_kg)} per kg</span><span>• ${esc(l.location)}</span><span>• ${cap(esc(l.freshness))}, caught ${esc(l.catch_date)}</span><span>• ${l.source === 'farmed' ? 'Farm-raised' : 'Wild-caught'}</span><span>• ${dv}</span>${l.min_order_kg > 0 ? `<span>• Minimum order ${kg(l.min_order_kg)}</span>` : ''}</div>
      ${l.notes ? `<p class="empty" style="text-align:left">${esc(l.notes)}</p>` : ''}
      <div class="contact"><div class="crow">${av(l.owner, 'md')}<div><b>${esc(l.owner.name)}</b><small>${fisher() ? 'Your contact details' : 'Contact the fisherfolk'}</small></div></div>${l.owner.bio ? `<p class="obio">${esc(l.owner.bio)}</p>` : ''}${esc(l.owner.location)}<br>${esc(l.owner.phone)}<br>${esc(l.owner.email)}</div>
      ${!fisher() ? (l.status === 'active' ? `<form class="buy" data-form="buy"><div class="err-msg" id="err"></div><input type="hidden" name="listing_id" value="${l.id}"><label>How many kg do you want?<input name="kg" type="number" step="0.1" min="${l.min_order_kg || 0.1}" max="${l.quantity_kg}" required></label><button class="btn">Buy now</button></form>` : '<p class="empty">This fish is sold out.</p>') : ''}
      ${!fisher() ? `<button type="button" class="sm del" data-act="reportUser" data-id="${l.owner_id}">Report this account</button>` : ''}
      <a class="link" href="#/${fisher() ? 'listings' : 'market'}">${fisher() ? 'Back to my listings' : 'Back to browse fish'}</a></div>`};
  },
  async history() {
    const rows = await api('GET', '/api/orders'), st = {reserved: 'Reserved', completed: 'Completed', cancelled: 'Cancelled'};
    return {title: fisher() ? 'Sales history' : 'Purchase history', html: `<div class="card">${rows.length ? `<div class="tw"><table><thead><tr><th>Date</th><th>Fish</th><th>Quantity</th><th>Total</th><th>${fisher() ? 'Buyer' : 'Seller'}</th><th>Status</th><th></th></tr></thead><tbody>${rows.map(o => `<tr><td>${esc(String(o.created_at).slice(0, 10))}</td><td>${esc(o.species)}</td><td>${kg(o.quantity_kg)}</td><td>${peso(o.total)}</td><td>${esc(o.other_name)}<br><small>${esc(o.other_phone)}</small></td><td><span class="badge">${st[o.status]}</span></td><td>${o.status === 'reserved' ? `${fisher() ? `<button type="button" class="sm" data-act="orderDone" data-id="${o.id}">Mark completed</button> ` : ''}<button type="button" class="sm del" data-act="orderCancel" data-id="${o.id}">Cancel</button>` : ''}</td></tr>`).join('')}</tbody></table></div>` : `<p class="empty">${fisher() ? 'No sales yet.' : 'You have not bought anything yet.'}</p>`}</div>`};
  },
  async admin() {
    const rows = await api('GET', '/api/admin/users');
    return {title: 'Admin: accounts', html: `<div class="card"><p class="empty" style="text-align:left">Ban fake accounts here. A banned account is logged out, can never log in, and its listings are removed.</p><div class="tw"><table><thead><tr><th>Name</th><th>Email / phone</th><th>Role</th><th>Location</th><th>Reports</th><th>Orders</th><th>Status</th><th></th></tr></thead><tbody>${rows.map(u => `<tr><td>${esc(u.name)}</td><td>${esc(u.email)}<br><small>${esc(u.phone)}</small></td><td>${esc(u.role)}</td><td>${esc(u.location)}</td><td>${u.reports}</td><td>${u.orders}</td><td>${u.banned ? `<span class="badge" style="background:#fde2e2;color:#b42318">Banned</span><br><small>${esc(u.ban_reason)}</small>` : '<span class="badge">Active</span>'}</td><td>${u.banned ? `<button type="button" class="sm" data-act="unbanUser" data-id="${u.id}">Unban</button>` : `<button type="button" class="sm del" data-act="banUser" data-id="${u.id}">Ban</button>`}</td></tr>`).join('')}</tbody></table></div></div>`};
  },
  async market() {
    window._market = await api('GET', '/api/market');
    return {title: 'Browse fish', html: `<div class="card" style="margin-bottom:20px"><div class="filters">${cb('id="mq" placeholder="Search fish, e.g. Tilapia" aria-label="Search fish"', 'SPECIES')}${cb('id="ml" placeholder="Search location" aria-label="Location"', 'PLACES')}<input id="mp" type="number" min="0" placeholder="Max price/kg" aria-label="Max price per kg"><select id="ms" aria-label="Sort"><option value="new">Newest</option><option value="low">Lowest price</option><option value="qty">Most available</option></select></div></div><div id="mgrid" class="mgrid">${marketCards(window._market)}</div>`};
  },
  profile: async () => {
    avState.changed = false; avState.value = '';
    const since = me.created_at ? String(me.created_at).slice(0, 10) : '';
    return {title: 'Profile', html: `<div class="pgrid">
    <div class="card pcard"><div class="av xl" id="avPrev">${avInner(me)}</div>
      <h2>${esc(me.name)}</h2><span class="badge">${me.role === 'buyer' ? 'Fish buyer' : 'Fisherfolk'}</span>
      <p class="pbio">${me.bio ? esc(me.bio) : 'You have not written anything about yourself yet.'}</p>
      <div class="pacts"><button type="button" class="sm" data-act="pickAvatar">Choose picture</button><button type="button" class="sm del" data-act="rmAvatar">Remove</button></div>
      <input type="file" id="avFile" accept="image/*" hidden>
      <p class="phint">Pick a picture, then press <b>Save changes</b> to keep it.</p>
      <ul class="pinfo"><li>${ico('pin')}${esc(me.location)}</li><li>${ico('phone')}${esc(me.phone)}</li><li>${ico('mail')}${esc(me.email)}</li></ul>
      ${since ? `<p class="since">Member since ${esc(since)}</p>` : ''}</div>
    <div class="card form"><form data-form="profile"><div class="err-msg" id="err"></div>
      <label>Name<input name="name" required value="${esc(me.name)}"></label>
      <div class="g"><label>Mobile number<input name="phone" required value="${esc(me.phone)}"></label><label>Location${cb(`name="location" required value="${esc(me.location)}"`, 'PLACES')}</label></div>
      <label>About you (optional)<textarea name="bio" rows="4" maxlength="300" placeholder="Tell buyers or sellers who you are: what you catch or buy, where, and when you are available.">${esc(me.bio || '')}</textarea></label>
      <div class="g"><label>Email<input value="${esc(me.email)}" readonly></label><label>Account type<input value="${me.role === 'buyer' ? 'Fish buyer' : 'Fisherfolk'}" readonly></label></div>
      <button class="btn">Save changes</button></form></div></div>`};
  },
  settings: async () => {
    const keys = await api('GET', '/api/passkeys'), t = getTheme(), problem = passkeyOk() ? passkeyHostProblem() : '';
    return {title: 'Settings', html: `<div class="sgrid">
    <div class="card"><h3 class="sh">Appearance</h3><p class="sp2">Choose how FishMatch looks on this device.</p>
      <div class="seg" role="radiogroup" aria-label="Theme">${[['light', 'Light', 'sun'], ['dark', 'Dark', 'moon'], ['auto', 'Match my device', 'monitor']].map(([v, l, i]) => `<button type="button" role="radio" aria-checked="${t === v}" class="${t === v ? 'on' : ''}" data-act="theme" data-id="${v}">${ico(i)}${l}</button>`).join('')}</div></div>
    <div class="card"><h3 class="sh">Log in with fingerprint</h3><p class="sp2">Use your phone or laptop's fingerprint, face or PIN instead of typing a password. Your fingerprint never leaves your device. FishMatch only keeps a public key.</p>
      ${keys.length ? `<ul class="pklist">${keys.map(k => `<li>${ico('finger')}<div><b>${esc(k.label)}</b><small>Added ${esc(String(k.created_at).slice(0, 10))}${k.last_used ? ' · last used ' + esc(String(k.last_used).slice(0, 10)) : ''}</small></div><button type="button" class="sm del" data-act="passkeyDel" data-id="${k.id}">Remove</button></li>`).join('')}</ul>` : '<p class="empty" style="padding:8px 0">No fingerprint added yet.</p>'}
      ${passkeyOk() ? '<button type="button" class="btn" data-act="passkeyAdd">Add fingerprint on this device</button>' : '<p class="fine">This browser does not support fingerprint login.</p>'}
      ${problem ? `<p class="warnbox">${esc(problem)}</p>` : ''}</div>
    <div class="card danger"><h3 class="sh">Delete account</h3><p class="sp2">This permanently deletes your account, ${fisher() ? 'all your fish listings' : 'all your requirements'} and your matches. It cannot be undone.</p>
      <button type="button" class="btn red" data-act="deleteAsk">Delete my account</button></div></div>`};
  }
};
const ALLOWED = {fisherfolk: ['dashboard', 'post', 'listings', 'matches', 'profile', 'settings', 'listing'], buyer: ['dashboard', 'market', 'requirement', 'requirements', 'matches', 'profile', 'settings', 'listing']};

/* ---------- actions ---------- */
const forms = {
  async buy(d) { await api('POST', '/api/orders', d); toast('Order placed. The kg were taken off the listing.'); go('#/history'); },
  async register(d) { d.name = (d.first + ' ' + d.last).trim(); me = await api('POST', '/api/register', d); go('#/dashboard'); },
  async forgot(d) { const r = await api('POST', '/api/password/forgot', d); RESET = {email: d.email.trim().toLowerCase(), emailOk: r.email_configured}; render(); },
  async reset(d) {
    await api('POST', '/api/password/reset', {email: RESET.email, code: d.code, password: d.password});
    forgetLocal(RESET.email); RESET = {}; toast('Password changed. Please log in.'); go('#/login/new');
  },
  async googleFinish(d) { me = await api('POST', '/api/google/complete', {...d, ticket: GOOGLE.ticket}); GOOGLE = null; go('#/dashboard'); },
  async deleteAccount(d) {
    await api('DELETE', '/api/me', d); forgetLocal(me.email); me = null; closeModal(); toast('Your account was deleted.'); go('#/');
  },
  async login(d) {
    delete d.remember;
    me = await api('POST', '/api/login', d);
    go('#/dashboard');
  },
  async post(d) {
    if (!photoState.changed) delete d.photo;
    const id = d.id; delete d.id;
    if (id) { await api('PUT', '/api/listings/' + id, d); toast('Listing updated.'); }
    else { await api('POST', '/api/listings', d); toast('Fish posted.'); }
    go('#/listings');
  },
  async requirement(d) { const r = await api('POST', '/api/requirements', d); toast(r.matches ? `Found ${r.matches} matching listing${r.matches > 1 ? 's' : ''}.` : 'Requirement saved. No matches yet.'); go('#/matches'); },
  async profile(d) { if (avState.changed) d.avatar = avState.value; me = await api('PUT', '/api/me', d); refreshSaved(me); toast('Profile saved.'); render(); }
};
const actions = {
  async orderDone(id) { await api('POST', '/api/orders/' + id + '/complete'); toast('Marked as completed.'); render(); },
  async orderCancel(id) { if (!confirm('Cancel this order? The kg go back on sale.')) return; await api('POST', '/api/orders/' + id + '/cancel'); toast('Order cancelled.'); render(); },
  async banUser(id) { const reason = prompt('Why are you banning this account?', 'Fake account'); if (reason === null) return; await api('POST', '/api/admin/ban', {user_id: id, reason}); toast('Account banned.'); render(); },
  async unbanUser(id) { if (!confirm('Unban this account?')) return; await api('POST', '/api/admin/unban', {user_id: id}); toast('Account unbanned.'); render(); },
  async reportUser(id) { const reason = prompt('Why are you reporting this account?'); if (!reason) return; await api('POST', '/api/users/' + id + '/report', {reason}); toast('Thanks. An admin will review this account.'); },
  async pickPhoto() { $('#photoFile').click(); },
  async pickAvatar() { $('#avFile').click(); },
  async rmAvatar() { avState.value = ''; avState.changed = true; $('#avPrev').textContent = (me.name || '?')[0].toUpperCase(); toast('Picture removed. Press Save changes to keep this.'); },
  async clearSearch() { $('#lq').value = ''; $('#ll').value = ''; drawList(); },
  async rmPhoto() { $('#photoVal').value = ''; photoState.changed = true; $('#prev').textContent = 'No photo yet'; },
  async logout() { await api('POST', '/api/logout'); me = null; closeModal(); go('#/'); },
  async logoutForget() { forgetAccount(me.email); await actions.logout(); },
  async switcher() { openSwitcher(); },
  async theme(v) { try { localStorage.setItem(THEME_KEY, v); } catch (e) {} applyTheme(v); render(); },
  async resetBack() { RESET = {}; render(); },
  async googleCancel() { GOOGLE = null; },
  async googleSetup() { toast(CONFIG && CONFIG.google_client_id ? 'Could not reach Google. Check your internet and try again.' : 'Google login needs setup first: add your Google client ID in backend/config.json (see README).', true); },
  async forgetAll() { if (!confirm('Forget all saved logins on this device?')) return; accounts().forEach(a => forgetAccount(a.email)); render(); },
  async passkeyLogin() {
    const prob = passkeyHostProblem(); if (prob) return toast(prob, true);
    const o = await api('POST', '/api/passkey/login/options');
    let c; try { c = await navigator.credentials.get({publicKey: {challenge: b64u.dec(o.challenge), rpId: o.rpId, userVerification: 'required', timeout: 60000}}); } catch (e) { return toast(passkeyErr(e), true); }
    if (!c) return;
    me = await api('POST', '/api/passkey/login', {cid: o.cid, id: c.id, clientDataJSON: b64u.enc(c.response.clientDataJSON), authenticatorData: b64u.enc(c.response.authenticatorData), signature: b64u.enc(c.response.signature)});
    go('#/dashboard');
  },
  async passkeyAdd() {
    const prob = passkeyHostProblem(); if (prob) return toast(prob, true);
    const label = prompt('Name this device (for example: My phone)', /Android|iPhone|iPad/.test(navigator.userAgent) ? 'My phone' : 'This computer'); if (label === null) return;
    const o = await api('POST', '/api/passkeys/options');
    let c; try {
      c = await navigator.credentials.create({publicKey: {challenge: b64u.dec(o.challenge), rp: o.rp,
        user: {id: b64u.dec(o.user.id), name: o.user.name, displayName: o.user.displayName},
        pubKeyCredParams: [{type: 'public-key', alg: -7}, {type: 'public-key', alg: -257}],
        excludeCredentials: o.exclude.map(id => ({type: 'public-key', id: b64u.dec(id)})),
        authenticatorSelection: {authenticatorAttachment: 'platform', residentKey: 'required', requireResidentKey: true, userVerification: 'required'},
        attestation: 'none', timeout: 60000}});
    } catch (e) { return toast(passkeyErr(e), true); }
    if (!c) return;
    await api('POST', '/api/passkeys', {clientDataJSON: b64u.enc(c.response.clientDataJSON), attestationObject: b64u.enc(c.response.attestationObject), label});
    toast('Fingerprint added. You can now log in with it.'); render();
  },
  async passkeyDel(id) { if (!confirm('Remove this fingerprint login?')) return; await api('DELETE', '/api/passkeys/' + id); toast('Removed.'); render(); },
  async deleteAsk() {
    $('#modal').innerHTML = `<div class="mdl"><div class="mbox"><h3>Delete your account?</h3>
      <p class="dtext">This permanently deletes your account and everything in it. ${me.has_password ? 'Type your password to confirm.' : 'Type your email <b>' + esc(me.email) + '</b> to confirm.'}</p>
      <form data-form="deleteAccount"><div class="err-msg" id="err"></div>
      ${me.has_password ? pw('password', 'Your password', 'current-password') : `<input name="confirm" placeholder="${esc(me.email)}" autocomplete="off" required>`}
      <div class="mact"><button type="button" class="sm" data-act="closeModal">Cancel</button><button class="btn red">Yes, delete everything</button></div></form></div></div>`;
  },
  async closeModal() { closeModal(); },
  async addAccount() { await api('POST', '/api/logout'); me = null; closeModal(); go('#/login/new'); },
  async switchTo(email) {
    const a = accounts().find(x => x.email === email); if (!a) return;
    await api('POST', '/api/logout'); me = null;
    try { me = await api('POST', '/api/login/saved', {token: a.token}); refreshSaved(me); closeModal(); go('#/dashboard'); }
    catch (err) { forgetLocal(email); closeModal(); toast('That saved login expired. Please log in again.', true); go('#/login/new'); }
  },
  async quickLogin(email) {
    const a = accounts().find(x => x.email === email); if (!a) return;
    try { me = await api('POST', '/api/login/saved', {token: a.token}); refreshSaved(me); go('#/dashboard'); }
    catch (err) { forgetLocal(email); toast('Your saved login expired. Please log in again.', true); go('#/login/new'); }
  },
  async forgetAcc(email) { if (!confirm('Remove this account from this device?')) return; forgetAccount(email); render(); },
  async sold(id) { await api('POST', `/api/listings/${id}/sold`); toast('Marked as sold.'); render(); },
  async delListing(id) { if (!confirm('Delete this listing?')) return; await api('DELETE', '/api/listings/' + id); toast('Listing deleted.'); render(); },
  async cancelReq(id) { if (!confirm('Cancel this requirement?')) return; await api('DELETE', '/api/requirements/' + id); toast('Requirement cancelled.'); render(); },
  async rematch() { await api('POST', '/api/match'); toast('Matches refreshed.'); render(); }
};
document.addEventListener('submit', async e => {
  const f = e.target.closest('[data-form]'); if (!f) return;
  e.preventDefault();
  const btn = f.querySelector('button:not([type])'), box = f.querySelector('#err');
  if (box) box.classList.remove('show');
  if (btn) btn.disabled = true;
  try { await forms[f.dataset.form](Object.fromEntries(new FormData(f))); }
  catch (err) { if (box) { box.textContent = err.message; box.classList.add('show'); } else toast(err.message, true); }
  if (btn) btn.disabled = false;
});
document.addEventListener('click', e => {
  if (e.target.classList && e.target.classList.contains('mdl')) return closeModal();
  const eye = e.target.closest('[data-eye]');
  if (eye) {
    const i = eye.parentElement.querySelector('input'), show = i.type === 'password';
    i.type = show ? 'text' : 'password'; eye.innerHTML = show ? EYE_OFF : EYE;
    eye.setAttribute('aria-label', show ? 'Hide password' : 'Show password'); return;
  }
  const a = e.target.closest('[data-act]');
  if (a) actions[a.dataset.act](a.dataset.id).catch(err => toast(err.message, true));
});

/* ---------- photos + marketplace helpers ---------- */
const photoState = {changed: false};
function readPhoto(file) {
  return new Promise((res, rej) => {
    if (!file.type.startsWith('image/')) return rej(new Error('Choose an image file.'));
    const fr = new FileReader();
    fr.onerror = () => rej(new Error('Could not read that photo.'));
    fr.onload = () => {
      const img = new Image();
      img.onerror = () => rej(new Error('That image could not be opened.'));
      img.onload = () => {
        const k = Math.min(1, 720 / Math.max(img.width, img.height)), c = document.createElement('canvas');
        c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
        const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height); x.drawImage(img, 0, 0, c.width, c.height);
        res(c.toDataURL('image/jpeg', .72));
      };
      img.src = fr.result;
    };
    fr.readAsDataURL(file);
  });
}
function marketCards(rows) {
  if (!rows.length) return '<p class="empty">No fish matches your search. Try a different species or location.</p>';
  return rows.map(l => `<a class="mcard" href="#/listing/${l.id}"><div class="mimg">${l.photo ? `<img src="${esc(l.photo)}" alt="${esc(l.species)}" loading="lazy">` : FISH}</div>
    <div class="mbody"><h3>${esc(l.species)}</h3><div class="mprice">${peso(l.price_per_kg)}<small> per kg</small></div>
    <div class="mmeta"><span class="badge">${cap(esc(l.freshness))}</span><span class="badge" style="background:var(--tint);color:var(--deep)">${l.source === 'farmed' ? 'Farm-raised' : 'Wild-caught'}</span><br>${kg(l.quantity_kg)} available · ${esc(l.location)}</div><div class="by">${av({name: l.fisher_name, avatar: l.fisher_avatar}, 'sm')}<span>${esc(l.fisher_name)}</span></div></div></a>`).join('');
}
function drawMarket() {
  const q = $('#mq').value.trim().toLowerCase(), loc = $('#ml').value.trim().toLowerCase(), mp = parseFloat($('#mp').value), sort = $('#ms').value;
  let r = (window._market || []).filter(l => (!q || l.species.toLowerCase().includes(q)) && (!loc || l.location.toLowerCase().includes(loc)) && (isNaN(mp) || l.price_per_kg <= mp));
  if (sort === 'low') r.sort((a, b) => a.price_per_kg - b.price_per_kg); else if (sort === 'qty') r.sort((a, b) => b.quantity_kg - a.quantity_kg);
  $('#mgrid').innerHTML = marketCards(r);
}
document.addEventListener('input', e => {
  if (['mq', 'ml', 'mp', 'ms'].includes(e.target.id)) drawMarket();
  if (['lq', 'll'].includes(e.target.id)) drawList();
  const w = e.target.closest && e.target.closest('.cb'); if (w && e.target.tagName === 'INPUT' && document.activeElement === e.target) cbDraw(w);
});
document.addEventListener('change', async e => {
  if (e.target.id !== 'photoFile' || !e.target.files[0]) return;
  try {
    const url = await readPhoto(e.target.files[0]);
    $('#photoVal').value = url; photoState.changed = true; $('#prev').innerHTML = `<img src="${url}" alt="Fish photo">`;
  } catch (err) { toast(err.message, true); }
});

/* ---------- avatars, searchable dropdowns, list search ---------- */
const avInner = u => u && u.avatar ? `<img src="${esc(u.avatar)}" alt="">` : esc(((u && u.name) || '?')[0].toUpperCase());
const av = (u, size = '') => `<div class="av ${size}">${avInner(u)}</div>`;
const avState = {changed: false, value: ''};
function readAvatar(file) {
  return new Promise((res, rej) => {
    if (!file.type.startsWith('image/')) return rej(new Error('Choose an image file.'));
    const fr = new FileReader();
    fr.onerror = () => rej(new Error('Could not read that picture.'));
    fr.onload = () => {
      const img = new Image();
      img.onerror = () => rej(new Error('That image could not be opened.'));
      img.onload = () => {
        const S = 256, side = Math.min(img.width, img.height), c = document.createElement('canvas');
        c.width = c.height = S;
        const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, S, S);
        x.drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, S, S);
        res(c.toDataURL('image/jpeg', .85));
      };
      img.src = fr.result;
    };
    fr.readAsDataURL(file);
  });
}
document.addEventListener('change', async e => {
  if (e.target.id !== 'avFile' || !e.target.files[0]) return;
  try {
    const url = await readAvatar(e.target.files[0]);
    avState.value = url; avState.changed = true; $('#avPrev').innerHTML = `<img src="${url}" alt="">`;
  } catch (err) { toast(err.message, true); }
});

/* searchable dropdown: type to filter, click or use arrow keys + Enter. Your own text is still allowed. */
const CB = {PLACES, SPECIES};
const cb = (attrs, key) => `<div class="cb" data-cb="${key}"><input ${attrs} autocomplete="off" role="combobox" aria-autocomplete="list" aria-expanded="false"><ul class="cbl" role="listbox" hidden></ul></div>`;
const hl = (x, q) => { const i = q ? x.toLowerCase().indexOf(q) : -1; return i < 0 ? esc(x) : esc(x.slice(0, i)) + '<mark>' + esc(x.slice(i, i + q.length)) + '</mark>' + esc(x.slice(i + q.length)); };
function cbClose() { document.querySelectorAll('.cbl:not([hidden])').forEach(l => { l.hidden = true; l.previousElementSibling.setAttribute('aria-expanded', 'false'); }); }
function cbDraw(wrap) {
  const input = wrap.querySelector('input'), list = wrap.querySelector('.cbl'), q = input.value.trim().toLowerCase();
  const hits = (CB[wrap.dataset.cb] || []).filter(x => x.toLowerCase().includes(q)).sort((a, b) => b.toLowerCase().startsWith(q) - a.toLowerCase().startsWith(q));
  list.innerHTML = hits.length ? hits.map(x => `<li role="option" data-v="${esc(x)}">${hl(x, q)}</li>`).join('') : `<li class="none">No match. We will use what you typed.</li>`;
  list.hidden = false; input.setAttribute('aria-expanded', 'true');
}
function cbPick(li) {
  const wrap = li.closest('.cb'), input = wrap.querySelector('input');
  input.value = li.dataset.v; input.dispatchEvent(new Event('input', {bubbles: true})); cbClose();
}
document.addEventListener('focusin', e => { const w = e.target.closest && e.target.closest('.cb'); if (w && e.target.tagName === 'INPUT') cbDraw(w); });
document.addEventListener('focusout', e => { if (e.target.closest && e.target.closest('.cb')) cbClose(); });
document.addEventListener('mousedown', e => {
  if (e.target.closest && e.target.closest('.cbl')) e.preventDefault();  // keep focus in the box (also while dragging the scrollbar)
  const li = e.target.closest && e.target.closest('.cbl li[data-v]');
  if (li) cbPick(li);
});
document.addEventListener('keydown', e => {
  const w = e.target.closest && e.target.closest('.cb'); if (!w || e.target.tagName !== 'INPUT') return;
  const list = w.querySelector('.cbl'), items = [...list.querySelectorAll('li[data-v]')];
  if (e.key === 'Escape') return cbClose();
  if (list.hidden && e.key === 'ArrowDown') { cbDraw(w); return e.preventDefault(); }
  if (!items.length) return;
  const cur = items.findIndex(i => i.classList.contains('on'));
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();
    const n = e.key === 'ArrowDown' ? (cur + 1) % items.length : (cur <= 0 ? items.length - 1 : cur - 1);
    items.forEach(i => i.classList.remove('on')); items[n].classList.add('on'); items[n].scrollIntoView({block: 'nearest'});
  } else if (e.key === 'Enter' && cur >= 0) { e.preventDefault(); cbPick(items[cur]); }
});

/* search bar for Manage listings, Manage requirements and Matching results */
let LIST = null;
const searchBar = () => `<div class="sbar"><div class="sf">${ico('search')}${cb('id="lq" placeholder="Search fish, e.g. Tilapia" aria-label="Search fish"', 'SPECIES')}</div><div class="sf">${ico('pin')}${cb('id="ll" placeholder="Search location" aria-label="Search location"', 'PLACES')}</div><button type="button" class="sm" data-act="clearSearch">Clear</button></div>`;
function drawList() {
  if (!LIST || !$('#lres')) return;
  const q = ($('#lq').value || '').trim().toLowerCase(), l = ($('#ll').value || '').trim().toLowerCase(), searching = !!(q || l);
  const rows = LIST.rows.filter(r => (!q || String(r.species).toLowerCase().includes(q)) && (!l || String(r.location).toLowerCase().includes(l)));
  $('#lres').innerHTML = (searching ? `<p class="cnt">${rows.length} of ${LIST.rows.length} shown</p>` : '') + LIST.table(rows, searching);
}
const listingTable = (rows, searching) => !rows.length
  ? (searching ? '<p class="empty">No listing matches your search.</p>' : '<p class="empty">You have not posted any fish yet. Post your first catch so buyers can find it.</p>')
  : `<div class="tw"><table><thead><tr><th></th><th>Fish</th><th>Quantity</th><th>Price</th><th>Location</th><th>Freshness</th><th>Status</th><th></th></tr></thead><tbody>${rows.map(l => `<tr><td>${l.photo ? `<img class="thumb" src="${esc(l.photo)}" alt="">` : '<div class="thumb"></div>'}</td><td><b>${esc(l.species)}</b><br><small style="color:var(--mute)">${l.source === 'farmed' ? 'Farm-raised' : 'Wild-caught'}</small></td><td>${kg(l.quantity_kg)}</td><td>${peso(l.price_per_kg)}/kg</td><td>${esc(l.location)}</td><td>${cap(esc(l.freshness))}</td><td><span class="st ${l.status === 'sold' ? 'sold' : ''}">${cap(l.status)}</span></td><td style="white-space:nowrap"><a class="sm" href="#/post/${l.id}">Edit</a> ${l.status === 'active' ? `<button class="sm" data-act="sold" data-id="${l.id}">Mark sold</button> ` : ''}<button class="sm del" data-act="delListing" data-id="${l.id}">Delete</button></td></tr>`).join('')}</tbody></table></div>`;
const reqTable = (rows, searching) => !rows.length
  ? (searching ? '<p class="empty">No requirement matches your search.</p>' : '<p class="empty">No requirements yet. <a href="#/requirement">Tell us what fish you need.</a></p>')
  : `<div class="tw"><table><thead><tr><th>Fish</th><th>Quantity</th><th>Highest price</th><th>Location</th><th>Lowest freshness</th><th></th></tr></thead><tbody>${rows.map(r => `<tr><td><b>${esc(r.species)}</b></td><td>${kg(r.quantity_kg)}</td><td>${peso(r.max_price_per_kg)}/kg</td><td>${esc(r.location)}</td><td>${cap(esc(r.min_freshness))}</td><td><button class="sm del" data-act="cancelReq" data-id="${r.id}">Cancel</button></td></tr>`).join('')}</tbody></table></div>`;

/* ---------- saved logins on this device (like Facebook's recent logins) ---------- */
const lastEmail = () => '';  // nothing is remembered between visits
const ACC_KEY = 'fm_accounts', roleName = r => r === 'buyer' ? 'Fish buyer' : 'Fisherfolk';
try { localStorage.removeItem(ACC_KEY); localStorage.removeItem('fm_last_email'); } catch (e) {}  // clear logins saved by older versions
const accounts = () => [];  // saved logins are turned off
const putAccounts = a => { try { localStorage.setItem(ACC_KEY, JSON.stringify(a.slice(0, 6))); } catch (e) {} };
function rememberAccount(u, token) { return;
  putAccounts([{email: u.email, name: u.name, role: u.role, avatar: u.avatar || '', token}, ...accounts().filter(x => x.email !== u.email)]);
}
function refreshSaved(u) {  // keep the saved card's name and picture up to date
  const a = accounts(), i = a.findIndex(x => x.email === u.email);
  if (i >= 0) { a[i] = {...a[i], name: u.name, role: u.role, avatar: u.avatar || ''}; putAccounts(a); }
}
function forgetLocal(email) { putAccounts(accounts().filter(x => x.email !== email)); }
function forgetAccount(email) {  // revoke on the server too
  const a = accounts().find(x => x.email === email);
  if (a && a.token) api('POST', '/api/login/forget', {token: a.token}).catch(() => {});
  forgetLocal(email);
}
const savedPicker = () => `<p class="eb">Welcome back</p><h2>Recent logins</h2><p class="sub">Click your picture to log in.</p>
  <div class="saved">${accounts().map(a => `<div class="sc"><button type="button" class="scb" data-act="quickLogin" data-id="${esc(a.email)}">${av(a, 'lg')}<b>${esc(a.name)}</b><small>${roleName(a.role)}</small></button><button type="button" class="scx" data-act="forgetAcc" data-id="${esc(a.email)}" aria-label="Remove ${esc(a.name)} from this device" title="Remove from this device">×</button></div>`).join('')}
  <a class="sc add" href="#/login/new"><span class="plus">+</span><b>Log in to another account</b></a></div>${passkeyOk() ? `<div class="soc" style="margin-top:14px">${passkeyBtn()}</div>` : ''}`;
function closeModal() { $('#modal').innerHTML = ''; }
function openSwitcher() {
  const saved = accounts(), here = saved.some(x => x.email === me.email), others = saved.filter(x => x.email !== me.email);
  $('#modal').innerHTML = `<div class="mdl"><div class="mbox"><h3>Switch account</h3>
    <div class="srow cur">${av(me, 'md')}<div><b>${esc(me.name)}</b><small>Logged in now${here ? '' : ' · not saved on this device'}</small></div></div>
    ${others.map(a => `<button type="button" class="srow" data-act="switchTo" data-id="${esc(a.email)}">${av(a, 'md')}<div><b>${esc(a.name)}</b><small>${roleName(a.role)} · click to switch</small></div></button>`).join('')}
    <button type="button" class="srow" data-act="addAccount"><span class="plus">+</span><div><b>Log in to another account</b><small>${here ? 'Your current login stays saved' : 'You will be logged out of this one'}</small></div></button>
    <hr class="mdiv">
    <button type="button" class="srow out" data-act="logout"><div><b>Log out</b><small>${here ? 'You can come back with one click' : 'Ends this session'}</small></div></button>
    ${here ? '<button type="button" class="srow out" data-act="logoutForget"><div><b>Log out and forget this device</b><small>Use this on a shared computer</small></div></button>' : ''}
    <div style="text-align:right;margin-top:10px"><button type="button" class="sm" data-act="closeModal">Close</button></div></div></div>`;
}

/* ---------- light / dark mode ---------- */
const THEME_KEY = 'fm_theme';
const getTheme = () => { try { return localStorage.getItem(THEME_KEY) || 'light'; } catch (e) { return 'light'; } };
const isDark = t => t === 'dark' || (t === 'auto' && typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches);
function applyTheme(t) { document.documentElement.setAttribute('data-theme', isDark(t) ? 'dark' : 'light'); }
if (typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').addEventListener) {
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { if (getTheme() === 'auto') applyTheme('auto'); });
}
applyTheme(getTheme());

/* ---------- forgot password, Google ---------- */
let RESET = {}, GOOGLE = null, CONFIG = null, gsi = null, gsiLang = null;
const GICON = '<svg viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.9 2.4 30.4 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.2C12.4 13.6 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.2 5.5-4.7 7.2l7.6 5.9c4.4-4.1 6.9-10.1 6.9-17.6z"/><path fill="#FBBC05" d="M10.5 28.6a14.5 14.5 0 0 1 0-9.2l-7.9-6.2a24 24 0 0 0 0 21.6l7.9-6.2z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.9l-7.9 6.2C6.5 42.6 14.6 48 24 48z"/></svg>';
const social = mode => `<div class="or"><span>or</span></div><div class="soc"><div id="gbtn" data-mode="${mode}"></div>${mode === 'login' ? passkeyBtn() : ''}</div>`;
const passkeyBtn = () => passkeyOk() ? `<button type="button" class="pk" data-act="passkeyLogin">${ico('finger')}Log in with fingerprint</button>` : '';
function loadGsi() {
  // hl = the language Google draws its button and pop-up in (otherwise Google picks it from the browser/Google account)
  if (!gsi) gsi = new Promise((res, rej) => { gsiLang = window.fmLang ? window.fmLang() : 'en'; const s = document.createElement('script'); s.src = 'https://accounts.google.com/gsi/client?hl=' + gsiLang; s.async = true; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
  return gsi;
}
async function onGoogle(resp) {
  try {
    const r = await api('POST', '/api/google', {credential: resp.credential});
    if (r.needs_profile) { GOOGLE = r; go('#/google'); } else { me = r.user; go('#/dashboard'); }
  } catch (err) { toast(err.message, true); }
}
async function initGoogle() {
  if (!$('#gbtn')) return;
  if (!CONFIG) { try { CONFIG = await api('GET', '/api/config'); } catch (e) { CONFIG = {}; } }
  const fill = () => { const b = $('#gbtn'); if (b) b.innerHTML = `<button type="button" class="gfb" data-act="googleSetup">${GICON}Continue with Google</button>`; return b; };
  let box = fill(); if (!box || !CONFIG.google_client_id) return;
  try { await loadGsi(); } catch (e) { return; }
  box = $('#gbtn'); if (!box || !window.google) return;
  google.accounts.id.initialize({client_id: CONFIG.google_client_id, callback: onGoogle});
  box.innerHTML = '';
  google.accounts.id.prompt();  // One Tap: lists the Google accounts already signed in on this phone/laptop
  drawGoogle(box);
}
// the Google button is drawn by Google itself (not by us), so its language has to be passed to Google
function drawGoogle(box) {
  if (!box || !window.google || !CONFIG || !CONFIG.google_client_id) return;
  box.innerHTML = '';
  google.accounts.id.renderButton(box, {theme: isDark(getTheme()) ? 'filled_black' : 'outline', size: 'large', shape: 'pill', locale: window.fmLang ? window.fmLang() : 'en', text: box.dataset.mode === 'register' ? 'signup_with' : 'signin_with', width: Math.min(340, box.clientWidth || 320)});
}
addEventListener('fmlang', () => { if (gsi && gsiLang !== window.fmLang()) location.reload(); else drawGoogle($('#gbtn')); });  // Google's script fixes its language when it loads

/* ---------- fingerprint / device unlock (passkeys) ---------- */
const passkeyOk = () => !!(window.PublicKeyCredential && navigator.credentials);
const b64u = {
  enc: b => btoa(String.fromCharCode(...new Uint8Array(b))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''),
  dec: s => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(s.length / 4) * 4, '=')), c => c.charCodeAt(0))
};
function passkeyHostProblem() {
  if (/^[\d.]+$/.test(location.hostname) || location.hostname.includes(':')) return 'To use fingerprint, open this site as http://localhost:' + (location.port || 80) + ' instead of ' + location.hostname + '.';
  if (!window.isSecureContext) return 'Fingerprint login only works on https or on localhost.';
  return '';
}
const passkeyErr = e => e && e.name === 'NotAllowedError' ? 'Fingerprint was cancelled or timed out.' : e && e.name === 'InvalidStateError' ? 'This device is already added.' : (e && e.message) || 'Fingerprint did not work.';

/* ---------- router ---------- */
async function render() {
  if (me === undefined) {
    try { me = (await api('GET', '/api/me')).user; }
    catch (e) { $('#root').innerHTML = `<div class="card" style="margin:60px auto;max-width:480px"><p class="empty">Cannot reach the FishMatch server. Make sure it is running, then open it from the address shown in its window (usually http://localhost:8000) and refresh.</p></div>`; return; }
  }
  const [page, arg] = (location.hash.replace(/^#\/?/, '') || '').split('/');
  const isPub = ['', 'login', 'register', 'forgot', 'google'].includes(page);
  if (page === 'google' && !GOOGLE) return go('#/register');
  if (!me && !isPub) return go('#/login');
  if (me && isPub) return go('#/dashboard');
  try {
    if (isPub) $('#root').innerHTML = pub[page || 'landing'](arg);
    else {
      const key = (ALLOWED[me.role].includes(page) || page === 'history' || (page === 'admin' && me.is_admin)) ? page : 'dashboard';
      LIST = null;
      const p = await priv[key](arg);
      $('#root').innerHTML = shell(key, p.title, p.html, p.stat);
    }
    scrollTo(0, 0);
    if (isPub) { initGoogle(); }
  } catch (err) {
    if (err.status === 401 && !isPub) {
      const justLoggedIn = Date.now() - loginAt < 15000;  // 401 right after a successful login = the browser threw the cookie away
      me = null; toast(justLoggedIn ? 'Your browser did not keep the login. Open FishMatch from the address shown in the server window (usually http://localhost:8000, not a saved file or another program), allow cookies for it, then try again.' : 'Your session ended. Please log in again.', true); return go('#/login');
    }
    toast(err.message, true); if (!isPub) { $('#root').innerHTML = shell('dashboard', 'Something went wrong', `<div class="card"><p class="empty">${esc(err.message)} <a href="#/dashboard">Back to dashboard</a></p></div>`); } }
}
async function autofillSaved() {  // browser's saved logins (Chrome/Edge/Android): fills email + password without typing
  const f = document.querySelector('form[data-form="login"]');
  if (!f || !window.PasswordCredential || f.password.value) return;
  try {
    const c = await navigator.credentials.get({password: true, mediation: 'optional'});
    if (c && document.body.contains(f)) { f.email.value = c.id; f.password.value = c.password; }
  } catch (e) {}
}
addEventListener('hashchange', render);
document.addEventListener('click', e => {  // clicking the page you are already on (e.g. Dashboard after an error) reloads it instead of doing nothing
  const a = e.target.closest && e.target.closest('a[href^="#/"]');
  if (a && a.getAttribute('href') === location.hash && me) { e.preventDefault(); render(); }
});
render();
