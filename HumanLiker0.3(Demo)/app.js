
/* HumanLiker v0.3 Static (OFFLINE SAFE) — all locales embedded, no fetch or network calls */
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

const State = { user: null, lang: 'en', theme: 'system' };

// --- Embedded i18n ---
const I18N = { data: {
  "en": {"appName": "HumanLiker", "tagline": "Writing with a human heartbeat", "login": "Log in", "signup": "Sign up", "logout": "Log out", "profile": "Profile", "subscribe": "Subscribe $5/mo", "subActive": "Subscription Active", "subInactive": "Subscription Inactive", "language": "Language", "theme": "Theme", "light": "Light", "dark": "Dark", "system": "System", "email": "Email", "password": "Password", "confirmPassword": "Confirm password", "haveAccount": "Already have an account?", "noAccount": "No account yet?", "rewriteDemo": "Rewrite Demo", "inputText": "Input text", "outputText": "Output", "rewrite": "Rewrite", "privacy": "Privacy", "terms": "Terms", "cookies": "Cookies", "cookieConsent": "We use cookies to enhance your experience.", "accept": "Accept", "learnMore": "Learn more"},
  "zh": {"appName": "HumanLiker", "tagline": "让文字像人一样呼吸", "login": "登录", "signup": "注册", "logout": "退出登录", "profile": "Profile", "subscribe": "订阅 $5/月", "subActive": "订阅：已激活", "subInactive": "订阅：未激活", "language": "语言", "theme": "主题", "light": "浅色", "dark": "深色", "system": "跟随系统", "email": "Email", "password": "Password", "confirmPassword": "Confirm password", "haveAccount": "Already have an account?", "noAccount": "No account yet?", "rewriteDemo": "Rewrite Demo", "inputText": "输入文本", "outputText": "输出", "rewrite": "改写", "privacy": "隐私", "terms": "条款", "cookies": "Cookie", "cookieConsent": "我们使用 Cookie 以改善体验。", "accept": "同意", "learnMore": "了解更多"},
  "es": {"appName": "HumanLiker", "tagline": "Escritura con ritmo humano", "login": "Log in", "signup": "Sign up", "logout": "Log out", "profile": "Profile", "subscribe": "Subscribe $5/mo", "subActive": "Subscription Active", "subInactive": "Subscription Inactive", "language": "Language", "theme": "Theme", "light": "Light", "dark": "Dark", "system": "System", "email": "Email", "password": "Password", "confirmPassword": "Confirm password", "haveAccount": "Already have an account?", "noAccount": "No account yet?", "rewriteDemo": "Rewrite Demo", "inputText": "Input text", "outputText": "Output", "rewrite": "Rewrite", "privacy": "Privacy", "terms": "Terms", "cookies": "Cookies", "cookieConsent": "We use cookies to enhance your experience.", "accept": "Accept", "learnMore": "Learn more"},
  "fr": {"appName": "HumanLiker", "tagline": "Écrire avec un battement humain", "login": "Log in", "signup": "Sign up", "logout": "Log out", "profile": "Profile", "subscribe": "Subscribe $5/mo", "subActive": "Subscription Active", "subInactive": "Subscription Inactive", "language": "Language", "theme": "Theme", "light": "Light", "dark": "Dark", "system": "System", "email": "Email", "password": "Password", "confirmPassword": "Confirm password", "haveAccount": "Already have an account?", "noAccount": "No account yet?", "rewriteDemo": "Rewrite Demo", "inputText": "Input text", "outputText": "Output", "rewrite": "Rewrite", "privacy": "Privacy", "terms": "Terms", "cookies": "Cookies", "cookieConsent": "We use cookies to enhance your experience.", "accept": "Accept", "learnMore": "Learn more"},
  "hi": {"appName": "HumanLiker", "tagline": "मानवीय धड़कन के साथ लेखन", "login": "Log in", "signup": "Sign up", "logout": "Log out", "profile": "Profile", "subscribe": "Subscribe $5/mo", "subActive": "Subscription Active", "subInactive": "Subscription Inactive", "language": "Language", "theme": "Theme", "light": "Light", "dark": "Dark", "system": "System", "email": "Email", "password": "Password", "confirmPassword": "Confirm password", "haveAccount": "Already have an account?", "noAccount": "No account yet?", "rewriteDemo": "Rewrite Demo", "inputText": "Input text", "outputText": "Output", "rewrite": "Rewrite", "privacy": "Privacy", "terms": "Terms", "cookies": "Cookies", "cookieConsent": "We use cookies to enhance your experience.", "accept": "Accept", "learnMore": "Learn more"},
  "ar": {"appName": "HumanLiker", "tagline": "كتابة بنبض إنساني", "login": "Log in", "signup": "Sign up", "logout": "Log out", "profile": "Profile", "subscribe": "Subscribe $5/mo", "subActive": "Subscription Active", "subInactive": "Subscription Inactive", "language": "Language", "theme": "Theme", "light": "Light", "dark": "Dark", "system": "System", "email": "Email", "password": "Password", "confirmPassword": "Confirm password", "haveAccount": "Already have an account?", "noAccount": "No account yet?", "rewriteDemo": "Rewrite Demo", "inputText": "Input text", "outputText": "Output", "rewrite": "Rewrite", "privacy": "Privacy", "terms": "Terms", "cookies": "Cookies", "cookieConsent": "We use cookies to enhance your experience.", "accept": "Accept", "learnMore": "Learn more"},
  "pt": {"appName": "HumanLiker", "tagline": "Escrita com batida humana", "login": "Log in", "signup": "Sign up", "logout": "Log out", "profile": "Profile", "subscribe": "Subscribe $5/mo", "subActive": "Subscription Active", "subInactive": "Subscription Inactive", "language": "Language", "theme": "Theme", "light": "Light", "dark": "Dark", "system": "System", "email": "Email", "password": "Password", "confirmPassword": "Confirm password", "haveAccount": "Already have an account?", "noAccount": "No account yet?", "rewriteDemo": "Rewrite Demo", "inputText": "Input text", "outputText": "Output", "rewrite": "Rewrite", "privacy": "Privacy", "terms": "Terms", "cookies": "Cookies", "cookieConsent": "We use cookies to enhance your experience.", "accept": "Accept", "learnMore": "Learn more"},
  "ja": {"appName": "HumanLiker", "tagline": "人の鼓動のような文章へ", "login": "Log in", "signup": "Sign up", "logout": "Log out", "profile": "Profile", "subscribe": "Subscribe $5/mo", "subActive": "Subscription Active", "subInactive": "Subscription Inactive", "language": "Language", "theme": "Theme", "light": "Light", "dark": "Dark", "system": "System", "email": "Email", "password": "Password", "confirmPassword": "Confirm password", "haveAccount": "Already have an account?", "noAccount": "No account yet?", "rewriteDemo": "Rewrite Demo", "inputText": "Input text", "outputText": "Output", "rewrite": "Rewrite", "privacy": "Privacy", "terms": "Terms", "cookies": "Cookies", "cookieConsent": "We use cookies to enhance your experience.", "accept": "Accept", "learnMore": "Learn more"},
  "ko": {"appName": "HumanLiker", "tagline": "사람의 박동이 느껴지는 글쓰기", "login": "Log in", "signup": "Sign up", "logout": "Log out", "profile": "Profile", "subscribe": "Subscribe $5/mo", "subActive": "Subscription Active", "subInactive": "Subscription Inactive", "language": "Language", "theme": "Theme", "light": "Light", "dark": "Dark", "system": "System", "email": "Email", "password": "Password", "confirmPassword": "Confirm password", "haveAccount": "Already have an account?", "noAccount": "No account yet?", "rewriteDemo": "Rewrite Demo", "inputText": "Input text", "outputText": "Output", "rewrite": "Rewrite", "privacy": "Privacy", "terms": "Terms", "cookies": "Cookies", "cookieConsent": "We use cookies to enhance your experience.", "accept": "Accept", "learnMore": "Learn more"},
}, current: 'en' };
function loadLang(lang) { State.lang = lang; save('hl_lang', lang); render(); }
function t(key) { const pack = I18N.data[State.lang] || I18N.data.en; return pack[key] || key; }

