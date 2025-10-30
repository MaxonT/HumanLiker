function $(id){return document.getElementById(id)}
function rand(n){return Math.floor(Math.random()*n)}
function chance(p){return Math.random()<p}

// --- Core rewrite logic (same as v0.1) ---
const enSyn = [
  [/(?:^|\b)use(?:s|d)?\b/gi, "leverage"],
  [/(?:^|\b)make(?:s|d)?\b/gi, "create"],
  [/(?:^|\b)buy(?:s|ing|ought)?\b/gi, "purchase"],
  [/(?:^|\b)help(?:s|ed)?\b/gi, "assist"],
  [/(?:^|\b)try(?:s|ing|ied)?\b/gi, "attempt"],
  [/(?:^|\b)start(?:s|ed)?\b/gi, "initiate"],
  [/(?:^|\b)improve(?:s|d)?\b/gi, "enhance"],
  [/(?:^|\b)fix(?:es|ed)?\b/gi, "resolve"],
  [/(?:^|\b)need(?:s|ed)?\b/gi, "require"],
  [/\bbig\b/gi, "significant"]
]
const enMarkers = ["Honestly, ","In short, ","Big picture: ","Here's the thing, ","To be fair, ","That said, "]
const enContractions = [
  [/\bdo not\b/gi, "don't"],
  [/\bdoes not\b/gi, "doesn't"],
  [/\bcannot\b/gi, "can't"],
  [/\bit is\b/gi, "it's"],
  [/\bwe are\b/gi, "we're"],
  [/\bI am\b/gi, "I'm"],
  [/\bthey are\b/gi, "they're"],
  [/\byou are\b/gi, "you're"]
]
const zhSyn = [
  [/因此/g, "所以"],
  [/但是/g, "不过"],
  [/因为/g, "由于"],
  [/我们/g, "咱们"],
  [/用户/g, "人"],
  [/产品/g, "东西"],
  [/优化/g, "打磨"],
  [/迭代/g, "更新"],
  [/体验/g, "手感"]
]
const zhMarkers = ["说白了，","本质上，","简单讲，","其实，","坦白说，","关键在于，"]

function detectLang(t){return /[\u4e00-\u9fa5]/.test(t)?"zh":"en"}

function splitSentencesEN(t){ const parts = t.replace(/\s+/g,' ').match(/[^.!?]+[.!?]?/g) || [t]; return parts.map(s=>s.trim()).filter(Boolean) }
function splitSentencesZH(t){ const parts = t.replace(/\s+/g,'').split(/(?<=[。！？])/); return parts.map(s=>s.trim()).filter(Boolean) }

function joinShortEN(arr){ const out=[];let i=0; while(i<arr.length){ const a=arr[i]||"",b=arr[i+1]||""; if(a.length<40 && b.length<40){out.push(a.replace(/[.!?]?$/,'')+", and "+b.toLowerCase());i+=2} else {out.push(a);i+=1} } return out }
function splitLongEN(arr){ return arr.flatMap(s=> s.length>140 && s.includes(',')? s.split(',').map(x=>x.trim()).filter(Boolean): [s]) }
function varyEN(sentences, varyP){ let arr=[...sentences]; if(chance(varyP)) arr = joinShortEN(arr); if(chance(varyP)) arr = splitLongEN(arr); return arr }

function applyPairs(str, pairs){ let out=str; for(const [rpl, to] of pairs){ out = out.replace(rpl,to) } return out }

function humanizeEN(text, opts){
  const lvl = opts.level/100
  let sents = splitSentencesEN(text)
  if(opts.vary) sents = varyEN(sents, 0.6*lvl+0.2)
  sents = sents.map(s=>{ let x = s; if(lvl>0.2) x = applyPairs(x, enSyn); if(opts.contractions && lvl>0.3) x = applyPairs(x, enContractions); if(opts.markers && chance(0.35*lvl)) x = enMarkers[rand(enMarkers.length)] + x.charAt(0).toLowerCase()+x.slice(1); return x })
  return tidyEN(sents.join(' '))
}
function tidyEN(t){ return t.replace(/\s+,/g, ',').replace(/\s+\./g,'.').replace(/\s+!/g,'!').replace(/\s+\?/g,'?').replace(/\s{2,}/g,' ').trim() }

