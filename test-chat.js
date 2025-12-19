
const fetch = require('node-fetch');

async function test() {
    const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            messages: [
                { role: 'user', content: 'hello' }
            ]
        })
    });

    console.log('Status:', response.status);
    const text = await response.text();
    console.log('Body:', text);
}

test();
