// Boot → Show desktop
setTimeout(() => {
    document.getElementById("desktop").classList.remove("hidden");
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

// Dragging system
function makeDraggable(win) {
    const bar = win.querySelector(".titlebar");
    let offsetX = 0, offsetY = 0, isDown = false;

    bar.addEventListener("mousedown", (e) => {
        isDown = true;
        offsetX = e.clientX - win.offsetLeft;
        offsetY = e.clientY - win.offsetTop;
        win.style.zIndex = Date.now();
    });

    document.addEventListener("mouseup", () => isDown = false);

    document.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        win.style.left = `${e.clientX - offsetX}px`;
        win.style.top = `${e.clientY - offsetY}px`;
    });
}