// --- Utilities ---
function save(k,v){ localStorage.setItem(k, JSON.stringify(v)); }
function load(k,d){ try{ return JSON.parse(localStorage.getItem(k)) ?? d }catch{ return d } }
function setCookie(name, value, days=365) { const expires = new Date(Date.now()+days*864e5).toUTCString(); document.cookie = name+'='+encodeURIComponent(value)+'; expires='+expires+'; path=/'; }
function getCookie(name) { return document.cookie.split('; ').reduce((r,v)=>{ const p=v.split('='); return p[0]===name? decodeURIComponent(p[1]):r },''); }

// --- Theme ---
function applyTheme(theme){ if(theme==='system') document.documentElement.removeAttribute('data-theme'); else document.documentElement.setAttribute('data-theme', theme); State.theme=theme; save('hl_theme', theme); setCookie('hl_theme', theme); }

// --- Auth (local demo) ---
function hash(s){ let h=0; for (let i=0;i<s.length;i++){h=(h<<5)-h + s.charCodeAt(i); h|=0} return 'h'+(h>>>0).toString(16); }
function db(){ return load('hl_users', {}); }
function setdb(x){ save('hl_users', x); }
function signup(email, password){ const users=db(); const key=email.toLowerCase(); if(users[key]) throw new Error('exists'); users[key]={ pass: hash(password), sub:'inactive' }; setdb(users); login(email,password); }
function login(email, password){ const users=db(); const key=email.toLowerCase(); const u=users[key]; if(!u) throw new Error('no_user'); if(u.pass!==hash(password)) throw new Error('bad_pass'); State.user={ email:key, sub:u.sub||'inactive' }; save('hl_user', State.user); render(); }
function logout(){ State.user=null; localStorage.removeItem('hl_user'); render(); }

