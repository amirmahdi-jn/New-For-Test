'use strict';

/* ---------- داده‌ها ---------- */
const chemicals = [
  {id:'water',name:'آب',formula:'H₂O',color:'#5bd9f2',symbol:'◌',desc:'حلالی رایج برای بسیاری از مواد.'},
  {id:'hcl',name:'اسید هیدروکلریک',formula:'HCl',color:'#f0b45c',symbol:'H⁺',desc:'اسید قوی؛ محلول رقیق آن بی‌رنگ است.',hazard:true},
  {id:'naoh',name:'هیدروکسید سدیم',formula:'NaOH',color:'#83e3b0',symbol:'OH⁻',desc:'باز قوی؛ محلول آن معمولاً بی‌رنگ است.',hazard:true},
  {id:'baking',name:'جوش شیرین',formula:'NaHCO₃',color:'#d5e5f2',symbol:'▧',desc:'نمک جامد که با اسیدها گاز تولید می‌کند.'},
  {id:'vinegar',name:'سرکه رقیق',formula:'CH₃COOH',color:'#d4e779',symbol:'≈',desc:'محلول رقیق اسید استیک؛ اسیدی ضعیف.'},
  {id:'cuso4',name:'سولفات مس',formula:'CuSO₄',color:'#45aaff',symbol:'Cu',desc:'محلول آبی‌رنگ یون‌های مس(II).',hazard:true},
  {id:'fecl3',name:'کلرید آهن(III)',formula:'FeCl₃',color:'#dca45d',symbol:'Fe',desc:'محلول زرد تا زردـقهوه‌ای یون آهن(III).',hazard:true},
  {id:'agno3',name:'نیترات نقره',formula:'AgNO₃',color:'#c7d5e6',symbol:'Ag',desc:'محلول بی‌رنگ؛ با برخی یون‌ها رسوب می‌دهد.',hazard:true},
  {id:'nacl',name:'کلرید سدیم',formula:'NaCl',color:'#d5e4ee',symbol:'✧',desc:'نمک خوراکی؛ در آب محلول است.'},
  {id:'ki',name:'یدید پتاسیم',formula:'KI',color:'#c1a1ff',symbol:'K⁺',desc:'نمک محلول؛ یون یدید می‌تواند رسوب بسازد.'}
];

const reactions = {};
function addReaction(a,b,data){reactions[[a,b].sort().join('|')]={...data,ids:[a,b]};}

