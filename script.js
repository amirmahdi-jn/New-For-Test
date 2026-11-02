const $ = (id) => document.getElementById(id);
const chapters = [
  {name:"فصل اول: شروع ماجراجویی",icon:"🌟",levels:25,unlocked:true},
  {name:"فصل دوم: دنیای شگفت‌انگیز",icon:"🌈",levels:25,unlocked:false},
  {name:"فصل سوم: چالش بزرگ",icon:"🚀",levels:25,unlocked:false}
];
const questions = [
  {emoji:"🌙 ⭐",answer:"شب",letters:"شبروز"},
  {emoji:"❤️ 🔒",answer:"قلب",letters:"قلبمهر"},
  {emoji:"🐟 🌊",answer:"ماهی",letters:"ماهیدری"},
  {emoji:"☀️ 🌻",answer:"آفتاب",letters:"آفتابگل"},
  {emoji:"📚 🎓",answer:"دانش",letters:"دانشعلم"}
];
let coins = Number(localStorage.getItem("eq_coins") || 270);
let completed = Number(localStorage.getItem("eq_completed") || 0);
let currentChapter = 0, currentLevel = 1, questionIndex = 0, chosen = [], bank = [];
let settings = JSON.parse(localStorage.getItem("eq_settings") || '{"music":false,"sound":true,"musicVolume":35,"soundVolume":70}');
let audioCtx = null, musicTimer = null;

