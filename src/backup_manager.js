const exec = require('child_process').exec;
const axios = require('axios');
require('dotenv').config();
const webhook_url = process.env.discord_webhook;

do_backup();

setInterval(() => {
    console.log('interval 1 day');
    do_backup();
}, 1000 * 60 * 60 * 24);

function do_backup() {
    exec("zip -r ../backups/minecraft_`date +%Y%m%d-%H%M%S`.zip ../worlds/", (err, stdout, stderr) => {
        if (err) { console.log(err); }
        console.log(stdout);
    });

    const data = {
        content: 'Worlds is backed up.'
    };
    axios.post(webhook_url, data)
}