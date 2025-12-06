// Boot → Show homescreen (instead of going directly to desktop)
setTimeout(() => {
    // Show homescreen after boot animation completes
    if (typeof showHomescreen === 'function') {
        showHomescreen();
    }
}, 3000);

// Window controls
function openWindow(id) {
    const win = document.getElementById(id);
    win.classList.remove("hidden");
    makeDraggable(win);
    win.style.zIndex = Date.now();
}

function closeWindow(id) {
    document.getElementById(id).classList.add("hidden");
}

// Dragging system
function makeDraggable(win) {
    const bar = win.querySelector(".titlebar");
    let offsetX = 0, offsetY = 0, isDown = false;

    bar.addEventListener("mousedown", (e) => {
        isDown = true;
        offsetX = e.clientX - win.offsetLeft;
        offsetY = e.clientY - win.offsetTop;
        win.style.zIndex = Date.now();
    });

    document.addEventListener("mouseup", () => isDown = false);

    document.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        win.style.left = `${e.clientX - offsetX}px`;
        win.style.top = `${e.clientY - offsetY}px`;
    });
}

// ============================================
// Digital Clock Widget
// ============================================
function updateDigitalClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const clockDisplay = document.getElementById('digital-clock-display');
    const secondsDisplay = document.getElementById('clock-seconds');
    const dateDisplay = document.getElementById('clock-date-display');
    
    if (clockDisplay) {
        clockDisplay.textContent = `${hours}:${minutes}`;
    }
    if (secondsDisplay) {
        secondsDisplay.textContent = `:${seconds}`;
    }
    if (dateDisplay) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateDisplay.textContent = now.toLocaleDateString('en-US', options);
    }
}

// Start clock
setInterval(updateDigitalClock, 1000);
updateDigitalClock();

// ============================================
// Vault Escape Room System
// ============================================
const VAULT_CODE = "1337"; // Leet speak for cherry lovers
let currentCode = "";
let vaultUnlocked = false;
let currentLevel = 1;
let hintsRemaining = 3;
let solvedPuzzles = [];
let currentPuzzleId = null;

// Puzzle definitions for escape room
const puzzles = {
    level1: [
        {
            id: 'mirror',
            icon: '🪞',
            name: 'Magic Mirror',
            title: 'The Reversed Message',
            description: 'The mirror shows everything backwards. What word does this spell?\n\n✨ YRREHC ✨',
            answer: 'cherry',
            hint: 'Read it from right to left...'
        },
        {
            id: 'math',
            icon: '🔢',
            name: 'Number Lock',
            title: 'Cherry Math',
            description: '🍒 + 🍒 + 🍒 = 15\n🍒 × 2 = ?\n\nWhat is the answer?',
            answer: '10',
            hint: 'Each cherry equals 5...'
        },
        {
            id: 'riddle',
            icon: '❓',
            name: 'Riddle Box',
            title: 'The Cherry Riddle',
            description: 'I am red and sweet,\nGrow on a tree so neat,\nWith a stem on my head,\nAnd a pit to be fed.\n\nWhat am I?',
            answer: 'cherry',
            hint: 'Look at the emoji in the OS name...'
        }
    ],
    level2: [
        {
            id: 'morse',
            icon: '📡',
            name: 'Morse Signal',
            title: 'Decode the Transmission',
            description: '🔴 🔴 🔴 ⚫ ⚫ 🔴 ⚫ ⚫ 🔴\n\nRed = Dot (.), Black = Dash (-)\nThis spells a single letter. What is it?',
            answer: 's',
            hint: 'SOS starts with this letter... (...)'
        },
        {
            id: 'sequence',
            icon: '🎵',
            name: 'Music Box',
            title: 'Complete the Pattern',
            description: 'Listen to the melody pattern:\n\n🍒 🌸 🍒 🌸 🍒 🌸 ?\n\nWhat comes next? (cherry or blossom)',
            answer: 'cherry',
            hint: 'The pattern alternates...'
        },
        {
            id: 'cipher',
            icon: '🔐',
            name: 'Cipher Lock',
            title: 'Caesar Says',
            description: 'Each letter shifted by 1:\n\nCHERRY → ?\n(A becomes B, B becomes C, etc.)',
            answer: 'difssz',
            hint: 'C+1=D, H+1=I, E+1=F...'
        }
    ],
    level3: [
        {
            id: 'color',
            icon: '🎨',
            name: 'Color Mixer',
            title: 'Mix the Colors',
            description: 'What color do you get when you mix:\n\n🔴 RED + ⚪ WHITE = ?\n\n(Type the color name)',
            answer: 'pink',
            hint: 'Think about the CherryOS theme color...'
        },
        {
            id: 'emoji',
            icon: '🧩',
            name: 'Emoji Puzzle',
            title: 'Decode the Message',
            description: '🔒 + 🔑 = ?\n\nWhat action results from combining these?',
            answer: 'unlock',
            hint: 'What do you do with a key and a lock?'
        },
        {
            id: 'final',
            icon: '🏆',
            name: 'Final Challenge',
            title: 'The Ultimate Test',
            description: 'Complete this CherryOS motto:\n\n"Pretty but ___"\n\n(Check the homescreen tagline)',
            answer: 'dangerous',
            hint: 'Look at the system tagline on the lock screen...'
        }
    ]
};

// Vault keypad functions
function vaultKeyPress(num) {
    if (currentCode.length < 4) {
        currentCode += num;
        updateCodeDisplay();
    }
}