function joinShortZH(arr){ const out=[];let i=0; while(i<arr.length){ const a=arr[i]||"",b=arr[i+1]||""; if(a.length<12 && b.length<12){out.push(a.replace(/[。！？]$/,'')+"，而且"+b);i+=2} else {out.push(a);i+=1} } return out }
function splitLongZH(arr){ return arr.flatMap(s=> s.length>40 && s.includes('，')? s.split('，').map(x=>x+"。") : [s]) }
function varyZH(sentences, varyP){ let arr=[...sentences]; if(chance(varyP)) arr = joinShortZH(arr); if(chance(varyP)) arr = splitLongZH(arr); return arr }

function humanizeZH(text, opts){
  const lvl = opts.level/100
  let sents = splitSentencesZH(text)
  if(opts.vary) sents = varyZH(sents, 0.6*lvl+0.2)
  sents = sents.map(s=>{ let x = s; if(lvl>0.2) x = applyPairs(x, zhSyn); if(opts.markers && chance(0.35*lvl)) x = zhMarkers[rand(zhMarkers.length)] + x; x = x.replace(/，/g, (m)=> chance(0.15*lvl)? '——' : m); return x })
  return tidyZH(sents.join(''))
}
function tidyZH(t){ return t.replace(/。。+/g,'。').replace(/———+/g,'——').replace(/\s+/g,' ').trim() }

function humanityScore(text){
  const pieces = text.split(/[.!?。！？]/).map(x=>x.trim()).filter(Boolean)
  const avg = pieces.length ? pieces.map(x=>x.length).reduce((a,b)=>a+b,0)/pieces.length : 0
  const variance = Math.min(1, Math.abs(avg-18)/18)
  const markers = (text.match(/Honestly|In short|Big picture|Here's the thing|To be fair|That said|说白了|其实|本质上|关键在于|简单讲/g)||[]).length
  const mFactor = Math.min(1, markers/4)
  const base = 0.4 + 0.3*(1-variance) + 0.3*mFactor
  const clamp = Math.max(0, Math.min(1, base))
  return Math.round(clamp*100)
}

function addTone(text, kind){
  const lang = detectLang(text)
  if(lang==='zh'){
    if(kind==='friendly') return text.replace(/。/g,'。').replace(/$/,' 🙂')
    if(kind==='assertive') return text.replace(/(吗|吧|呢)？/g,'。').replace(/可能/g,'必需')
    if(kind==='story') return '从前并没有故事，但这个瞬间值得记录：'+text
    return text
  } else {
    if(kind==='friendly') return text + ' 🙂'
    if(kind==='assertive') return text.replace(/\bmaybe\b/gi,'must').replace(/\bperhaps\b/gi,'clearly')
    if(kind==='story') return "Once there wasn't a story—then this happened: "+text
    return text
  }
}

// --- Run button with processing language control ---
document.getElementById('run').addEventListener('click',()=>{
  const opts = {
    procLang: document.getElementById('procLang').value,
    tone: document.getElementById('tone').value,
    level: +document.getElementById('level').value,
    vary: document.getElementById('vary').checked,
    markers: document.getElementById('markers').checked,
    contractions: document.getElementById('contractions').checked
  }
  const src = document.getElementById('inputText').value || ''
  const lang = opts.procLang === 'auto' ? detectLang(src) : opts.procLang
  let out = lang === 'zh' ? humanizeZH(src, opts) : humanizeEN(src, opts)

  if(opts.tone==='friendly') out = addTone(out, 'friendly')
  if(opts.tone==='assertive') out = addTone(out, 'assertive')
  if(opts.tone==='story') out = addTone(out, 'story')

  document.getElementById('outputText').value = out
  document.getElementById('score').textContent = humanityScore(out)
})

// Copy & Reset
document.getElementById('copy').addEventListener('click', async()=>{
  const t = document.getElementById('outputText').value
  if(!t) return
  try{ await navigator.clipboard.writeText(t) }catch(e){}
})
document.getElementById('reset').addEventListener('click',()=>{
  document.getElementById('inputText').value=''
  document.getElementById('outputText').value=''
  document.getElementById('score').textContent='–'
})
