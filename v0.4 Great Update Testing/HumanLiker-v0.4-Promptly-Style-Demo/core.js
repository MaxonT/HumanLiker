(function(){
  'use strict';

  // Theme handling
  const selTheme = document.getElementById('themeSelect');
  function applyTheme(v){
    if(!v || v==='auto'){ document.documentElement.setAttribute('data-theme','auto'); }
    else { document.documentElement.setAttribute('data-theme', v); }
  }
  selTheme && selTheme.addEventListener('change', e=> applyTheme(e.target.value));

  // Lang handling
  const i18n = {
    en:{
      nav_demo:'Demo', nav_docs:'Docs', appearance:'System', system:'System', light:'Light', dark:'Dark', language:'English',
      hero_title:'Make AI sound human — naturally.', hero_sub:'HumanLiker rewrites model outputs into clear, warm, and natural language.',
      try_now:'Try Now', read_docs:'Read Docs',
      tone_acc:'Tone Accuracy', hl_score:'Human‑Likeness', token_cost:'Token Cost', rpm:'Rewrites/min', progress:'Progress %',
      input_text:'Input text', output_text:'Output text', tone:'Tone', grade:'Formality', humanize:'Humanize', copy:'Copy'
    },
    zh:{
      nav_demo:'演示', nav_docs:'文档', appearance:'系统', system:'系统', light:'浅色', dark:'深色', language:'中文',
      hero_title:'让 AI 说人话。', hero_sub:'HumanLiker 将模型输出改写得更自然、更温暖、更清晰。',
      try_now:'立即试用', read_docs:'阅读文档',
      tone_acc:'语气准确率', hl_score:'类人度', token_cost:'Token 成本', rpm:'每分钟改写数', progress:'进度 %',
      input_text:'输入文本', output_text:'输出文本', tone:'语气', grade:'正式度', humanize:'改写', copy:'复制'
    }
  };
  const selLang = document.getElementById('langSelect');
  if(selLang){
    selLang.innerHTML = ['en','zh'].map(l=>'<option value="'+l+'">'+(l==='en'?'English':'中文')+'</option>').join('');
    selLang.addEventListener('change', e=> applyLang(e.target.value));
  }
  function applyLang(lang){
    const dict = i18n[lang] || i18n.en;
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      if(dict[key]) el.textContent = dict[key];
    });
  }
  applyLang('en'); // default

  // Footer
  (function renderFooter(){
    const target = document.getElementById('footer'); if(!target) return;
    const email = 'support@humanliker.app';
    target.innerHTML = [
      '<span class="footer-split"><span class="copyright-symbol">©</span> <strong>HumanLiker</strong> v0.4 Demo</span>',
      '<span class="footer-split">No trackers. Preferences saved only after consent.</span>',
      '<span class="footer-split">Support: <a href="mailto:'+email+'">'+email+'</a></span>'
    ].join('');
  })();

  // KPI counters (demo values)
  function animateNumber(el, to, suffix='', duration=600){
    const start = performance.now();
    const from = 0;
    function step(t){
      const p = Math.min(1, (t-start)/duration);
      const v = from + (to-from)*p;
      el.textContent = (suffix==='%'?Math.round(v)+suffix: (Math.round(v*10)/10)) + (suffix && suffix!=='%' ? suffix : '');
      if(p<1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  animateNumber(document.getElementById('kpiTone'), 82, '%', 650);
  animateNumber(document.getElementById('kpiHuman'), 9.1, '', 650);
  animateNumber(document.getElementById('kpiCost'), 14.3, '', 650);
  animateNumber(document.getElementById('kpiRPM'), 26, '', 650);
  animateNumber(document.getElementById('kpiProgress'), 73, '%', 650);

  // Demo "humanize"
  const inputArea = document.getElementById('inputArea');
  const outputArea = document.getElementById('outputArea');
  const runBtn = document.getElementById('runBtn');
  const copyBtn = document.getElementById('copyBtn');
  const copyHint = document.getElementById('copyHint');

  function humanizeText(t, tone, grade){
    // Demo rule-based tweaks (offline, no API)
    t = (t||'').trim();
    if(!t) return '';
    // Normalize whitespace and sentence casing
    t = t.replace(/\s+/g,' ').replace(/(^\w|[\.\!\?]\s+\w)/g, s=> s.toUpperCase());
    // Tone adjustments
    if(tone==='friendly'){ t = "Hey — " + t; }
    if(tone==='concise'){ t = t.replace(/\b(essentially|basically|actually)\b/gi,'').replace(/\s{2,}/g,' '); }
    if(tone==='confident'){ t = t.replace(/\b(might|maybe|perhaps)\b/gi,'will'); }
    // Formality
    if(grade==='formal'){ t = t.replace(/\b(can't|won't|don't)\b/gi, m=>({'can\'t':'cannot','won\'t':'will not','don\'t':'do not'}[m.toLowerCase()])); }
    return t;
  }

  runBtn && runBtn.addEventListener('click', ()=>{
    outputArea.value = humanizeText(inputArea.value, document.getElementById('toneSelect').value, document.getElementById('gradeSelect').value);
  });

  copyBtn && copyBtn.addEventListener('click', ()=>{
    if(!outputArea.value){ copyHint.textContent = 'Nothing to copy.'; return; }
    outputArea.select(); document.execCommand('copy');
    copyHint.textContent = 'Copied ✓'; setTimeout(()=> copyHint.textContent = '', 1000);
  });
})();