const axios = require('axios');

let reader = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

reader.on('line', function(log) {
    axios.post(`http://localhost:10002/log`, { log });
});