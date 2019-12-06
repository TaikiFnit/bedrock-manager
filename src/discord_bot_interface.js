const axios = require('axios');
const Discord = require('discord.js');


require('dotenv').config();
const token = process.env.discord_token;

const client = new Discord.Client();
const command_name = /\/fnit/;
const input_piper_port = process.env.input_piper_port;
const channel = process.env.target_channel;


client.on('message', async message => {
    if(message.author.bot){
        return;
    }

    const author = {
        id: message.author.id,
        username: message.author.username,
        discriminator: message.author.discriminator,
        avatar: message.author.avatar
    };

    if (message.content.match(command_name) && message.channel.name == channel) {
        // 先頭の/command_name を削除
        const [_, ...directives] = message.content.split(' ');
        const directivesString = directives.join(' ');

        const response = await axios.post(`http://localhost:${input_piper_port}/command`, {
            command: directivesString
        }).catch(async (err) => {
            console.log('catch');
            await message.reply(`Err. ${err}`);
        });

        console.log('response');
        console.log(response);

        if (response && response.status === 200) {
            console.log('ok');
            await message.reply(response.data);
        }
    }
});

client.login(token);