addReaction('vinegar','baking',{
 type:'واکنش اسید و کربنات هیدروژن',title:'تولید گاز کربن‌دی‌اکسید',
 equation:'CH₃COOH + NaHCO₃ → CH₃COONa + H₂O + CO₂↑',
 observation:'حباب‌زایی و آزاد شدن گاز بی‌رنگ؛ شدت آن به غلظت و مقدار مواد بستگی دارد.',
 explanation:'اسید استیک با یون هیدروژن‌کربنات واکنش می‌دهد. ابتدا اسید کربنیک تشکیل می‌شود که به آب و کربن‌دی‌اکسید تجزیه می‌شود. در این شبیه‌سازی، حباب‌ها نمایش نمادین گاز هستند.',
 effect:'gas',color:'#d4e779',tags:['تولید گاز','حباب‌زایی'],safety:'این نمایش فقط مجازی است؛ از مخلوط‌کردن مواد واقعی بدون نظارت متخصص خودداری کنید.'
});
addReaction('cuso4','naoh',{
 type:'رسوب‌گیری',title:'تشکیل رسوب آبی مس(II) هیدروکسید',
 equation:'CuSO₄(aq) + 2NaOH(aq) → Cu(OH)₂(s)↓ + Na₂SO₄(aq)',
 observation:'رسوب آبی روشن مس(II) هیدروکسید تشکیل می‌شود.',
 explanation:'یون‌های مس(II) و هیدروکسید ترکیب کم‌محلول Cu(OH)₂ را می‌سازند. مقدار و ظاهر رسوب در دنیای واقعی به غلظت و نسبت مواد بستگی دارد.',
 effect:'precipitate',color:'#43a8ff',precipitate:'#48aaff',tags:['رسوب آبی','تغییر ظاهری'],safety:'ترکیبات مس را نخورید و از تماس با پوست و محیط زیست جلوگیری کنید.'
});
addReaction('agno3','nacl',{
 type:'رسوب‌گیری',title:'تشکیل رسوب سفید نقره کلرید',
 equation:'AgNO₃(aq) + NaCl(aq) → AgCl(s)↓ + NaNO₃(aq)',
 observation:'رسوب سفید نقره کلرید تشکیل می‌شود.',
 explanation:'یون نقره با یون کلرید ترکیب کم‌محلول AgCl را تشکیل می‌دهد. نیترات سدیم در محلول باقی می‌ماند.',
 effect:'precipitate',color:'#d9e6ef',precipitate:'#edf4f7',tags:['رسوب سفید'],safety:'نیترات نقره می‌تواند به پوست و چشم آسیب بزند و لکه ایجاد کند؛ این آزمایش فقط مجازی است.'
});
addReaction('fecl3','naoh',{
 type:'رسوب‌گیری',title:'تشکیل رسوب قهوه‌ای آهن(III) هیدروکسید',
 equation:'FeCl₃(aq) + 3NaOH(aq) → Fe(OH)₃(s)↓ + 3NaCl(aq)',
 observation:'رسوب ژلاتینی قهوه‌ای مایل به قرمز ایجاد می‌شود.',
 explanation:'یون‌های آهن(III) با یون‌های هیدروکسید ترکیب کم‌محلول Fe(OH)₃ را می‌سازند. رنگ دقیق مشاهده‌شده ممکن است با شرایط محلول تغییر کند.',
 effect:'precipitate',color:'#dca45d',precipitate:'#a85d35',tags:['رسوب قهوه‌ای'],safety:'از تماس با محلول‌های خورنده و ترکیبات آهن خودداری کنید.'
});
addReaction('agno3','ki',{
 type:'رسوب‌گیری',title:'تشکیل رسوب زرد نقره یدید',
 equation:'AgNO₃(aq) + KI(aq) → AgI(s)↓ + KNO₃(aq)',
 observation:'رسوب زرد نقره یدید تشکیل می‌شود.',
 explanation:'یون نقره و یون یدید ترکیب بسیار کم‌محلول AgI را تشکیل می‌دهند؛ نیترات پتاسیم در محلول باقی می‌ماند.',
 effect:'precipitate',color:'#f0d74f',precipitate:'#f4d43d',tags:['رسوب زرد'],safety:'نیترات نقره خطر تماس دارد؛ ترکیبات یدید نیز نباید بلعیده شوند.'
});
addReaction('hcl','naoh',{
 type:'واکنش اسید و باز',title:'خنثی‌سازی اسید و باز',
 equation:'HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)',
 observation:'در محلول‌های رقیق معمولاً تغییر رنگ یا رسوب قابل مشاهده‌ای رخ نمی‌دهد؛ گرما آزاد می‌شود.',
 explanation:'یون هیدروژن اسید با یون هیدروکسید باز ترکیب شده و آب می‌سازد. معادله یونی خالص: H⁺(aq) + OH⁻(aq) → H₂O(l). میزان گرمای آزادشده به مقدار و غلظت وابسته است.',
 effect:'glow',color:'#a4e9d3',tags:['خنثی‌سازی','آزاد شدن گرما'],safety:'اسید هیدروکلریک و هیدروکسید سدیم خورنده‌اند. این ترکیب را در دنیای واقعی انجام ندهید.'
});
addReaction('hcl','baking',{
 type:'واکنش اسید با هیدروژن‌کربنات',title:'آزاد شدن کربن‌دی‌اکسید',
 equation:'HCl + NaHCO₃ → NaCl + H₂O + CO₂↑',
 observation:'با فراهم بودن مقدار کافی از هر دو ماده، حباب‌های گاز تشکیل می‌شوند.',
 explanation:'یون هیدروژن‌کربنات در حضور اسید به کربن‌دی‌اکسید و آب تبدیل می‌شود. این معادله کلی برای محلول‌های آبی است.',
 effect:'gas',color:'#a8d9ee',tags:['تولید گاز'],safety:'اسید هیدروکلریک خورنده است؛ شبیه‌سازی را با مواد واقعی تکرار نکنید.'
});
addReaction('vinegar','naoh',{
 type:'واکنش اسید و باز',title:'خنثی‌سازی اسید استیک',
 equation:'CH₃COOH + NaOH → CH₃COONa + H₂O',
 observation:'در محلول‌های رقیق، معمولاً رسوب یا گاز قابل مشاهده‌ای تشکیل نمی‌شود.',
 explanation:'اسید استیک با هیدروکسید سدیم واکنش می‌دهد و استات سدیم و آب می‌سازد. مقدار گرما و pH نهایی به نسبت و غلظت مواد وابسته است.',
 effect:'glow',color:'#b8e9bd',tags:['خنثی‌سازی'],safety:'هیدروکسید سدیم خورنده است؛ این ترکیب فقط در محیط مجازی نمایش داده می‌شود.'
});
addReaction('cuso4','ki',{
 type:'واکنش اکسایش ـ کاهش',title:'واکنش یون‌های مس و یدید',
 equation:'2CuSO₄ + 4KI → 2CuI(s)↓ + I₂ + 2K₂SO₄',
 observation:'در شرایط مناسب، رسوب روشن مس(I) یدید و رنگ قهوه‌ای ناشی از ید ممکن است دیده شود.',
 explanation:'این ترکیب صرفاً تبادل ساده یون‌ها نیست؛ یدید می‌تواند مس(II) را به مس(I) کاهش دهد و خود به ید اکسید شود. ظاهر نهایی به غلظت و شرایط وابسته است.',
 effect:'precipitate',color:'#b6a27b',precipitate:'#e5ddbd',tags:['واکنش اکسایش ـ کاهش','رسوب'],safety:'این شبیه‌سازی آموزشی است و برای اجرای عملی توصیه نمی‌شود.'
});

