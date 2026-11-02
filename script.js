// دیتابیس مراحل (ایموجی ها و جواب ها)
const gameData = [
    {
        id: 1,
        emojis: ['🩸', '🐴'],
        answer: 'خرخون',
        letters: ['خ', 'ر', 'خ', 'و', 'ن']
    }
    // میتونی مراحل بیشتری اینجا اضافه کنی
];

// متغیرهای وضعیت بازی
let currentLevelIndex = 0;
let currentCoins = parseInt(localStorage.getItem('emojiGameCoins')) || 270;
let currentWord = [];
let currentGuess = [];
let unlockedLevels = parseInt(localStorage.getItem('emojiGameUnlocked')) || 1;

// آپدیت نمایش سکه ها
function updateCoinsUI() {
    document.getElementById('menu-coins').innerText = currentCoins;
    document.getElementById('game-coins').innerText = currentCoins;
}

// تغییر صفحه
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    
    if(screenId === 'levels-screen') {
        renderLevels();
    }
}

// شروع بازی (رفتن به صفحه فصل ها)
document.getElementById('btn-start').addEventListener('click', () => {
    showScreen('chapters-screen');
});

// ساخت فصل ها
function renderChapters() {
    const chaptersGrid = document.getElementById('chapters-grid');
    chaptersGrid.innerHTML = `
        <div class="chapter-card active-chapter" onclick="showScreen('levels-screen')">
            <h3>فصل 1</h3>
            <p>مرحله 1 تا ${gameData.length}</p>
        </div>
        <div class="chapter-card locked">
            <h3>فصل 2</h3>
            <span>🔒</span>
        </div>
    `;
}

// ساخت مراحل
function renderLevels() {
    const levelsGrid = document.getElementById('levels-grid');
    levelsGrid.innerHTML = '';
    
    // فرض میکنیم 25 مرحله داریم، اما فقط 1 دیتا داریم برای دمو
    for (let i = 1; i <= 25; i++) {
        const levelDiv = document.createElement('div');
        levelDiv.className = 'level-card';
        
        if (i > unlockedLevels) {
            levelDiv.classList.add('locked');
            levelDiv.innerHTML = `<span>${i}</span><br>🔒`;
        } else {
            if (i < unlockedLevels) levelDiv.classList.add('completed');
            if (i === unlockedLevels) levelDiv.classList.add('active-level');
            
            levelDiv.innerHTML = `<span>${i}</span>`;
            levelDiv.onclick = () => startLevel(i - 1);
        }
        levelsGrid.appendChild(levelDiv);
    }
    
    // آپدیت نوار پیشرفت
    const progress = ((unlockedLevels - 1) / 25) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('progress-text').innerText = `پیشرفت کل: ${unlockedLevels - 1} از 25`;
}

// شروع یک مرحله خاص
function startLevel(index) {
    // چون فقط یک مرحله دیتا داریم، برای دمو همیشه همون رو لود میکنیم
    const levelData = gameData[0]; 
    
    document.getElementById('game-level').innerText = `مرحله ${index + 1}`;
    
    // نمایش ایموجی ها
    const emojiContainer = document.getElementById('emoji-question');
    emojiContainer.innerHTML = levelData.emojis.map(e => `<span>${e}</span>`).join('');
    
    // تنظیم کلمه
    currentWord = levelData.letters;
    currentGuess = new Array(currentWord.length).fill('');
    
    // ساخت جای خالی ها
    renderSlots();
    
    // ساخت کیبورد
    renderKeyboard();
    
    showScreen('game-screen');
}

// ساخت جای خالی کلمات
function renderSlots() {
    const slotsContainer = document.getElementById('answer-slots');
    slotsContainer.innerHTML = '';
    currentGuess.forEach((letter, index) => {
        const slot = document.createElement('div');
        slot.className = 'slot';
        slot.innerText = letter;
        slot.onclick = () => removeLetter(index); // اجازه حذف با کلیک
        slotsContainer.appendChild(slot);
    });
}

