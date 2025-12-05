// CherryOS Chat System ♥
// Handles chat window creation and messaging

// Toggle chat window visibility
function toggleChat() {
    const chatWindow = document.getElementById('chat');
    if (chatWindow) {
        if (chatWindow.classList.contains('hidden')) {
            openWindow('chat');
        } else {
            closeWindow('chat');
        }
    }
}

// Initialize chat when window opens
function initChatWindow() {
    const chatWindow = document.getElementById('chat');
    if (!chatWindow) return;

    // Check if chat UI already exists
    if (chatWindow.querySelector('.chat-container')) return;

    // Remove old iframe if exists
    const oldIframe = chatWindow.querySelector('iframe');
    if (oldIframe) {
        oldIframe.remove();
    }

    // Create chat container
    const chatContainer = document.createElement('div');
    chatContainer.className = 'chat-container';
    chatContainer.innerHTML = `
        <div class="chat-messages" id="chat-messages">
            <div class="chat-message system">
                <span class="message-icon">🍒</span>
                <span class="message-text">Welcome to CherryOS Chat! Type a message to start~ ♥</span>
            </div>
        </div>
        <div class="chat-input-container">
            <input type="text" id="chat-input" class="chat-input" placeholder="Type your message... ♥" autocomplete="off">
            <button id="chat-send" class="chat-send-btn">💗</button>
        </div>
    `;
    
    chatWindow.appendChild(chatContainer);

    // Setup event listeners
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');

    if (input && sendBtn) {
        sendBtn.addEventListener('click', sendChatMessage);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
}

// Send chat message to backend
async function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const messagesContainer = document.getElementById('chat-messages');
    
    if (!input || !messagesContainer) return;
    
    const message = input.value.trim();
    if (!message) return;

    // Clear input
    input.value = '';

    // Add user message to chat
    addChatMessage('user', message);

    // Show typing indicator
    const typingId = showTypingIndicator();

    try {
        // Fetch response from backend
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        });

        // Remove typing indicator
        removeTypingIndicator(typingId);

        if (response.ok) {
            const data = await response.json();
            addChatMessage('system', data.response);
        } else {
            // Fallback response if API fails
            addChatMessage('system', getFallbackResponse(message));
        }
    } catch {
        // Fallback for local development or network errors
        removeTypingIndicator(typingId);
        addChatMessage('system', getFallbackResponse(message));
    }
}

// Add message to chat display
function addChatMessage(type, text) {
    const messagesContainer = document.getElementById('chat-messages');
    if (!messagesContainer) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}`;
    
    const icon = type === 'user' ? '💬' : '🍒';
    messageDiv.innerHTML = `
        <span class="message-icon">${icon}</span>
        <span class="message-text">${escapeHtml(text)}</span>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const messagesContainer = document.getElementById('chat-messages');
    if (!messagesContainer) return null;

    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message system typing-indicator';
    typingDiv.id = 'typing-' + Date.now();
    typingDiv.innerHTML = `
        <span class="message-icon">🍒</span>
        <span class="message-text typing-dots">
            <span>.</span><span>.</span><span>.</span>
        </span>
    `;
    
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    return typingDiv.id;
}

// Remove typing indicator
function removeTypingIndicator(id) {
    if (!id) return;
    const indicator = document.getElementById(id);
    if (indicator) {
        indicator.remove();
    }
}

// Fallback responses for local development
function getFallbackResponse(message) {
    const responses = [
        "🍒 Hey cutie! I'm CherryOS, your favorite hacker companion~ ♥",
        "♥ Running scan... just kidding! How can I help you today?",
        "🔒 Security tip: Always use strong passwords! Stay safe out there~ 💗",
        "💻 Pro tip: Press Ctrl+Shift+I to feel like a real hacker! ♥",
        "🍒 Fun fact: This OS was designed with love and lots of pink! 💖"
    ];
    
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return "🍒 Hey there, cutie! Welcome to CherryOS~ How can I help you today? ♥";
    } else if (lowerMessage.includes('hack')) {
        return "♥ Ethical hacking only! Remember: with great power comes great responsibility~ 💻";
    } else if (lowerMessage.includes('help')) {
        return "💗 I'm here to help! You can ask me about the system, security tips, or just chat~ 🍒";
    }
    
    return responses[Math.floor(Math.random() * responses.length)];
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Setup chat initialization when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Watch for chat window becoming visible
    const chatWindow = document.getElementById('chat');
    if (chatWindow) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (!chatWindow.classList.contains('hidden')) {
                        initChatWindow();
                    }
                }
            });
        });
        
        observer.observe(chatWindow, { attributes: true });
    }
});

// Export functions
window.toggleChat = toggleChat;
window.initChatWindow = initChatWindow;
window.sendChatMessage = sendChatMessage;
