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

// Dragging system - improved to avoid memory leaks
const dragState = new WeakMap();

function makeDraggable(win) {
    // Prevent adding duplicate listeners
    if (dragState.has(win)) return;
    
    const bar = win.querySelector(".titlebar");
    const state = { offsetX: 0, offsetY: 0, isDown: false };
    dragState.set(win, state);

    bar.addEventListener("mousedown", (e) => {
        state.isDown = true;
        state.offsetX = e.clientX - win.offsetLeft;
        state.offsetY = e.clientY - win.offsetTop;
        win.style.zIndex = Date.now();
    });
}

// Single global event listeners for mouse events (instead of per-window)
document.addEventListener("mouseup", () => {
    document.querySelectorAll('.window').forEach(win => {
        const state = dragState.get(win);
        if (state) state.isDown = false;
    });
});

document.addEventListener("mousemove", (e) => {
    document.querySelectorAll('.window').forEach(win => {
        const state = dragState.get(win);
        if (state && state.isDown) {
            win.style.left = `${e.clientX - state.offsetX}px`;
            win.style.top = `${e.clientY - state.offsetY}px`;
        }
    });
});
