const http = require('http');

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/users',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }
};

const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log(`Response: ${data}`);
    });
});

req.on('error', (error) => {
    console.error(`Problem with request: ${error.message}`);
});

// Wysłanie danych użytkownika
const userData = JSON.stringify({
    username: 'jan',
    email: 'jp2@student.agh.edu.pl',
    password: '123456',
    role: 'user'
});

req.write(userData);
req.end();
