// Homescreen functionality - Feminine Hacker Edition

// Store interval IDs for cleanup
let matrixRainIntervalId = null;
let timeIntervalId = null;
let uptimeIntervalId = null;
let packetsIntervalId = null;
let resourcesIntervalId = null;
let exploitLogIntervalId = null;
let resizeHandler = null;

// Cache DOM elements
let cachedElements = {};

function getCachedElement(selector) {
    if (!cachedElements[selector]) {
        cachedElements[selector] = document.querySelector(selector);
    }
    return cachedElements[selector];
}

function getCachedElementById(id) {
    if (!cachedElements['#' + id]) {
        cachedElements['#' + id] = document.getElementById(id);
    }
    return cachedElements['#' + id];
}

// Clear all homescreen intervals
function clearHomescreenIntervals() {
    if (matrixRainIntervalId) {
        clearInterval(matrixRainIntervalId);
        matrixRainIntervalId = null;
    }
    if (timeIntervalId) {
        clearInterval(timeIntervalId);
        timeIntervalId = null;
    }
    if (uptimeIntervalId) {
        clearInterval(uptimeIntervalId);
        uptimeIntervalId = null;
    }
    if (packetsIntervalId) {
        clearInterval(packetsIntervalId);
        packetsIntervalId = null;
    }
    if (resourcesIntervalId) {
        clearInterval(resourcesIntervalId);
        resourcesIntervalId = null;
    }
    if (exploitLogIntervalId) {
        clearInterval(exploitLogIntervalId);
        exploitLogIntervalId = null;
    }
    if (resizeHandler) {
        window.removeEventListener('resize', resizeHandler);
        resizeHandler = null;
    }
    // Clear cached elements when leaving homescreen
    cachedElements = {};
}

// Matrix rain effect with pink hearts and characters
function initMatrixRain() {
    const canvas = getCachedElementById('matrix-rain');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '♥01アイウエオカキクケコ10♥HACK3R♥';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(26, 10, 20, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ff69b4';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    matrixRainIntervalId = setInterval(draw, 50);
    
    resizeHandler = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeHandler);
}

// Create floating heart particles
function createParticles() {
    const homescreen = getCachedElementById('homescreen');
    if (!homescreen) return;
    
    const particleCount = 12;
    const hearts = ['♥', '♡', '❤', '💗'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = hearts[Math.floor(Math.random() * hearts.length)];
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
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    const timeElement = getCachedElement('.hacker-time .time-display');
    if (timeElement) {
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
    
    // Update date
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const dateElement = getCachedElement('.hacker-time .date-display');
    if (dateElement) {
        dateElement.textContent = now.toLocaleDateString('en-US', options).toUpperCase();
    }
}

// Update uptime counter
let uptimeSeconds = 0;
function updateUptime() {
    uptimeSeconds++;
    const hours = Math.floor(uptimeSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((uptimeSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (uptimeSeconds % 60).toString().padStart(2, '0');
    
    const uptimeElement = getCachedElementById('uptime-counter');
    if (uptimeElement) {
        uptimeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

// Simulate packet counter
let packetCount = 0;
function updatePackets() {
    packetCount += Math.floor(Math.random() * 5);
    const packetElement = getCachedElementById('packet-count');
    if (packetElement) {
        packetElement.textContent = packetCount;
    }
}

// Simulate resource usage
function updateResources() {
    const cpu = 15 + Math.floor(Math.random() * 25);
    const mem = 40 + Math.floor(Math.random() * 20);
    const net = 5 + Math.floor(Math.random() * 20);
    
    const cpuVal = getCachedElementById('cpu-val');
    const memVal = getCachedElementById('mem-val');
    const netVal = getCachedElementById('net-val');
    const cpuBar = getCachedElement('.cpu-bar');
    const memBar = getCachedElement('.mem-bar');
    const netBar = getCachedElement('.net-bar');
    
    if (cpuVal) cpuVal.textContent = cpu + '%';
    if (memVal) memVal.textContent = mem + '%';
    if (netVal) netVal.textContent = net + '%';
    
    if (cpuBar) cpuBar.style.width = cpu + '%';
    if (memBar) memBar.style.width = mem + '%';
    if (netBar) netBar.style.width = net + '%';
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
    const logContent = getCachedElementById('exploit-log');
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
    createParticles();
    updateTime();
    
    // Update time every second
    timeIntervalId = setInterval(updateTime, 1000);
    uptimeIntervalId = setInterval(updateUptime, 1000);
    packetsIntervalId = setInterval(updatePackets, 2000);
    resourcesIntervalId = setInterval(updateResources, 3000);
    exploitLogIntervalId = setInterval(addExploitLog, 4000);
}

// Transition to desktop
function unlockToDesktop() {
    const homescreen = getCachedElementById('homescreen');
    const desktop = getCachedElementById('desktop');
    
    if (homescreen && desktop) {
        homescreen.classList.add('fade-out');
        
        // Clear all intervals when leaving homescreen
        clearHomescreenIntervals();
        
        setTimeout(() => {
            homescreen.style.display = 'none';
            desktop.classList.remove('hidden');
        }, 800);
    }
}

// Handle click/tap to unlock
function setupUnlock() {
    const homescreen = getCachedElementById('homescreen');
    if (!homescreen) return;
    
    // Click anywhere to unlock
    homescreen.addEventListener('click', (e) => {
        if (!e.target.closest('.terminal-panel')) {
            unlockToDesktop();
        }
    });
    
    // Keyboard unlock
    document.addEventListener('keydown', (e) => {
        if (homescreen.classList.contains('visible') && !homescreen.classList.contains('fade-out')) {
            if (e.key === 'Enter' || e.key === ' ') {
                unlockToDesktop();
            }
        }
    });
}

// Panel click handlers
function setupWidgets() {
    const panels = document.querySelectorAll('.terminal-panel');
    panels.forEach(panel => {
        panel.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const action = panel.dataset.action;
            if (action) {
                unlockToDesktop();
                setTimeout(() => {
                    if (typeof openWindow === 'function') {
                        openWindow(action);
                    }
                }, 900);
            }
        });
    });
}

// Show homescreen after boot
function showHomescreen() {
    const homescreen = getCachedElementById('homescreen');
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
