const express = require('express');
const axios = require('axios');
const log = require('./lib/logSubscribeManager');

/* Express */
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/log', async (req, res) => {
    console.log(req.body.log);
    log.logSubscriber.forEach(subscriber => subscriber(req.body.log));
    return res.send('ok');
});

app.listen(10002);

/* web hook sender */
log.subscribe((log) => {
    console.log('subscriber');
    console.log(log);
});

