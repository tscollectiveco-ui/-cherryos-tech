// Boot → Show homescreen (instead of going directly to desktop)
setTimeout(() => {
    // Show homescreen after boot animation completes
    if (typeof showHomescreen === 'function') {
        showHomescreen();
    }
}, 3000);

// Window controls
function openWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    windowElement.classList.remove("hidden");
    makeDraggable(windowElement);
    windowElement.style.zIndex = Date.now();
}

function closeWindow(windowId) {
    document.getElementById(windowId).classList.add("hidden");
}

// Dragging system
function makeDraggable(windowElement) {
    const titlebarElement = windowElement.querySelector(".titlebar");
    let dragOffsetX = 0, dragOffsetY = 0, isDragging = false;

    titlebarElement.addEventListener("mousedown", (e) => {
        isDragging = true;
        dragOffsetX = e.clientX - windowElement.offsetLeft;
        dragOffsetY = e.clientY - windowElement.offsetTop;
        windowElement.style.zIndex = Date.now();
    });

    document.addEventListener("mouseup", () => isDragging = false);

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        windowElement.style.left = `${e.clientX - dragOffsetX}px`;
        windowElement.style.top = `${e.clientY - dragOffsetY}px`;
    });
}
