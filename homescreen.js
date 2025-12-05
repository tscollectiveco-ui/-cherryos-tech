// Homescreen functionality - Feminine Hacker Edition

// Helper function to format time values with leading zeros
function formatTimeValue(value) {
    return value.toString().padStart(2, '0');
}

// Matrix rain effect with pink hearts and characters
function initMatrixRain() {
    const canvas = document.getElementById('matrix-rain');
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
    const hours = formatTimeValue(now.getHours());
    const minutes = formatTimeValue(now.getMinutes());
    const seconds = formatTimeValue(now.getSeconds());
    
    const timeElement = document.querySelector('.hacker-time .time-display');
    if (timeElement) {
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
    
    // Update date
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const dateElement = document.querySelector('.hacker-time .date-display');
    if (dateElement) {
        dateElement.textContent = now.toLocaleDateString('en-US', options).toUpperCase();
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

// Update resource usage from backend API with fallback
async function updateResources() {
    let cpu, mem, net;
    
    try {
        // Try to fetch from backend API
        const response = await fetch('/api/status');
        if (response.ok) {
            const data = await response.json();
            cpu = data.cpu;
            mem = data.memory;
            net = data.network;
        } else {
            throw new Error('API response not ok');
        }
    } catch {
        // Fallback to random data if fetch fails (e.g., running locally)
        cpu = 15 + Math.floor(Math.random() * 25);
        mem = 40 + Math.floor(Math.random() * 20);
        net = 5 + Math.floor(Math.random() * 20);
    }
    
    document.getElementById('cpu-val').textContent = cpu + '%';
    document.getElementById('mem-val').textContent = mem + '%';
    document.getElementById('net-val').textContent = net + '%';
    
    document.querySelector('.cpu-bar').style.width = cpu + '%';
    document.querySelector('.mem-bar').style.width = mem + '%';
    document.querySelector('.net-bar').style.width = net + '%';
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