function vaultClear() {
    currentCode = "";
    updateCodeDisplay();
    document.getElementById('vault-error').textContent = '';
}

function updateCodeDisplay() {
    const digits = document.querySelectorAll('.code-digit');
    digits.forEach((digit, index) => {
        if (index < currentCode.length) {
            digit.textContent = '●';
            digit.classList.add('filled');
        } else {
            digit.textContent = '';
            digit.classList.remove('filled');
        }
    });
}

function vaultSubmit() {
    if (currentCode === VAULT_CODE) {
        vaultUnlocked = true;
        document.getElementById('vault-lock').style.display = 'none';
        document.getElementById('vault-interior').classList.add('active');
        loadVaultLevel(1);
    } else {
        document.getElementById('vault-error').textContent = '❌ Incorrect code. Try again!';
        currentCode = "";
        updateCodeDisplay();
        
        // Shake animation
        const lockScreen = document.getElementById('vault-lock');
        lockScreen.style.animation = 'shake 0.5s ease';
        setTimeout(() => lockScreen.style.animation = '', 500);
    }
}

// Load vault level puzzles
function loadVaultLevel(level) {
    currentLevel = level;
    document.getElementById('vault-level').textContent = level;
    
    const room = document.getElementById('vault-room');
    room.innerHTML = '';
    
    const levelKey = `level${level}`;
    const levelPuzzles = puzzles[levelKey] || [];
    
    levelPuzzles.forEach(puzzle => {
        const item = document.createElement('div');
        item.className = 'vault-item';
        if (solvedPuzzles.includes(puzzle.id)) {
            item.classList.add('solved');
        }
        item.innerHTML = `
            <div class="vault-item-icon">${puzzle.icon}</div>
            <div class="vault-item-name">${puzzle.name}</div>
        `;
        item.onclick = () => openPuzzle(puzzle);
        room.appendChild(item);
    });
    
    // Check if all puzzles in level are solved
    const allSolved = levelPuzzles.every(p => solvedPuzzles.includes(p.id));
    if (allSolved && level < 3) {
        // Add next level button
        const nextBtn = document.createElement('div');
        nextBtn.className = 'vault-item';
        nextBtn.style.background = 'linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(76, 175, 80, 0.1))';
        nextBtn.style.borderColor = '#4caf50';
        nextBtn.innerHTML = `
            <div class="vault-item-icon">🚪</div>
            <div class="vault-item-name">Next Level →</div>
        `;
        nextBtn.onclick = () => loadVaultLevel(level + 1);
        room.appendChild(nextBtn);
    } else if (allSolved && level === 3) {
        // Show victory
        document.getElementById('vault-room').style.display = 'none';
        document.getElementById('victory-screen').classList.add('active');
    }
}

function openPuzzle(puzzle) {
    if (solvedPuzzles.includes(puzzle.id)) return;
    
    currentPuzzleId = puzzle.id;
    document.getElementById('puzzle-title').textContent = puzzle.title;
    document.getElementById('puzzle-description').textContent = puzzle.description;
    document.getElementById('puzzle-input').value = '';
    document.getElementById('puzzle-feedback').textContent = '';
    document.getElementById('puzzle-feedback').className = 'puzzle-feedback';
    document.getElementById('puzzle-modal').classList.add('active');
    
    // Store current puzzle answer for checking
    document.getElementById('puzzle-modal').dataset.answer = puzzle.answer;
    document.getElementById('puzzle-modal').dataset.hint = puzzle.hint;
}

function closePuzzle() {
    document.getElementById('puzzle-modal').classList.remove('active');
    currentPuzzleId = null;
}

function submitPuzzle() {
    const input = document.getElementById('puzzle-input').value.toLowerCase().trim();
    const answer = document.getElementById('puzzle-modal').dataset.answer;
    const feedback = document.getElementById('puzzle-feedback');
    
    if (input === answer) {
        feedback.textContent = '✅ Correct! Well done!';
        feedback.className = 'puzzle-feedback success';
        solvedPuzzles.push(currentPuzzleId);
        
        setTimeout(() => {
            closePuzzle();
            loadVaultLevel(currentLevel);
        }, 1500);
    } else {
        feedback.textContent = '❌ Not quite right. Try again!';
        feedback.className = 'puzzle-feedback error';
    }
}

function showHint() {
    if (hintsRemaining <= 0) {
        alert('No hints remaining!');
        return;
    }
    
    const modal = document.getElementById('puzzle-modal');
    if (modal.classList.contains('active')) {
        const hint = modal.dataset.hint;
        document.getElementById('puzzle-feedback').textContent = '💡 ' + hint;
        document.getElementById('puzzle-feedback').className = 'puzzle-feedback';
        hintsRemaining--;
        document.getElementById('hints-left').textContent = hintsRemaining;
    } else {
        alert('Open a puzzle first to use a hint!');
    }
}

function resetVault() {
    currentLevel = 1;
    hintsRemaining = 3;
    solvedPuzzles = [];
    currentPuzzleId = null;
    
    document.getElementById('hints-left').textContent = '3';
    document.getElementById('victory-screen').classList.remove('active');
    document.getElementById('vault-room').style.display = 'grid';
    loadVaultLevel(1);
}

// Add keyboard support for puzzle input
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('puzzle-modal');
    if (modal && modal.classList.contains('active') && e.key === 'Enter') {
        submitPuzzle();
    }
});

// Add shake animation for wrong code
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-10px); }
        40%, 80% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);