/* ---------- ابزارها ---------- */
const $ = id => document.getElementById(id);
function safeParse(value,fallback){try{return value?JSON.parse(value):fallback}catch{return fallback}}
function safeGet(key,fallback){try{const v=localStorage.getItem(key);return v===null?fallback:v}catch{return fallback}}
function safeSet(key,value){try{localStorage.setItem(key,value)}catch{}}
function safeRemove(key){try{localStorage.removeItem(key)}catch{}}
function faNum(n){return String(n).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[Number(d)])}
function chem(id){return chemicals.find(c=>c.id===id)}
function keyFor(a,b){return [a,b].sort().join('|')}
function hexToRgb(hex){
  let h=String(hex||'#4ee5e5').replace('#','');
  if(h.length===3)h=h.split('').map(c=>c+c).join('');
  const n=parseInt(h,16);
  return {r:(n>>16)&255,g:(n>>8)&255,b:n&255};
}
function rgbToHex({r,g,b}){const t=v=>v.toString(16).padStart(2,'0');return `#${t(r)}${t(g)}${t(b)}`}
function blendColors(a,b){const pa=hexToRgb(a),pb=hexToRgb(b);const m=(x,y)=>Math.round((x+y)/2);return rgbToHex({r:m(pa.r,pb.r),g:m(pa.g,pb.g),b:m(pa.b,pb.b)})}
function hexWithAlpha(hex,alphaHex){const {r,g,b}=hexToRgb(hex);const t=v=>v.toString(16).padStart(2,'0');return `#${t(r)}${t(g)}${t(b)}${alphaHex}`}

/* ---------- وضعیت ---------- */
let selected = [];
let activeTube = 2;
let tubeContents = {1:[],2:[]};
let reactionCount = Number(safeGet('chemLabCount','0')) || 0;
let history = safeParse(safeGet('chemLabHistory','[]'),[]) || [];
if(!Array.isArray(history)) history = [];
let soundEnabled = false;
let toastTimer;
let audioCtx = null;

/* ---------- رندر مواد ---------- */
function renderChemicals(){
  $('chemicalList').innerHTML = chemicals.map(c=>`
    <button type="button" class="chemical-card" style="--chemical:${c.color}" data-id="${c.id}" draggable="true" aria-pressed="false" title="انتخاب ${c.name}">
      <span class="chemical-top"><span class="chemical-orb">${c.symbol}</span><span class="formula">${c.formula}</span></span>
      <span class="chemical-name">${c.name}</span><span class="chemical-desc">${c.desc}</span>
    </button>`).join('');
  document.querySelectorAll('.chemical-card').forEach(card=>{
    let dragged=false;
    card.addEventListener('click',()=>{if(dragged){dragged=false;return}toggleChemical(card.dataset.id)});
    card.addEventListener('dragstart',e=>{dragged=true;e.dataTransfer.setData('text/plain',card.dataset.id);e.dataTransfer.effectAllowed='copy';card.classList.add('dragging')});
    card.addEventListener('dragend',()=>{card.classList.remove('dragging');setTimeout(()=>{dragged=false},50)});
  });
}

