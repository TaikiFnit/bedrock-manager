const express = require('express');
const axios = require('axios');
const log = require('./lib/logSubscribeManager');

require('dotenv').config();
const manager_port = process.env.output_piper_port;

/* Express */
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/log', async (req, res) => {
    console.log(req.body.log);
    log.logSubscriber.forEach(subscriber => subscriber(req.body.log));
    return res.send('ok');
});

app.listen(manager_port);

/* web hook sender */
log.subscribe((log) => {
    console.log('subscriber');
    console.log(log);
});

