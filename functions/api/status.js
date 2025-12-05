// API endpoint for system stats
// Returns simulated CPU, Memory, and Uptime data for CherryOS

export async function onRequest(context) {
    // Simulate system stats
    const stats = {
        cpu: 15 + Math.floor(Math.random() * 25),
        memory: 40 + Math.floor(Math.random() * 20),
        network: 5 + Math.floor(Math.random() * 20),
        uptime: Date.now()
    };

    return new Response(JSON.stringify(stats), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    });
}