/* ---------- انتخاب مواد ---------- */
function toggleChemical(id){
  if(selected.includes(id)){selected=selected.filter(x=>x!==id)}
  else if(selected.length<2){selected.push(id)}
  else {selected=[selected[1],id];showToast('انتخاب قبلی جایگزین شد؛ دو ماده انتخاب شده‌اند.')}
  syncTubeWithSelection();
  renderSelection();
}

function syncTubeWithSelection(){
  // انتخاب‌ها همیشه به لوله فعال گره می‌خورند تا UI با منطق یکی باشد
  tubeContents[activeTube] = selected.slice();
  updateTubeLabel(activeTube);
}

function updateTubeLabel(n){
  const ids = tubeContents[n] || [];
  const text = ids.length ? ids.map(id=>chem(id)?.name).filter(Boolean).join('، ') : 'خالی';
  $(`contents${n}`).textContent = text;
}

function renderSelection(){
  document.querySelectorAll('.chemical-card').forEach(card=>{
    const on = selected.includes(card.dataset.id);
    card.classList.toggle('selected',on);
    card.setAttribute('aria-pressed',String(on));
  });
  $('selectedChips').innerHTML = selected.length
    ? selected.map(id=>{const c=chem(id);return c?`<span class="selected-chip" style="--chip:${c.color}">${c.name} <bdi dir="ltr">${c.formula}</bdi></span>`:''}).join('')
    : '<span class="empty-chip">هنوز ماده‌ای انتخاب نشده</span>';
  $('combineBtn').disabled = selected.length !== 2;
}

/* ---------- لوله فعال ---------- */
function setActiveTube(n){
  if(n===activeTube) return;
  activeTube = n;
  [1,2].forEach(i=>$(`tube${i}`).classList.toggle('active-tube',i===n));
  // انتخاب‌ها با لوله فعال همگام می‌شوند
  selected = (tubeContents[n]||[]).slice();
  renderSelection();
  updateTubeLabel(1);updateTubeLabel(2);
  showToast(`لوله ${faNum(n)} انتخاب شد.`);
}

/* ---------- انیمیشن لوله ---------- */
function animateTube(n,data,ids){
  const liquid = $(`liquid${n}`);
  const precip = $(`precipitate${n}`);
  const bubbles = $(`bubbles${n}`);
  const base = data.color || '#4ee5e5';
  liquid.style.height = ids.length ? '58%' : '0';
  liquid.style.background = `linear-gradient(90deg,${hexWithAlpha(base,'66')},${hexWithAlpha(base,'bd')} 50%,${hexWithAlpha(base,'55')})`;
  precip.style.height = data.effect==='precipitate' ? '25%' : '0';
  precip.style.background = data.precipitate || '#edf4f7';
  bubbles.innerHTML = data.effect==='gas' ? '<i class="bubble"></i><i class="bubble"></i><i class="bubble"></i>' : '';
  if(data.effect==='glow'){
    $(`tube${n}`).animate(
      [{filter:'drop-shadow(0 0 0px #a4e9d3)'},{filter:'drop-shadow(0 0 16px #a4e9d3)'},{filter:'drop-shadow(0 0 2px #a4e9d3)'}],
      {duration:1000}
    );
  }
  const flash = $('reactionFlash');
  flash.classList.remove('flash');void flash.offsetWidth;flash.classList.add('flash');
}

/* ---------- اجرای واکنش ---------- */
function runReaction(){
  if(selected.length!==2) return;
  const [a,b] = selected;
  const ca = chem(a), cb = chem(b);
  if(!ca || !cb) return;
  const data = reactions[keyFor(a,b)];
  const result = data || {
    type:'ترکیب تعریف‌نشده در پایگاه آموزشی',title:'نتیجه مشخصی ثبت نشده است',
    observation:'در این شبیه‌سازی، تغییر قابل اتکایی نمایش داده نمی‌شود.',
    explanation:'برای این جفت ماده، داده واکنش مشخصی در پایگاه آموزشی تعریف نشده است. این به معنی نبود واکنش در همه شرایط نیست؛ غلظت، دما، حلالیت و شرایط آزمایش می‌توانند نتیجه را تغییر دهند.',
    effect:'mix',color:blendColors(ca.color,cb.color),tags:['نتیجه نامشخص'],safety:'هیچ نتیجه‌ای را بدون بررسی منابع علمی و نظر متخصص به آزمایش واقعی تعمیم ندهید.'
  };
  tubeContents[activeTube] = [a,b];
  animateTube(activeTube,result,[a,b]);
  $(`contents${activeTube}`).textContent = `${ca.name} + ${cb.name}`;
  renderResult(ca,cb,result,!!data);
  reactionCount++;
  safeSet('chemLabCount',String(reactionCount));
  $('reactionCount').textContent = faNum(reactionCount);
  const item = {a,b,title:result.title,type:result.type,time:new Date().toLocaleTimeString('fa-IR',{hour:'2-digit',minute:'2-digit'})};
  history.unshift(item);history = history.slice(0,12);
  safeSet('chemLabHistory',JSON.stringify(history));
  renderHistory();
  if(soundEnabled) playTone();
  showToast('شبیه‌سازی ترکیب انجام شد.');
}

