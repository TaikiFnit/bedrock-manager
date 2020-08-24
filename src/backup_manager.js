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

  console.log('[INFO] Following command will be executed if backup_retention_period > 0.');
  console.log(`[INFO] find ../backups/ -mtime +${process.env.backup_retention_period} -exec rm -f {} \\;`);
  if(process.env.backup_retention_period > 0) {
    exec(`find ../backups/ -mtime +${process.env.backup_retention_period} -exec rm -f {} \\;`, (err, stdout, stderr) => {
    if (err) { console.log(err); }
      console.log(stdout);
    });
  }

  if(webhook_url.match(/http/)) {
    const data = {
      content: 'Worlds is backed up.'
    };
    axios.post(webhook_url, data);
  } else {
    console.log('[INFO] webhook url is not set. it will not notify.');
  }
}
