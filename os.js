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

// Track which windows have already been made draggable
const draggableWindows = new Set();

// Dragging system - optimized to prevent event listener accumulation
function makeDraggable(win) {
    // Prevent adding duplicate listeners
    if (draggableWindows.has(win.id)) {
        return;
    }
    draggableWindows.add(win.id);
    
    const bar = win.querySelector(".titlebar");
    let offsetX = 0, offsetY = 0, isDown = false;

    bar.addEventListener("mousedown", (e) => {
        isDown = true;
        offsetX = e.clientX - win.offsetLeft;
        offsetY = e.clientY - win.offsetTop;
        win.style.zIndex = getNextZIndex();
    });

    // Use named functions to avoid creating new function references
    function handleMouseUp() {
        isDown = false;
    }
    
    function handleMouseMove(e) {
        if (!isDown) return;
        win.style.left = `${e.clientX - offsetX}px`;
        win.style.top = `${e.clientY - offsetY}px`;
    }

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
}