// --- Subscription (mock) ---
function subscribePlus(){ if(!State.user) return alert('Please log in first.'); const users=db(); users[State.user.email].sub='active'; setdb(users); State.user.sub='active'; save('hl_user', State.user); alert('Subscribed to HumanLiker Plus — $5/month (mock).'); render(); }

// --- Rewrite demo ---
function rewriteLocal(text){ const s=text.replace(/\s+/g,' ').replace(/\!+/g,'!').replace(/\?+/g,'?').replace(/\.+/g,'.'); return s.charAt(0).toUpperCase()+s.slice(1); }

// --- Views ---
function viewNav(){ return `
  <nav>
    <div class="brand">
      <img src="./assets/logo.svg" width="28" height="28" alt="logo"/>
      <span id="btnHome" style="cursor:pointer">${t('appName')}</span>
      <span class="badge">${t('tagline')}</span>
    </div>
    <div class="actions">
      <select id="langSel">
        <option value="en">English</option>
        <option value="zh">中文</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
        <option value="hi">हिंदी</option>
        <option value="ar">العربية</option>
        <option value="pt">Português</option>
        <option value="ja">日本語</option>
        <option value="ko">한국어</option>
      </select>
      <select id="themeSel">
        <option value="system">${t('system')}</option>
        <option value="light">${t('light')}</option>
        <option value="dark">${t('dark')}</option>
      </select>
      ${State.user ? `
        <span class="badge">${State.user.sub==='active'? t('subActive'): t('subInactive')}</span>
        <button id="btnProfile">${t('profile')}</button>
        <button id="btnLogout">${t('logout')}</button>
      ` : `
        <button id="btnLogin">${t('login')}</button>
        <button id="btnSignup">${t('signup')}</button>
      `}
    </div>
  </nav>
`; }

function viewHome(){ return `
  <div class="container">
    <div class="grid">
      <div class="col-6">
        <div class="card">
          <h2>${t('rewriteDemo')}</h2>
          <textarea id="inTxt" rows="6" placeholder="${t('inputText')}">Writing should breathe like a human.</textarea>
          <div style="height:12px"></div>
          <button id="btnRewrite">${t('rewrite')}</button>
          <div style="height:12px"></div>
          <div class="card"><strong>${t('outputText')}:</strong><div id="outTxt" style="margin-top:8px"></div></div>
        </div>
      </div>
      <div class="col-6">
        <div class="card">
          <h2>${t('subscribe')}</h2>
          <div class="notice">Plus unlimited — $5/month.</div>
          <div style="height:12px"></div>
          <button id="btnSubscribe">${t('subscribe')}</button>
        </div>
        <div style="height:12px"></div>
        <div class="card">
          <h2>Legal</h2>
          <div class="row">
            <a href="#privacy">${t('privacy')}</a>
            <a href="#terms">${t('terms')}</a>
            <a href="#cookies">${t('cookies')}</a>
          </div>
          <p class="notice">v0.3 · Updated 2025-10-29</p>
        </div>
      </div>
    </div>
  </div>
`; }

function viewAuth(kind){ return `
  <div class="container">
    <div class="card">
      <h2>${t(kind)}</h2>
        <div class=\"row\"><a href=\"#/\" id=\"btnBack\" class=\"badge\">← Back</a></div>
      <div class="row"><input id="email" placeholder="${t('email')}"/></div>
      <div class="row"><input id="password" type="password" placeholder="${t('password')}"/></div>
      ${kind==='signup' ? `<div class="row"><input id="confirm" type="password" placeholder="${t('confirmPassword')}"/></div>`:''}
      <div class="row"><button id="btnGo">${t(kind)}</button></div>
        <div class="notice">${kind==='login' ? `${t('noAccount')} <a href="#/signup">Sign up</a>` : `${t('haveAccount')} <a href="#/login">Log in</a>`}</div>
    </div>
  </div>
`; }

function viewProfile(){ if(!State.user) return viewAuth('login'); return `
  <div class="container">
    <div class="card">
      <h2>${t('profile')}</h2>
      <div>${State.user.email}</div>
      <div style="height:12px"></div>
      <div class="row">
        <span class="badge">${State.user.sub==='active'? t('subActive'): t('subInactive')}</span>
        ${State.user.sub!=='active' ? `<button id="btnSubscribe">${t('subscribe')}</button>`:''}
      </div>
    </div>
  </div>
`; }

