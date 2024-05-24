const { Client } = require('discord.js-selfbot-v13');

const Base = require('./src/base.js');
const { check } = require('./commands.js');

const client = new Client();

client.once('ready', () => {
    console.log(`Client Is Ready (${client.user.tag})`);
});

client.on('messageCreate', async (message) => {
    if (Base.isGiveawayMessage(message)) {
        const Type = Base.GiveAwayType(message);

        if (Type == 'Button') {
            const Button = message.components[0].components[0];

            message.useButton(Button.customId).then(() => {
                console.log(`Got button ${Button.customId}`);
            }).catch(() => {
                console.log(`Got error ${Button.customId}`);
            });

        } else if (Type == 'Reaction') {
            await Base.wait();
            const msg = await message.channel.messages.fetch(message.id);
            const Reaction = msg.reactions.cache?.keys()?.next()?.value;
            if (Reaction) message.react(Reaction);
        };
    };

    if (message.content == '!check' && message.author.id == client.user.id) check(message);
});

require('./src/Monitor.js');
require('dotenv').config();
require('addons.djs');

client.login(process.env.TOKEN);
