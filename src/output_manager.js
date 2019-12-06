const express = require('express');
const axios = require('axios');

require('dotenv').config();
const manager_port = process.env.manager_port;
const webhook_url = process.env.discord_webhook;

/* Express */
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const logSubscriber = [];

app.post('/log', async (req, res) => {
    logSubscriber.forEach(subscriber => subscriber(req.body.log));
    return res.send('ok');
});

app.listen(manager_port);

/* web hook sender */
logSubscriber.push((log) => {
    console.log('subscriber');
    console.log(log);
    const data = {
        content: log
    };
    axios.post(webhook_url, data)
});

