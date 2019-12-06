const readline = require('readline').createInterface(process.stdin, process.stdout);
const express = require('express');
require('dotenv').config();
const port = process.env.input_piper_port;


/* Standard Input */
// serverへの標準入力へpipe
readline.on('line',function(str){
    console.log(str);
});


/* Express */
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/command', async (req, res) => {
    console.log(req.body.command);
    return res.send('ok');
});

app.listen(port);