function viewLegal(which){ return `
  <div class="container">
    <div class="card">
      <h2>${t(which)}</h2>
      <p class="notice">v0.3 · Updated 2025-10-29</p>
      <p>HumanLiker stores essential data locally (language, theme, and demo auth). No network calls are made in this offline demo. Replace with formal policies for production.</p>
    </div>
  </div>
`; }

function viewCookieBanner(){ if(getCookie('hl_cookie')==='1' || localStorage.getItem('hl_cookie')==='1') return ''; return `
  <div class="cookie card">
    <div class="row" style="justify-content:space-between">
      <div>${t('cookieConsent')} <a href="#cookies">${t('learnMore')}</a></div>
      <button id="btnAccept">${t('accept')}</button>
    </div>
  </div>
`; }

function viewFooter(){ return `
  <div class="footer container">
    <div class="notice">© 2025 HumanLiker v0.3</div>
    <div class="row">
      <a href="#privacy">${t('privacy')}</a>
      <a href="#terms">${t('terms')}</a>
      <a href="#cookies">${t('cookies')}</a>
    </div>
  </div>
`; }

function currentRoute(){ const h=location.hash || '#/'; if(h.startsWith('#/login')) return 'login'; if(h.startsWith('#/signup')) return 'signup'; if(h.startsWith('#/profile')) return 'profile'; if(h.startsWith('#privacy')) return 'privacy'; if(h.startsWith('#terms')) return 'terms'; if(h.startsWith('#cookies')) return 'cookies'; return 'home'; }

function render(){
  const root = document.getElementById('root');
  let main = '';
  const route = currentRoute();
  root.innerHTML = viewNav();
  if(route==='home') main = viewHome();
  else if(route==='login') main = viewAuth('login');
  else if(route==='signup') main = viewAuth('signup');
  else if(route==='profile') main = viewProfile();
  else if(['privacy','terms','cookies'].includes(route)) main = viewLegal(route);
  root.innerHTML += main;
  root.innerHTML += viewFooter();
  root.innerHTML += viewCookieBanner();

  const langSel = document.getElementById('langSel'); if(langSel){ langSel.value=State.lang; langSel.onchange=e=>loadLang(e.target.value); }
  const themeSel = document.getElementById('themeSel'); if(themeSel){ themeSel.value=State.theme; themeSel.onchange=e=>applyTheme(e.target.value); }
  const btnRewrite = document.getElementById('btnRewrite'); if(btnRewrite) btnRewrite.onclick = ()=>{ document.getElementById('outTxt').textContent = rewriteLocal(document.getElementById('inTxt').value); };
  const btnSubscribe = document.getElementById('btnSubscribe'); if(btnSubscribe) btnSubscribe.onclick = subscribePlus;
  const btnLogin = document.getElementById('btnLogin'); if(btnLogin) btnLogin.onclick = ()=>{ location.hash='#/login'; render(); };
  const btnSignup = document.getElementById('btnSignup'); if(btnSignup) btnSignup.onclick = ()=>{ location.hash='#/signup'; render(); };
  const btnProfile = document.getElementById('btnProfile'); if(btnProfile) btnProfile.onclick = ()=>{ location.hash='#/profile'; render(); };
  const btnLogout = document.getElementById('btnLogout'); if(btnLogout) btnLogout.onclick = logout;
  const btnHome = document.getElementById('btnHome'); if(btnHome){ btnHome.onclick = ()=>{ location.hash='#/'; render(); }; }
  const btnBack = document.getElementById('btnBack'); if(btnBack){ btnBack.onclick = ()=>{ location.hash='#/'; }; }

  const btnAccept = document.getElementById('btnAccept'); if(btnAccept) btnAccept.onclick = ()=>{ setCookie('hl_cookie','1'); localStorage.setItem('hl_cookie','1'); render(); };
  const btnGo = document.getElementById('btnGo');
  if(btnGo){
    btnGo.onclick = ()=>{
      const email = document.getElementById('email').value.trim();
      const pass = document.getElementById('password').value;
      if(!email || !pass) return alert('Email/Password required.');
      const route = currentRoute();
      if(route==='signup'){
        const conf = document.getElementById('confirm').value;
        if(pass!==conf) return alert('Password mismatch.');
        try{ signup(email, pass); location.hash='#/'; render(); }
        catch(e){ alert(e.message==='exists' ? 'User exists.' : 'Sign up failed.'); }
      }else{
        try{ login(email, pass); location.hash='#/'; render(); }
        catch(e){ alert('Login failed.'); }
      }
    };
  }
}

// --- Init ---
(function init(){
  State.lang = load('hl_lang','en');
  State.theme = load('hl_theme','system');
  State.user = load('hl_user', null);
  applyTheme(State.theme);
  window.addEventListener('hashchange', render);
  render();
})();
