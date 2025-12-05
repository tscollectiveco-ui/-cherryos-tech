// Homescreen functionality

// Update time display
function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    // 12-hour format
    const displayHours = hours % 12 || 12;
    
    const timeElement = document.querySelector('.time-display');
    if (timeElement) {
        timeElement.textContent = `${displayHours}:${minutes}`;
    }
    
    // Update date
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const dateElement = document.querySelector('.date-display');
    if (dateElement) {
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    }
    
    // Update greeting based on time of day
    updateGreeting(hours);
}

// Update greeting based on time
function updateGreeting(hours) {
    const greetingElement = document.querySelector('.greeting');
    if (!greetingElement) return;
    
    let greeting = '';
    if (hours >= 5 && hours < 12) {
        greeting = 'Good morning 🌸';
    } else if (hours >= 12 && hours < 17) {
        greeting = 'Good afternoon 🌷';
    } else if (hours >= 17 && hours < 21) {
        greeting = 'Good evening 🌺';
    } else {
        greeting = 'Sweet dreams 🌙';
    }
    
    greetingElement.textContent = greeting;
}

// Create floating particles
function createParticles() {
    const homescreen = document.getElementById('homescreen');
    if (!homescreen) return;
    
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (4 + Math.random() * 4) + 's';
        particle.style.width = (5 + Math.random() * 10) + 'px';
        particle.style.height = particle.style.width;
        particle.style.opacity = 0.2 + Math.random() * 0.4;
        homescreen.appendChild(particle);
    }
}

// Initialize homescreen
function initHomescreen() {
    updateTime();
    createParticles();
    
    // Update time every second
    setInterval(updateTime, 1000);
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
        // Don't unlock if clicking on a widget (widgets have their own actions)
        if (!e.target.closest('.widget')) {
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

// Widget click handlers
function setupWidgets() {
    const widgets = document.querySelectorAll('.widget');
    widgets.forEach(widget => {
        widget.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent unlock when clicking widget
            
            const action = widget.dataset.action;
            if (action) {
                // Unlock and then open the corresponding window
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
