// Boot → Show homescreen (instead of going directly to desktop)
setTimeout(() => {
    // Show homescreen after boot animation completes
    if (typeof showHomescreen === 'function') {
        showHomescreen();
    }
}, 3000);

// Z-index counter for window stacking (more efficient than Date.now())
let windowZIndex = 1000;

// Window controls
function openWindow(id) {
    const win = document.getElementById(id);
    win.classList.remove("hidden");
    makeDraggable(win);
    win.style.zIndex = ++windowZIndex;
}

function closeWindow(id) {
    document.getElementById(id).classList.add("hidden");
}

// Track which windows have been made draggable to avoid duplicate listeners
const draggableWindows = new WeakSet();

// Shared document-level mouse handlers (set up once)
let activeWindow = null;
let offsetX = 0;
let offsetY = 0;

function handleMouseUp() {
    activeWindow = null;
}

function handleMouseMove(e) {
    if (!activeWindow) return;
    activeWindow.style.left = `${e.clientX - offsetX}px`;
    activeWindow.style.top = `${e.clientY - offsetY}px`;
}

// Set up document-level listeners once
document.addEventListener("mouseup", handleMouseUp);
document.addEventListener("mousemove", handleMouseMove);

// Dragging system
function makeDraggable(win) {
    // Skip if already made draggable
    if (draggableWindows.has(win)) return;
    draggableWindows.add(win);
    
    const bar = win.querySelector(".titlebar");

    bar.addEventListener("mousedown", (e) => {
        activeWindow = win;
        offsetX = e.clientX - win.offsetLeft;
        offsetY = e.clientY - win.offsetTop;
        win.style.zIndex = ++windowZIndex;
    });
}
