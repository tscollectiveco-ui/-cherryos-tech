// Homescreen functionality - Feminine Hacker Edition

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
    const dropPositions = [];
    
    for (let i = 0; i < columns; i++) {
        dropPositions[i] = Math.random() * -100;
    }
    
    function draw() {
        canvasContext.fillStyle = 'rgba(26, 10, 20, 0.05)';
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);
        
        canvasContext.fillStyle = '#ff69b4';
        canvasContext.font = fontSize + 'px monospace';
        
        for (let i = 0; i < dropPositions.length; i++) {
            const text = matrixCharacters[Math.floor(Math.random() * matrixCharacters.length)];
            canvasContext.fillText(text, i * fontSize, dropPositions[i] * fontSize);
            
            if (dropPositions[i] * fontSize > canvas.height && Math.random() > 0.975) {
                dropPositions[i] = 0;
            }
            dropPositions[i]++;
        }
    }
    
    setInterval(draw, 50);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Create floating heart particles
function createHeartParticles() {
    const homescreen = document.getElementById('homescreen');
    if (!homescreen) return;
    
    const particleCount = 12;
    const heartSymbols = ['♥', '♡', '❤', '💗'];
    
    for (let i = 0; i < particleCount; i++) {
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
function updateTimeDisplay() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    const timeElement = document.querySelector('.hacker-time .time-display');
    if (timeElement) {
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
    
    // Update date
    const dateFormatOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const dateElement = document.querySelector('.hacker-time .date-display');
    if (dateElement) {
        dateElement.textContent = now.toLocaleDateString('en-US', dateFormatOptions).toUpperCase();
    }
}

// Update uptime counter
let uptimeSeconds = 0;
function updateUptimeCounter() {
    uptimeSeconds++;
    const uptimeHours = Math.floor(uptimeSeconds / 3600).toString().padStart(2, '0');
    const uptimeMinutes = Math.floor((uptimeSeconds % 3600) / 60).toString().padStart(2, '0');
    const uptimeSecondsDisplay = (uptimeSeconds % 60).toString().padStart(2, '0');
    
    const uptimeElement = document.getElementById('uptime-counter');
    if (uptimeElement) {
        uptimeElement.textContent = `${uptimeHours}:${uptimeMinutes}:${uptimeSecondsDisplay}`;
    }
}

// Simulate packet counter
let packetCount = 0;
function updatePacketCounter() {
    packetCount += Math.floor(Math.random() * 5);
    const packetElement = document.getElementById('packet-count');
    if (packetElement) {
        packetElement.textContent = packetCount;
    }
}

// Simulate resource usage
function updateResourceBars() {
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

function addExploitLogMessage() {
    const logContent = document.getElementById('exploit-log');
    if (!logContent) return;
    
    const message = exploitMessages[Math.floor(Math.random() * exploitMessages.length)];
    const logLine = document.createElement('div');
    logLine.className = 'log-line';
    logLine.textContent = message;
    
    // Color based on prefix
    if (message.includes('[♥]')) logLine.style.color = '#ff69b4';
    else if (message.includes('[+]')) logLine.style.color = '#90ee90';
    else if (message.includes('[!]')) logLine.style.color = '#ffd700';
    
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
    createHeartParticles();
    updateTimeDisplay();
    
    // Update time every second
    setInterval(updateTimeDisplay, 1000);
    setInterval(updateUptimeCounter, 1000);
    setInterval(updatePacketCounter, 2000);
    setInterval(updateResourceBars, 3000);
    setInterval(addExploitLogMessage, 4000);
}

// Transition to desktop
function transitionToDesktop() {
    const homescreenElement = document.getElementById('homescreen');
    const desktopElement = document.getElementById('desktop');
    
    if (homescreenElement && desktopElement) {
        homescreenElement.classList.add('fade-out');
        
        setTimeout(() => {
            homescreenElement.style.display = 'none';
            desktopElement.classList.remove('hidden');
        }, 800);
    }
}

// Handle click/tap to unlock
function setupUnlockHandlers() {
    const homescreenElement = document.getElementById('homescreen');
    if (!homescreenElement) return;
    
    // Click anywhere to unlock
    homescreenElement.addEventListener('click', (event) => {
        if (!event.target.closest('.terminal-panel')) {
            transitionToDesktop();
        }
    });
    
    // Keyboard unlock
    document.addEventListener('keydown', (event) => {
        if (homescreenElement.classList.contains('visible') && !homescreenElement.classList.contains('fade-out')) {
            if (event.key === 'Enter' || event.key === ' ') {
                transitionToDesktop();
            }
        }
    });
}

// Panel click handlers
function setupWidgetPanelHandlers() {
    const terminalPanels = document.querySelectorAll('.terminal-panel');
    terminalPanels.forEach(panel => {
        panel.addEventListener('click', (event) => {
            event.stopPropagation();
            
            const panelAction = panel.dataset.action;
            if (panelAction) {
                transitionToDesktop();
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
    const homescreenElement = document.getElementById('homescreen');
    if (homescreenElement) {
        homescreenElement.classList.add('visible');
        initHomescreen();
        setupUnlockHandlers();
        setupWidgetPanelHandlers();
    }
}

// Export for use in os.js
window.showHomescreen = showHomescreen;
window.transitionToDesktop = transitionToDesktop;
