// API endpoint for chat responses
// Accepts POST requests with a message and returns a simulated AI/System response

const cherryResponses = [
    "🍒 Hey cutie! I'm CherryOS, your favorite hacker companion~ ♥",
    "♥ Running scan... just kidding! How can I help you today?",
    "🔒 Security tip: Always use strong passwords! Stay safe out there~ 💗",
    "💻 Pro tip: Press Ctrl+Shift+I to feel like a real hacker! ♥",
    "🍒 Fun fact: This OS was designed with love and lots of pink! 💖",
    "♥ Remember: The best hackers are kind and ethical! 🌸",
    "💗 Need anything? I'm here to make your day brighter~",
    "🔓 Access granted to my heart! Just kidding... or am I? 💕",
    "💻 System status: 100% adorable and fully functional! ♥",
    "🍒 Cherry says: Take a break, drink some water! Self-care is important~ 💖"
];

export async function onRequest(context) {
    const { request } = context;
    
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        });
    }

    // Only accept POST requests
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }

    try {
        const body = await request.json();
        const userMessage = body.message || '';
        
        // Generate a response based on keywords or random selection
        let response;
        const lowerMessage = userMessage.toLowerCase();
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            response = "🍒 Hey there, cutie! Welcome to CherryOS~ How can I help you today? ♥";
        } else if (lowerMessage.includes('hack')) {
            response = "♥ Ethical hacking only! Remember: with great power comes great responsibility~ 💻";
        } else if (lowerMessage.includes('help')) {
            response = "💗 I'm here to help! You can ask me about the system, security tips, or just chat~ 🍒";
        } else if (lowerMessage.includes('love') || lowerMessage.includes('cute')) {
            response = "💖 Aww, you're making me blush! *beep boop* 🌸";
        } else if (lowerMessage.includes('security') || lowerMessage.includes('safe')) {
            response = "🔒 Security tip: Use 2FA, strong passwords, and stay updated! Stay safe~ ♥";
        } else if (lowerMessage.includes('cherry')) {
            response = "🍒 That's me! CherryOS, at your service~ ♥ What would you like to know?";
        } else {
            // Random response
            response = cherryResponses[Math.floor(Math.random() * cherryResponses.length)];
        }

        return new Response(JSON.stringify({ 
            response: response,
            timestamp: new Date().toISOString()
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    } catch {
        return new Response(JSON.stringify({ 
            response: "🍒 Oops! Something went wrong. Try again? ♥",
            error: 'Invalid request'
        }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }
}
