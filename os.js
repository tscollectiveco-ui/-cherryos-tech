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
    const titleBar = windowElement.querySelector(".titlebar");
    let dragOffsetX = 0, dragOffsetY = 0, isDragging = false;

    titleBar.addEventListener("mousedown", (event) => {
        isDragging = true;
        dragOffsetX = event.clientX - windowElement.offsetLeft;
        dragOffsetY = event.clientY - windowElement.offsetTop;
        windowElement.style.zIndex = Date.now();
    });

    document.addEventListener("mouseup", () => isDragging = false);

    document.addEventListener("mousemove", (event) => {
        if (!isDragging) return;
        windowElement.style.left = `${event.clientX - dragOffsetX}px`;
        windowElement.style.top = `${event.clientY - dragOffsetY}px`;
    });
}
