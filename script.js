const gameData=[

{emoji:["🩸","🐴"],answer:"خرخون"},

{emoji:["🐝","🏠"],answer:"کندو"},

{emoji:["🌧️","☂️"],answer:"باران"},

{emoji:["🔥","❤️"],answer:"عشق"},

{emoji:["🌙","⭐"],answer:"آسمان"}

];

let coins=Number(localStorage.getItem("coins"))||270;

let unlocked=Number(localStorage.getItem("level"))||1;

let current=1;

const screens=document.querySelectorAll(".screen");

function show(id){

screens.forEach(s=>s.classList.remove("active"));

document.getElementById(id).classList.add("active");

}

document.getElementById("startBtn").onclick=()=>{

show("chapters");

};

document.querySelector(".unlocked").onclick=()=>{

buildLevels();

show("levels");

};

function buildLevels(){

const grid=document.getElementById("levelGrid");

grid.innerHTML="";

for(let i=1;i<=25;i++){

const div=document.createElement("div");

div.className="level";

div.textContent=i;

if(i<unlocked)div.classList.add("done");

else if(i===unlocked)div.classList.add("current");

else div.classList.add("lock");

if(i<=unlocked&&i<=gameData.length)

div.onclick=()=>openLevel(i);

grid.appendChild(div);

}

}

function openLevel(n){

current=n;

const q=gameData[n-1];

show("game");

document.getElementById("stageTitle").textContent="مرحله "+n;

document.getElementById("emojiBox").innerHTML=q.emoji.map(e=>`<span>${e}</span>`).join("");

buildAnswer(q.answer.length);

buildLetters(q.answer);

}

function buildAnswer(len){

const box=document.getElementById("answerBoxes");

box.innerHTML="";

for(let i=0;i<len;i++){

box.innerHTML+='<div class="answer"></div>';

}

}

function buildLetters(answer){

const letters=document.getElementById("letters");

letters.innerHTML="";

const chars=[...answer];

const extra="ابتثجچخدرزغونگ".split("");

while(chars.length<18){

chars.push(extra[Math.floor(Math.random()*extra.length)]);

}

chars.sort(()=>Math.random()-.5);

chars.forEach(c=>{

const b=document.createElement("div");

b.className="letter";

b.textContent=c;

b.onclick=()=>selectLetter(b);

letters.appendChild(b);

});

}

function selectLetter(el){

const empty=[...document.querySelectorAll(".answer")]

.find(a=>a.textContent==="");

if(!empty)return;

empty.textContent=el.textContent;

el.style.visibility="hidden";

check();

}

function check(){

const word=[...document.querySelectorAll(".answer")]

.map(a=>a.textContent)

.join("");

if(word===gameData[current-1].answer){

coins+=15;

localStorage.setItem("coins",coins);

document.getElementById("coinCount").textContent=coins;

document.getElementById("gameCoins").textContent=coins;

document.getElementById("correctAnswer").textContent=word;

document.getElementById("winPopup").classList.remove("hidden");

if(current===unlocked){

unlocked++;

localStorage.setItem("level",unlocked);

}

}

}

document.getElementById("nextLevel").onclick=()=>{

document.getElementById("winPopup").classList.add("hidden");

if(current<gameData.length)

openLevel(current+1);

else{

buildLevels();

show("levels");

}

};
