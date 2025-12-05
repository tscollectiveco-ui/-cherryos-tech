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
    let columns = Math.floor(canvas.width / fontSize);
    let drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }
    
    let lastFrameTime = 0;
    const frameInterval = 50; // ~20fps
    
    function draw(timestamp) {
        // Throttle to maintain consistent frame rate
        if (timestamp - lastFrameTime < frameInterval) {
            requestAnimationFrame(draw);
            return;
        }
        lastFrameTime = timestamp;
        
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
        
        requestAnimationFrame(draw);
    }
    
    requestAnimationFrame(draw);
    
    // Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            columns = Math.floor(canvas.width / fontSize);
            // Reinitialize drops array for new column count
            const newDrops = [];
            for (let i = 0; i < columns; i++) {
                newDrops[i] = drops[i] !== undefined ? drops[i] : Math.random() * -100;
            }
            drops = newDrops;
        }, 150);
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

// Cache DOM element references for time updates
let timeElement, dateElement;

// Update time display (24-hour hacker format)
function updateTime() {
    // Initialize cached elements on first call
    if (!timeElement) {
        timeElement = document.querySelector('.hacker-time .time-display');
        dateElement = document.querySelector('.hacker-time .date-display');
    }
    
    const now = new Date();
    const hours = formatTimeValue(now.getHours());
    const minutes = formatTimeValue(now.getMinutes());
    const seconds = formatTimeValue(now.getSeconds());
    
    if (timeElement) {
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
    
    // Update date
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    if (dateElement) {
        dateElement.textContent = now.toLocaleDateString('en-US', options).toUpperCase();
    }
}

// Cache DOM element reference for uptime
let uptimeElement;

// Update uptime counter
let uptimeSeconds = 0;
function updateUptime() {
    // Initialize cached element on first call
    if (!uptimeElement) {
        uptimeElement = document.getElementById('uptime-counter');
    }
    
    uptimeSeconds++;
    const hours = formatTimeValue(Math.floor(uptimeSeconds / 3600));
    const minutes = formatTimeValue(Math.floor((uptimeSeconds % 3600) / 60));
    const seconds = formatTimeValue(uptimeSeconds % 60);
    
    if (uptimeElement) {
        uptimeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

// Cache DOM element reference for packet counter
let packetElement;

// Simulate packet counter
let packetCount = 0;
function updatePackets() {
    // Initialize cached element on first call
    if (!packetElement) {
        packetElement = document.getElementById('packet-count');
    }
    
    packetCount += Math.floor(Math.random() * 5);
    if (packetElement) {
        packetElement.textContent = packetCount;
    }
}

// Cache DOM element references for resource updates
let cpuValEl, memValEl, netValEl, cpuBarEl, memBarEl, netBarEl;

// Simulate resource usage
function updateResources() {
    // Initialize cached elements on first call
    if (!cpuValEl) {
        cpuValEl = document.getElementById('cpu-val');
        memValEl = document.getElementById('mem-val');
        netValEl = document.getElementById('net-val');
        cpuBarEl = document.querySelector('.cpu-bar');
        memBarEl = document.querySelector('.mem-bar');
        netBarEl = document.querySelector('.net-bar');
    }
    
    const cpu = 15 + Math.floor(Math.random() * 25);
    const mem = 40 + Math.floor(Math.random() * 20);
    const net = 5 + Math.floor(Math.random() * 20);
    
    if (cpuValEl) cpuValEl.textContent = cpu + '%';
    if (memValEl) memValEl.textContent = mem + '%';
    if (netValEl) netValEl.textContent = net + '%';
    
    if (cpuBarEl) cpuBarEl.style.width = cpu + '%';
    if (memBarEl) memBarEl.style.width = mem + '%';
    if (netBarEl) netBarEl.style.width = net + '%';
}

// Cache DOM element reference for exploit log
let exploitLogElement;

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
    // Initialize cached element on first call
    if (!exploitLogElement) {
        exploitLogElement = document.getElementById('exploit-log');
    }
    if (!exploitLogElement) return;
    
    const message = exploitMessages[Math.floor(Math.random() * exploitMessages.length)];
    const logLine = document.createElement('div');
    logLine.className = 'log-line';
    logLine.textContent = message;
    
    // Color based on prefix
    if (message.includes('[♥]')) logLine.style.color = '#ff69b4';
    else if (message.includes('[+]')) logLine.style.color = '#90ee90';
    else if (message.includes('[!]')) logLine.style.color = '#ffd700';
    
    exploitLogElement.appendChild(logLine);
    exploitLogElement.scrollTop = exploitLogElement.scrollHeight;
    
    // Keep only last 6 lines
    while (exploitLogElement.children.length > 6) {
        exploitLogElement.removeChild(exploitLogElement.firstChild);
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