/* ---------- نتیجه ---------- */
function renderResult(a,b,r,known){
  $('resultStatus').textContent = known ? 'شبیه‌سازی انجام شد' : 'داده ناکافی';
  $('resultStatus').classList.toggle('warning',!known);
  const equation = known && r.equation
    ? `<div class="result-block"><h5>معادله شیمیایی</h5><div class="equation"><bdi>${r.equation}</bdi></div></div>`
    : '';
  const tags = (r.tags||[]).map(t=>`<span class="observation-tag">${t}</span>`).join('');
  $('resultContent').innerHTML = `<div class="result-filled">
    <span class="reaction-badge ${known?'':'warn'}">${r.type}</span>
    <h4 class="result-title">${r.title}</h4>
    <div class="result-block"><h5>مواد انتخاب‌شده</h5><p>${a.name} <bdi dir="ltr">(${a.formula})</bdi> + ${b.name} <bdi dir="ltr">(${b.formula})</bdi></p></div>
    ${equation}
    <div class="result-block"><h5>مشاهده مورد انتظار</h5><p>${r.observation}</p></div>
    <div class="result-block"><h5>توضیحات علمی</h5><p>${r.explanation}</p></div>
    <div class="result-block"><h5>نشانه‌های شبیه‌سازی</h5><div class="observation-row">${tags}</div></div>
    <div class="result-block"><h5>نکته ایمنی</h5><p>${r.safety}</p></div>
  </div>`;
}

/* ---------- تاریخچه ---------- */
function renderHistory(){
  $('historyList').innerHTML = history.length
    ? history.map(h=>{
        const na = chem(h.a)?.name || h.a || 'نامشخص';
        const nb = chem(h.b)?.name || h.b || 'نامشخص';
        const title = h.title || 'آزمایش';
        const type = h.type || '';
        const time = h.time || '';
        return `<div class="history-item"><span class="history-symbol">⚗</span><div><strong>${na} + ${nb}</strong><small>${title}${type?' · '+type:''}</small></div><time>${time}</time></div>`;
      }).join('')
    : '<div class="history-empty">هنوز آزمایشی ثبت نشده است.</div>';
}

/* ---------- پاک‌سازی ---------- */
function clearTube(){
  const n = activeTube;
  tubeContents[n] = [];
  $(`liquid${n}`).style.height = '0';
  $(`precipitate${n}`).style.height = '0';
  $(`bubbles${n}`).innerHTML = '';
  $(`contents${n}`).textContent = 'خالی';
  selected = [];
  renderSelection();
  $('resultStatus').textContent = 'آماده';
  $('resultStatus').classList.remove('warning');
  $('resultContent').innerHTML = '<div class="result-empty"><div class="empty-illustration">⚗</div><h4>لوله پاک‌سازی شد</h4><p>مواد تازه انتخاب کن و آزمایش بعدی را آغاز کن.</p></div>';
  showToast(`لوله ${faNum(n)} پاک‌سازی شد.`);
}

function resetExperiment(){
  selected = [];
  tubeContents = {1:[],2:[]};
  [1,2].forEach(n=>{
    $(`liquid${n}`).style.height = '0';
    $(`precipitate${n}`).style.height = '0';
    $(`bubbles${n}`).innerHTML = '';
    $(`contents${n}`).textContent = 'خالی';
  });
  renderSelection();
  $('resultStatus').textContent = 'آماده';
  $('resultStatus').classList.remove('warning');
  $('resultContent').innerHTML = '<div class="result-empty"><div class="empty-illustration">⚗</div><h4>آماده کشف هستی؟</h4><p>دو ماده انتخاب کن تا مشاهده‌ها، معادله و توضیح علمی این ترکیب را ببینی.</p></div>';
  showToast('فضای آزمایش برای شروع دوباره آماده شد.');
}