function fa(n){return String(n).replace(/\d/g,d=>"۰۱۲۳۴۵۶۷۸۹"[d]);}
function save(){localStorage.setItem("eq_coins",coins);localStorage.setItem("eq_completed",completed);}
function updateCoins(){
  $("coinCount").textContent=fa(coins);$("homeCoins").textContent=fa(coins);
  $("completedCount").textContent=fa(completed);save();
}
function showPage(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  $(id).classList.add("active");
}
function toast(msg){const t=$("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1900);}
function openModal(id){$(id).classList.add("show");$(id).setAttribute("aria-hidden","false");}
function closeModal(id){$(id).classList.remove("show");$(id).setAttribute("aria-hidden","true");}
function beep(freq=440,duration=.09,type="sine"){
  if(!settings.sound)return;
  try{audioCtx ||= new (window.AudioContext||window.webkitAudioContext)();const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type=type;o.frequency.value=freq;g.gain.value=(settings.soundVolume/100)*.07;o.connect(g);g.connect(audioCtx.destination);o.start();g.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+duration);o.stop(audioCtx.currentTime+duration);}catch(e){}
}
function playMusic(){
  stopMusic();if(!settings.music)return;
  const notes=[261.63,329.63,392,329.63,293.66,349.23,440,349.23];let i=0;
  musicTimer=setInterval(()=>{if(!settings.music)return;const old=settings.sound;settings.sound=true;const vol=settings.soundVolume;settings.soundVolume=settings.musicVolume;beep(notes[i++%notes.length],.22,"triangle");settings.sound=old;settings.soundVolume=vol;},520);
}
function stopMusic(){if(musicTimer)clearInterval(musicTimer);musicTimer=null;}
function activateAudio(){try{audioCtx ||= new (window.AudioContext||window.webkitAudioContext)();if(audioCtx.state==="suspended")audioCtx.resume();if(settings.music)playMusic();}catch(e){}}
document.addEventListener("pointerdown",activateAudio,{once:true});
function renderChapters(){
  $("chapterList").innerHTML=chapters.map((c,i)=>`<button class="chapter-card" data-chapter="${i}"><span class="chapter-art">${c.icon}</span><div><b>${c.name}</b><small>${c.unlocked?"۲۵ مرحله برای بازی":"با تکمیل فصل قبل باز می‌شود"}</small></div><span class="lock">${c.unlocked?"›":"🔒"}</span></button>`).join("");
}
function renderLevels(){
  $("levelsTitle").textContent=chapters[currentChapter].name;
  $("levelGrid").innerHTML=Array.from({length:25},(_,i)=>{let n=i+1,done=n<=completed+1,locked=n>completed+1;return `<button class="level-tile ${done?"done":""} ${locked?"locked":""}" data-level="${n}">${locked?"🔒":fa(n)}</button>`}).join("");
}
function startLevel(level){
  currentLevel=level;questionIndex=(level-1)%questions.length;chosen=[];showPage("gamePage");renderQuestion();beep(520,.1);
}
function renderQuestion(){
  const q=questions[questionIndex];bank=[...q.letters].sort(()=>Math.random()-.5).map((char,i)=>({char,id:i}));
  chosen=[];$("chapterLabel").textContent=chapters[currentChapter].name;$("levelLabel").textContent="مرحله "+fa(currentLevel);
  $("emojiQuestion").textContent=q.emoji;$("progressText").textContent=fa(questionIndex+1)+"/"+fa(questions.length);
  $("progressBar").style.width=((questionIndex+1)/questions.length*100)+"%";
  $("answerSlots").innerHTML=Array.from({length:[...q.answer].length},(_,i)=>`<button class="answer-slot" data-slot="${i}"></button>`).join("");
  renderLetters();
}
function renderLetters(){
  $("letterBank").innerHTML=bank.map(item=>`<button class="letter-key ${chosen.includes(item.id)?"used":""}" data-letter="${item.id}">${item.char}</button>`).join("");
  [...$("answerSlots").children].forEach((el,i)=>{el.textContent=chosen[i]===undefined?"":bank.find(x=>x.id===chosen[i]).char;el.classList.toggle("filled",chosen[i]!==undefined);});
}
function checkAnswer(){
  const q=questions[questionIndex],answer=chosen.map(id=>bank.find(x=>x.id===id).char).join("");
  if(answer===q.answer){beep(740,.15,"triangle");if(questionIndex===questions.length-1){coins+=15;completed=Math.max(completed,currentLevel);updateCoins();celebrate();}else{questionIndex++;renderQuestion();toast("آفرین! پاسخ درسته");}}
  else{beep(180,.18,"sawtooth");toast("جواب درست نیست، دوباره تلاش کن");}
}
function celebrate(){
  openModal("winModal");beep(660,.12);setTimeout(()=>beep(880,.18),120);
  const layer=$("confettiLayer");layer.innerHTML="";
  const colors=["#ffdf5d","#f472b6","#a78bfa","#4ade80","#38bdf8","#fb923c"];
  for(let i=0;i<45;i++){let p=document.createElement("i");p.className="confetti";p.style.left=Math.random()*100+"%";p.style.background=colors[i%colors.length];p.style.animationDelay=Math.random()*.7+"s";p.style.transform=`rotate(${Math.random()*180}deg)`;layer.appendChild(p);}
}
function spend(cost){if(coins<cost){toast("سکه کافی نداری!");return false;}coins-=cost;updateCoins();beep(330,.08);return true;}
function hint(type){
  const q=questions[questionIndex];
  if(type==="first"){
    if(!spend(45))return;
    const target=[...q.answer];let idx=chosen.length;
    if(idx<target.length){let found=bank.find(x=>x.char===target[idx]&&!chosen.includes(x.id));if(found)chosen.push(found.id);renderLetters();if(chosen.length===target.length)checkAnswer();}
  }else if(type==="remove"){
    if(!spend(65))return;
    const answerChars=[...q.answer],keep=new Set();
    answerChars.forEach(ch=>{let found=bank.find(x=>x.char===ch&&!keep.has(x.id));if(found)keep.add(found.id);});
    bank=bank.filter(x=>keep.has(x.id)||chosen.includes(x.id));renderLetters();toast("حروف اضافه حذف شدند");
  }else if(type==="solve"){
    if(!spend(130))return;
    chosen=[];[...q.answer].forEach(ch=>{let found=bank.find(x=>x.char===ch&&!chosen.includes(x.id));if(found)chosen.push(found.id);});
    renderLetters();checkAnswer();
  }
}
$("playBtn").onclick=()=>{showPage("chaptersPage");beep(500)};
$("chaptersBtn").onclick=()=>showPage("chaptersPage");
$("shopBtn").onclick=()=>showPage("shopPage");
$("settingsBtn").onclick=()=>openModal("settingsModal");
document.querySelectorAll("[data-back]").forEach(b=>b.onclick=()=>showPage(b.dataset.back));
document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>closeModal(b.dataset.close));
$("chapterList").addEventListener("click",e=>{let b=e.target.closest("[data-chapter]");if(!b)return;let i=Number(b.dataset.chapter);if(!chapters[i].unlocked){toast("این فصل هنوز باز نشده");beep(150,.15,"square");return;}currentChapter=i;renderLevels();showPage("levelsPage");beep(570);});
$("levelGrid").addEventListener("click",e=>{let b=e.target.closest("[data-level]");if(!b)return;let n=Number(b.dataset.level);if(n>completed+1){toast("ابتدا مرحله‌های قبلی را کامل کن");return;}startLevel(n);});
$("letterBank").addEventListener("click",e=>{let b=e.target.closest("[data-letter]");if(!b||chosen.includes(Number(b.dataset.letter)))return;chosen.push(Number(b.dataset.letter));renderLetters();if(chosen.length===[...questions[questionIndex].answer].length)checkAnswer();});
$("answerSlots").addEventListener("click",e=>{let b=e.target.closest("[data-slot]");if(!b)return;chosen.pop();renderLetters();});
document.querySelectorAll("[data-hint]").forEach(b=>b.onclick=()=>hint(b.dataset.hint));
$("clearAnswer").onclick=()=>{chosen=[];renderLetters();};
$("nextBtn").onclick=()=>{closeModal("winModal");if(currentLevel%25===0&&currentChapter<chapters.length-1){chapters[currentChapter+1].unlocked=true;toast("فصل بعدی باز شد!");beep(900,.25);}renderLevels();showPage("levelsPage");};
function syncSettings(){
  $("musicToggle").checked=settings.music;$("soundToggle").checked=settings.sound;
  $("musicVolume").value=settings.musicVolume;$("soundVolume").value=settings.soundVolume;
}
function saveSettings(){localStorage.setItem("eq_settings",JSON.stringify(settings));if(settings.music)playMusic();else stopMusic();}
$("musicToggle").onchange=e=>{settings.music=e.target.checked;saveSettings();};
$("soundToggle").onchange=e=>{settings.sound=e.target.checked;saveSettings();};
$("musicVolume").oninput=e=>{settings.musicVolume=Number(e.target.value);saveSettings();};
$("soundVolume").oninput=e=>{settings.soundVolume=Number(e.target.value);saveSettings();};
syncSettings();renderChapters();updateCoins();
setTimeout(()=>$("splash").classList.add("hide"),1700);
