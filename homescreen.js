// Homescreen functionality - Feminine Hacker Edition

// Helper function to format time values with leading zeros
function formatTimeValue(value) {
    return value.toString().padStart(2, '0');
}

// Matrix rain effect with pink hearts and characters
function initMatrixRain() {
    const canvas = document.getElementById('matrix-rain');
    if (!canvas) return;
    
    const canvasContext = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrixCharacters = '♥01アイウエオカキクケコ10♥HACK3R♥';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const columnDropPositions = [];
    
    for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
        columnDropPositions[columnIndex] = Math.random() * -100;
    }
    
    function draw() {
        canvasContext.fillStyle = 'rgba(26, 10, 20, 0.05)';
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);
        
        canvasContext.fillStyle = '#ff69b4';
        canvasContext.font = fontSize + 'px monospace';
        
        for (let columnIndex = 0; columnIndex < columnDropPositions.length; columnIndex++) {
            const character = matrixCharacters[Math.floor(Math.random() * matrixCharacters.length)];
            canvasContext.fillText(character, columnIndex * fontSize, columnDropPositions[columnIndex] * fontSize);
            
            if (columnDropPositions[columnIndex] * fontSize > canvas.height && Math.random() > 0.975) {
                columnDropPositions[columnIndex] = 0;
            }
            columnDropPositions[columnIndex]++;
        }
    }
    
    setInterval(draw, 50);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Create floating heart particles
function createParticles() {
    const homescreen = document.getElementById('homescreen');
    if (!homescreen) return;
    
    const particleCount = 12;
    const heartSymbols = ['♥', '♡', '❤', '💗'];
    
    for (let particleIndex = 0; particleIndex < particleCount; particleIndex++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (6 + Math.random() * 6) + 's';
        particle.style.fontSize = (10 + Math.random() * 15) + 'px';
        homescreen.appendChild(particle);
    }
}

// Update time display (24-hour hacker format)
function updateTime() {
    const currentDateTime = new Date();
    const hours = formatTimeValue(currentDateTime.getHours());
    const minutes = formatTimeValue(currentDateTime.getMinutes());
    const seconds = formatTimeValue(currentDateTime.getSeconds());
    
    const timeElement = document.querySelector('.hacker-time .time-display');
    if (timeElement) {
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
    
    // Update date
    const dateFormatOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const dateElement = document.querySelector('.hacker-time .date-display');
    if (dateElement) {
        dateElement.textContent = currentDateTime.toLocaleDateString('en-US', dateFormatOptions).toUpperCase();
    }
}

// Update uptime counter
let uptimeSeconds = 0;
function updateUptime() {
    uptimeSeconds++;
    const hours = formatTimeValue(Math.floor(uptimeSeconds / 3600));
    const minutes = formatTimeValue(Math.floor((uptimeSeconds % 3600) / 60));
    const seconds = formatTimeValue(uptimeSeconds % 60);
    
    const uptimeElement = document.getElementById('uptime-counter');
    if (uptimeElement) {
        uptimeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

// Simulate packet counter
let packetCount = 0;
function updatePackets() {
    packetCount += Math.floor(Math.random() * 5);
    const packetElement = document.getElementById('packet-count');
    if (packetElement) {
        packetElement.textContent = packetCount;
    }
}

// Simulate resource usage
function updateResources() {
    const cpuUsagePercent = 15 + Math.floor(Math.random() * 25);
    const memoryUsagePercent = 40 + Math.floor(Math.random() * 20);
    const networkUsagePercent = 5 + Math.floor(Math.random() * 20);
    
    document.getElementById('cpu-val').textContent = cpuUsagePercent + '%';
    document.getElementById('mem-val').textContent = memoryUsagePercent + '%';
    document.getElementById('net-val').textContent = networkUsagePercent + '%';
    
    document.querySelector('.cpu-bar').style.width = cpuUsagePercent + '%';
    document.querySelector('.mem-bar').style.width = memoryUsagePercent + '%';
    document.querySelector('.net-bar').style.width = networkUsagePercent + '%';
}

// Add exploit log messages
const exploitMessages = [
    '[♥] Scanning for vulnerabilities...',
    '[+] Port 22 open - SSH detected',
    '[+] Port 80 open - HTTP server',
    '[!] Found potential exploit',
    '[♥] Running nmap -sV target',
    '[+] Gathering system info...',
    '[!] Weak password detected',
    '[♥] Launching payload...',
    '[+] Access granted! ♥',
    '[!] Extracting data...',
];

function addExploitLog() {
    const logContent = document.getElementById('exploit-log');
    if (!logContent) return;
    
    const randomMessage = exploitMessages[Math.floor(Math.random() * exploitMessages.length)];
    const logLine = document.createElement('div');
    logLine.className = 'log-line';
    logLine.textContent = randomMessage;
    
    // Color based on prefix
    if (randomMessage.includes('[♥]')) logLine.style.color = '#ff69b4';
    else if (randomMessage.includes('[+]')) logLine.style.color = '#90ee90';
    else if (randomMessage.includes('[!]')) logLine.style.color = '#ffd700';
    
    logContent.appendChild(logLine);
    logContent.scrollTop = logContent.scrollHeight;
    
    // Keep only last 6 lines
    while (logContent.children.length > 6) {
        logContent.removeChild(logContent.firstChild);
    }
}

// Initialize homescreen
function initHomescreen() {
    initMatrixRain();
    createParticles();
    updateTime();
    
    // Update time every second
    setInterval(updateTime, 1000);
    setInterval(updateUptime, 1000);
    setInterval(updatePackets, 2000);
    setInterval(updateResources, 3000);
    setInterval(addExploitLog, 4000);
}

// Transition to desktop
function unlockToDesktop() {
    const homescreen = document.getElementById('homescreen');
    const desktop = document.getElementById('desktop');
    
    if (homescreen && desktop) {
        homescreen.classList.add('fade-out');
        
        setTimeout(() => {
            homescreen.style.display = 'none';
            desktop.classList.remove('hidden');
        }, 800);
    }
}

// Handle click/tap to unlock
function setupUnlock() {
    const homescreen = document.getElementById('homescreen');
    if (!homescreen) return;
    
    // Click anywhere to unlock
    homescreen.addEventListener('click', (event) => {
        if (!event.target.closest('.terminal-panel')) {
            unlockToDesktop();
        }
    });
    
    // Keyboard unlock
    document.addEventListener('keydown', (event) => {
        if (homescreen.classList.contains('visible') && !homescreen.classList.contains('fade-out')) {
            if (event.key === 'Enter' || event.key === ' ') {
                unlockToDesktop();
            }
        }
    });
}

// Panel click handlers
function setupWidgets() {
    const terminalPanels = document.querySelectorAll('.terminal-panel');
    terminalPanels.forEach(panel => {
        panel.addEventListener('click', (event) => {
            event.stopPropagation();
            
            const panelAction = panel.dataset.action;
            if (panelAction) {
                unlockToDesktop();
                setTimeout(() => {
                    if (typeof openWindow === 'function') {
                        openWindow(panelAction);
                    }
                }, 900);
            }
        });
    });
}

// Show homescreen after boot
function showHomescreen() {
    const homescreen = document.getElementById('homescreen');
    if (homescreen) {
        homescreen.classList.add('visible');
        initHomescreen();
        setupUnlock();
        setupWidgets();
    }
}

// Export for use in os.js
window.showHomescreen = showHomescreen;
window.unlockToDesktop = unlockToDesktop;
