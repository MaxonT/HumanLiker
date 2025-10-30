(function(){
  const STR = {
    en: {
      "nav.app": "App",
      "nav.privacy": "Privacy",
      "nav.terms": "Terms",
      "ui.langLabel": "UI Language",
      "proc.lang": "Processing Language",
      "proc.auto": "Auto Detect",
      "tone.label": "Tone",
      "tone.neutral": "Neutral",
      "tone.friendly": "Friendly",
      "tone.assertive": "Assertive",
      "tone.story": "Story",
      "opt.vary": "Vary sentence length",
      "opt.markers": "Insert discourse markers",
      "opt.contractions": "Use English contractions",
      "input.label": "Input text (English or Chinese)",
      "input.placeholder": "Paste or type text to humanize...",
      "btn.humanize": "Humanize",
      "btn.reset": "Reset",
      "hint.privacy": "Local-only rewrite. Nothing is uploaded. For readability and style — not for academic misconduct or misattribution.",
      "output.label": "Output (copyable)",
      "output.placeholder": "Your humanized text will appear here…",
      "btn.copy": "Copy Output",
      "hint.ethics": "Do not use this tool for deceptive purposes (e.g., plagiarism or hiding authorship). It is for clearer, more human expression."
    },
    zh: {
      "nav.app": "应用",
      "nav.privacy": "隐私",
      "nav.terms": "条款",
      "ui.langLabel": "界面语言",
      "proc.lang": "处理语言",
      "proc.auto": "自动检测",
      "tone.label": "语气",
      "tone.neutral": "中性",
      "tone.friendly": "亲和",
      "tone.assertive": "干练",
      "tone.story": "叙事",
      "opt.vary": "变化句长",
      "opt.markers": "插入语气标记",
      "opt.contractions": "英文缩写",
      "input.label": "输入文本（中英皆可）",
      "input.placeholder": "粘贴或输入需要人性化改写的文本…",
      "btn.humanize": "Humanize",
      "btn.reset": "重置",
      "hint.privacy": "本地规则改写，不上传到服务器。用于可读性与风格优化，而非学术不端或隐瞒作者身份。",
      "output.label": "输出（可复制）",
      "output.placeholder": "这里将生成改写后的文本…",
      "btn.copy": "复制输出",
      "hint.ethics": "禁止将本工具用于欺骗性用途（如规避原创性检测、学术不端等）。"
    }
  }

  function applyI18n(lang){
    const dict = STR[lang] || STR.en
    document.querySelectorAll("[data-i18n]").forEach(el=>{
      const key = el.getAttribute("data-i18n")
      if(dict[key]) el.textContent = dict[key]
    })
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>{
      const key = el.getAttribute("data-i18n-placeholder")
      if(dict[key]) el.setAttribute("placeholder", dict[key])
    })
  }

  const sel = document.getElementById("uiLang")
  sel.addEventListener("change", ()=> applyI18n(sel.value))
  // Default to English UI
  applyI18n("en")
})();