/* ---------- تصادفی ---------- */
function randomExperiment(){
  const entries = Object.keys(reactions);
  if(!entries.length){showToast('واکنشی برای انتخاب تصادفی تعریف نشده است.');return}
  const pair = entries[Math.floor(Math.random()*entries.length)].split('|');
  selected = pair.slice();
  tubeContents[activeTube] = selected.slice();
  renderSelection();
  updateTubeLabel(activeTube);
  runReaction();
}

/* ---------- توست ---------- */
function showToast(message){
  const t = $('toast');
  t.textContent = message;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>t.classList.remove('show'),2600);
}

/* ---------- صدا ---------- */
function ensureAudioCtx(){
  if(!audioCtx){
    const AC = window.AudioContext || window.webkitAudioContext;
    if(!AC) return null;
    audioCtx = new AC();
  }
  return audioCtx;
}
function playTone(){
  const ctx = ensureAudioCtx();
  if(!ctx){showToast('پخش صدا در این مرورگر در دسترس نیست.');return}
  try{
    if(ctx.state==='suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(620,ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(380,ctx.currentTime+0.15);
    gain.gain.setValueAtTime(0.05,ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.2);
    osc.connect(gain);gain.connect(ctx.destination);
    osc.start();osc.stop(ctx.currentTime+0.21);
  }catch{showToast('پخش صدا در این مرورگر در دسترس نیست.')}
}

/* ---------- رویدادها: لوله‌ها ---------- */
[1,2].forEach(n=>{
  const tube = $(`tube${n}`);
  tube.addEventListener('click',()=>setActiveTube(n));
  tube.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setActiveTube(n)}});
  tube.addEventListener('dragover',e=>{e.preventDefault();tube.classList.add('drop-ready')});
  tube.addEventListener('dragleave',()=>tube.classList.remove('drop-ready'));
  tube.addEventListener('drop',e=>{
    e.preventDefault();tube.classList.remove('drop-ready');
    const id = e.dataTransfer.getData('text/plain');
    if(!id || !chem(id)) return;
    if(n!==activeTube) setActiveTube(n);
    if(!selected.includes(id)) toggleChemical(id);
    else showToast(`${chem(id).name} قبلاً انتخاب شده است.`);
  });
});

/* ---------- دکمه‌ها ---------- */
$('combineBtn').addEventListener('click',runReaction);
$('resetBtn').addEventListener('click',resetExperiment);
$('clearTubeBtn').addEventListener('click',clearTube);
$('randomBtn').addEventListener('click',randomExperiment);
$('clearHistoryBtn').addEventListener('click',()=>{history=[];safeRemove('chemLabHistory');renderHistory();showToast('تاریخچه پاک شد.')});

/* ---------- مودال راهنما ---------- */
function openHelp(){$('helpModal').hidden=false}
function closeHelp(){$('helpModal').hidden=true;$('helpBtn').focus()}
$('helpBtn').addEventListener('click',openHelp);
$('closeHelp').addEventListener('click',closeHelp);
$('startTutorial').addEventListener('click',()=>{$('helpModal').hidden=true;showToast('دو ماده از فهرست انتخاب کن تا شروع کنیم.')});
$('helpModal').addEventListener('click',e=>{if(e.target===$('helpModal'))closeHelp()});
document.addEventListener('keydown',e=>{if(e.key==='Escape' && !$('helpModal').hidden)closeHelp()});

/* ---------- صدا ---------- */
$('soundBtn').addEventListener('click',e=>{
  soundEnabled = !soundEnabled;
  e.currentTarget.setAttribute('aria-pressed',String(soundEnabled));
  e.currentTarget.textContent = `♪ صدای واکنش: ${soundEnabled?'روشن':'خاموش'}`;
  if(soundEnabled){ensureAudioCtx();showToast('صدای واکنش فعال شد.')}
  else showToast('صدای واکنش خاموش شد.');
});

/* ---------- شروع ---------- */
renderChemicals();
renderSelection();
renderHistory();
$('reactionCount').textContent = faNum(reactionCount);
setActiveTube(2);
updateTubeLabel(1);
updateTubeLabel(2);