const { Client } = require('./index')

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const client = new Client({puppeteer: {headless: true,args: ['--no-sandbox', '--disable-setuid-sandbox']}});
// You can use an existing session and avoid scanning a QR code by adding a "session" object to the client options.
// This object must include WABrowserId, WASecretBundle, WAToken1 and WAToken2.

app.get('/lc/', async (req, res) => {

    client.initialize();

    client.on('qr', (qr_img) => {
        // NOTE: This event will not be fired if a session is specified.
        // console.log('QR RECEIVED', qr_img);
        res.set({
            'Access-Control-Allow-Origin':'*',

        })
        res.status(200).json({
            QR_image: qr_img
        })
    });

});

app.listen(3000, function () {
    console.log('Basic NodeJS app listening on port 3000.');
});

/*client.on('qr', (qr) => {
    // NOTE: This event will not be fired if a session is specified.
    console.log('QR RECEIVED', qr);
});*/
client.on('qr', (qr_img) => {
    // NOTE: This event will not be fired if a session is specified.
    console.log('QR RECEIVED', qr_img);
});

client.on('authenticated', (session) => {
    console.log('AUTHENTICATED', session);
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessfull
    console.error('AUTHENTICATION FAILURE', msg);
})

client.on('ready', () => {
    console.log('READY');
});

client.on('message', async msg => {
    console.log('MESSAGE RECEIVED', msg);

    if (msg.body == '!ping reply') {
        // Send a new message as a reply to the current one
        msg.reply('pong');

    } else if (msg.body == '!ping') {
        // Send a new message to the same chat
        client.sendMessage(msg.from, 'pong');

    } else if (msg.body == '@start') {
        // Send a new message to the same chat
        client.sendMessage(msg.from, 'привет, я твоя коробочка ToDoBox<br> если узнать что такое коробочка нажмите 1');



    } else if (msg.body.startsWith('!subject ')) {
        // Change the group subject
        let chat = await msg.getChat();
        if(chat.isGroup) {
            let newSubject = msg.body.slice(9);
            chat.setSubject(newSubject);
        } else {
            msg.reply('This command can only be used in a group!');
        }
    } else if (msg.body.startsWith('!echo ')) {
        // Replies with the same message
        msg.reply(msg.body.slice(6));
    } else if (msg.body.startsWith('!desc ')) {
        // Change the group description
        let chat = await msg.getChat();
        if(chat.isGroup) {
            let newDescription = msg.body.slice(6);
            chat.setDescription(newDescription);
        } else {
            msg.reply('This command can only be used in a group!');
        }
    } else if (msg.body == '!leave') {
        // Leave the group
        let chat = await msg.getChat();
        if(chat.isGroup) {
            chat.leave();
        } else {
            msg.reply('This command can only be used in a group!');
        }
    } else if(msg.body == '!groupinfo') {
        let chat = await msg.getChat();
        if(chat.isGroup) {
            msg.reply(`
                *Group Details*
                Name: ${chat.name}
                Description: ${chat.description}
                Created At: ${chat.createdAt.toString()}
                Created By: ${chat.owner.user}
                Participant count: ${chat.participants.length}
            `);
        } else {
            msg.reply('This command can only be used in a group!');
        }
    }
});

client.on('disconnected', () => {
    console.log('Client was logged out');
})

