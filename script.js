const gameData = [
    { id: 1, emojis: ['🩸', '🐴'], answer: 'خرخون', letters: ['خ', 'ر', 'خ', 'و', 'ن'] },
    { id: 2, emojis: ['☀️', '🌻'], answer: 'آفتابگردان', letters: ['آ', 'ف', 'ت', 'ا', 'ب', 'گ', 'ر', 'د', 'ا', 'ن'] },
    { id: 3, emojis: ['🍎', '🌳'], answer: 'درخت سیب', letters: ['د', 'ر', 'خ', 'ت', 'س', 'ی', 'ب'] },
    { id: 4, emojis: ['💧', '💎'], answer: 'الماس', letters: ['ا', 'ل', 'م', 'ا', 'س'] },
    { id: 5, emojis: ['🔥', '🚒'], answer: 'آتش نشان', letters: ['آ', 'ت', 'ش', 'ن', 'ش', 'ا', 'ن'] }
];

let currentLevelIndex = 0;
let currentCoins = parseInt(localStorage.getItem('emojiGameCoins')) || 270;
let currentWord = [];
let currentGuess = [];
let unlockedLevels = parseInt(localStorage.getItem('emojiGameUnlocked')) || 1;

function updateCoinsUI() {
    document.getElementById('menu-coins').innerText = currentCoins;
    document.getElementById('game-coins').innerText = currentCoins;
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    
    if(screenId === 'levels-screen') {
        renderLevels();
    }
}

document.getElementById('btn-start').addEventListener('click', () => {
    showScreen('chapters-screen');
});

function renderChapters() {
    const chaptersGrid = document.getElementById('chapters-grid');
    let html = `
        <div class="chapter-card active" onclick="showScreen('levels-screen')">
            <h3>فصل 1</h3>
            <p>مرحله 1 تا 25</p>
        </div>
    `;
    for(let i = 2; i <= 8; i++) {
        html += `
            <div class="chapter-card locked">
                <h3>فصل ${i}</h3>
                <span class="lock-icon">🔒</span>
            </div>
        `;
    }
    chaptersGrid.innerHTML = html;
}

function renderLevels() {
    const levelsGrid = document.getElementById('levels-grid');
    levelsGrid.innerHTML = '';
    
    for (let i = 1; i <= 25; i++) {
        const levelDiv = document.createElement('div');
        levelDiv.className = 'level-card';
        
        if (i > unlockedLevels) {
            levelDiv.classList.add('locked');
            levelDiv.innerHTML = `<span>${i}</span><br><span style="font-size:0.8rem">🔒</span>`;
        } else {
            if (i < unlockedLevels) levelDiv.classList.add('completed');
            if (i === unlockedLevels) levelDiv.classList.add('active-level');
            
            levelDiv.innerHTML = `<span>${i}</span>`;
            levelDiv.onclick = () => startLevel(i - 1);
        }
        levelsGrid.appendChild(levelDiv);
    }
    
    const progress = ((unlockedLevels - 1) / 25) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('progress-text').innerText = `${unlockedLevels - 1} از 25 مرحله حل شده`;
}

function startLevel(index) {
    currentLevelIndex = index;
    const dataIndex = index % gameData.length;
    const levelData = gameData[dataIndex]; 
    
    document.getElementById('game-level').innerText = `مرحله ${index + 1}`;
    
    const emojiContainer = document.getElementById('emoji-question');
    emojiContainer.innerHTML = levelData.emojis.map(e => `<span>${e}</span>`).join('');
    
    currentWord = levelData.letters;
    currentGuess = new Array(currentWord.length).fill('');
    
    renderSlots();
    renderKeyboard();
    
    showScreen('game-screen');
}

function renderSlots() {
    const slotsContainer = document.getElementById('answer-slots');
    slotsContainer.innerHTML = '';
    currentGuess.forEach((letter, index) => {
        const slot = document.createElement('div');
        slot.className = 'slot';
        slot.innerText = letter;
        slot.onclick = () => removeLetter(index);
        slotsContainer.appendChild(slot);
    });
}

function renderKeyboard() {
    const keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = '';
    const keys = ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ش', 'س', 'ی', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ک', 'گ', 'ظ', 'ط', 'ز', 'ر', 'ذ', 'د', 'پ', 'و', 'چ', 'ژ', 'ج', 'آ'];
    
    keys.forEach(key => {
        const btn = document.createElement('button');
        btn.className = 'key';
        btn.innerText = key;
        btn.onclick = () => handleKeyPress(key, btn);
        keyboard.appendChild(btn);
    });
}

function handleKeyPress(letter, btnElement) {
    const emptyIndex = currentGuess.indexOf('');
    if (emptyIndex !== -1) {
        currentGuess[emptyIndex] = letter;
        renderSlots();
        btnElement.classList.add('used');
        
        if (!currentGuess.includes('')) {
            checkAnswer();
        }
    }
}

function removeLetter(index) {
    if (currentGuess[index] !== '') {
        const letter = currentGuess[index];
        currentGuess[index] = '';
        renderSlots();
        
        document.querySelectorAll('.key').forEach(k => {
            if(k.innerText === letter) k.classList.remove('used');
        });
    }
}

function checkAnswer() {
    const guessString = currentGuess.join('');
    const dataIndex = currentLevelIndex % gameData.length;
    const correctAnswer = gameData[dataIndex].answer;
    
    if (guessString === correctAnswer) {
        currentCoins += 15;
        if (currentLevelIndex + 1 === unlockedLevels) {
            unlockedLevels++;
        }
        localStorage.setItem('emojiGameCoins', currentCoins);
        localStorage.setItem('emojiGameUnlocked', unlockedLevels);
        updateCoinsUI();
        
        document.getElementById('correct-answer-text').innerText = correctAnswer;
        document.getElementById('win-modal').classList.add('active');
    } else {
        const board = document.querySelector('.emoji-board');
        board.classList.add('shake-anim');
        setTimeout(() => {
            board.classList.remove('shake-anim');
            currentGuess = new Array(currentWord.length).fill('');
            renderSlots();
            document.querySelectorAll('.key').forEach(k => k.classList.remove('used'));
        }, 400);
    }
}

function nextLevel() {
    document.getElementById('win-modal').classList.remove('active');
    startLevel(currentLevelIndex + 1);
}

function buyHint(type) {
    let cost = 0;
    if(type === 'remove') cost = 65;
    if(type === 'letter') cost = 45;
    if(type === 'reveal') cost = 130;
    
    if(currentCoins >= cost) {
        currentCoins -= cost;
        updateCoinsUI();
        localStorage.setItem('emojiGameCoins', currentCoins);
        
        if(type === 'reveal') {
            currentGuess = [...currentWord];
            renderSlots();
            checkAnswer();
        } else if (type === 'letter') {
            const emptyIndex = currentGuess.indexOf('');
            if(emptyIndex !== -1) {
                const correctLetter = currentWord[emptyIndex];
                currentGuess[emptyIndex] = correctLetter;
                renderSlots();
                document.querySelectorAll('.key').forEach(k => {
                    if(k.innerText === correctLetter) k.classList.add('used');
                });
                if (!currentGuess.includes('')) checkAnswer();
            }
        } else if (type === 'remove') {
            const keys = document.querySelectorAll('.key:not(.used)');
            let removed = 0;
            keys.forEach(k => {
                if(removed < 3 && !currentWord.includes(k.innerText)) {
                    k.classList.add('used');
                    removed++;
                }
            });
        }
    } else {
        alert('سکه کافی نداری!');
    }
}

renderChapters();
updateCoinsUI();