// ساخت کیبورد فارسی
function renderKeyboard() {
    const keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = '';
    const keys = ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ش', 'س', 'ی', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ک', 'گ', 'ظ', 'ط', 'ز', 'ر', 'ذ', 'د', 'پ', 'و', 'چ', 'ژ', 'ج'];
    
    keys.forEach(key => {
        const btn = document.createElement('button');
        btn.className = 'key';
        btn.innerText = key;
        btn.onclick = () => handleKeyPress(key, btn);
        keyboard.appendChild(btn);
    });
}

// تایپ کردن حرف
function handleKeyPress(letter, btnElement) {
    const emptyIndex = currentGuess.indexOf('');
    if (emptyIndex !== -1) {
        currentGuess[emptyIndex] = letter;
        renderSlots();
        btnElement.classList.add('used');
        
        // اگر همه حروف پر شد، بررسی کن
        if (!currentGuess.includes('')) {
            checkAnswer();
        }
    }
}

// حذف حرف
function removeLetter(index) {
    if (currentGuess[index] !== '') {
        const letter = currentGuess[index];
        currentGuess[index] = '';
        renderSlots();
        
        // دکمه کیبورد رو دوباره فعال کن
        document.querySelectorAll('.key').forEach(k => {
            if(k.innerText === letter) k.classList.remove('used');
        });
    }
}

// بررسی جواب
function checkAnswer() {
    const guessString = currentGuess.join('');
    const correctAnswer = gameData[0].answer;
    
    if (guessString === correctAnswer) {
        // برنده شد
        currentCoins += 15;
        unlockedLevels = Math.max(unlockedLevels, currentLevelIndex + 2);
        localStorage.setItem('emojiGameCoins', currentCoins);
        localStorage.setItem('emojiGameUnlocked', unlockedLevels);
        updateCoinsUI();
        
        document.getElementById('correct-answer-text').innerText = correctAnswer;
        document.getElementById('win-modal').classList.add('active');
    } else {
        // اشتباه (لرزش)
        const board = document.querySelector('.game-board');
        board.style.animation = 'shake 0.4s';
        setTimeout(() => {
            board.style.animation = '';
            currentGuess = new Array(currentWord.length).fill('');
            renderSlots();
            document.querySelectorAll('.key').forEach(k => k.classList.remove('used'));
        }, 400);
    }
}

// بستن مودال و رفتن به مرحله بعد
function nextLevel() {
    document.getElementById('win-modal').classList.remove('active');
    currentLevelIndex++;
    // در این دموی ساده، برمیگردیم به صفحه مراحل
    showScreen('levels-screen');
}

// خرید راهنما
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
            // نمایش کل جواب
            currentGuess = [...currentWord];
            renderSlots();
            checkAnswer();
        } else if (type === 'letter') {
            // پیدا کردن اولین حرف خالی و گذاشتن حرف درست
            const emptyIndex = currentGuess.indexOf('');
            if(emptyIndex !== -1) {
                const correctLetter = currentWord[emptyIndex];
                currentGuess[emptyIndex] = correctLetter;
                renderSlots();
                // غیرفعال کردن دکمه کیبورد
                document.querySelectorAll('.key').forEach(k => {
                    if(k.innerText === correctLetter) k.classList.add('used');
                });
                if (!currentGuess.includes('')) checkAnswer();
            }
        } else if (type === 'remove') {
            // حذف ۳ حرف اضافی از کیبورد (ساده شده)
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

// انیمیشن لرزش (اضافه کردن به CSS به صورت داینامیک)
const styleSheet = document.createElement("style");
styleSheet.innerText = `@keyframes shake { 0% { transform: translateX(0); } 25% { transform: translateX(-10px); } 50% { transform: translateX(10px); } 75% { transform: translateX(-10px); } 100% { transform: translateX(0); } }`;
document.head.appendChild(styleSheet);

// راه اندازی اولیه
renderChapters();
updateCoinsUI();
