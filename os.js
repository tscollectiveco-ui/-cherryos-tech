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
    initDraggable(win);
    win.style.zIndex = getNextZIndex();
}

function closeWindow(id) {
    document.getElementById(id).classList.add("hidden");
}

// Z-index counter for window stacking
let zIndexCounter = 1000;
function getNextZIndex() {
    return ++zIndexCounter;
}

// Dragging state
let activeWindow = null;
let offsetX = 0;
let offsetY = 0;

// Track which windows have been initialized for dragging
const initializedWindows = new Set();

// Initialize a window for dragging (only adds mousedown listener to titlebar)
function initDraggable(win) {
    if (initializedWindows.has(win.id)) {
        return;
    }
    initializedWindows.add(win.id);
    
    const bar = win.querySelector(".titlebar");
    bar.addEventListener("mousedown", (e) => {
        activeWindow = win;
        offsetX = e.clientX - win.offsetLeft;
        offsetY = e.clientY - win.offsetTop;
        win.style.zIndex = getNextZIndex();
    });
}

// Global event delegation for mouse events (single listeners for all windows)
document.addEventListener("mouseup", () => {
    activeWindow = null;
});

document.addEventListener("mousemove", (e) => {
    if (!activeWindow) return;
    activeWindow.style.left = `${e.clientX - offsetX}px`;
    activeWindow.style.top = `${e.clientY - offsetY}px`;
});
