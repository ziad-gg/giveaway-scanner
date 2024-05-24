const { Message } = require('discord.js-selfbot-v13');
const { EventBuilder } = require('handler.djs');
const Base = require('../../src/base');

EventBuilder.$N`messageCreate`.$E(Execution).$L();

/**
 * @param {Message} message 
 */
async function Execution(message) {
    if (await Base.isGiveawayMessage(message)) {
        const Type = Base.GiveAwayType(message);

        if (Type == 'Button') {
            const Button = message.components[0].components[0];

            message.useButton(Button.customId).then(async () => {
                console.log(`Got button ${Button.customId}`);
                if (process.env.LOG_CHANNEL) {
                    const channel = await message.client.channels.fetch(process.env.LOG_CHANNEL).catch(e => null);
                    if (channel) channel.send(`> **Joined A [giveaway](https://discord.com/channels/${message.guildId}/${message.channelId}/${message.id}) 🎉🎉 (${Type})**`);
                };
            }).catch(() => {
                console.log(`Got error ${Button.customId}`);
            });

        } else if (Type == 'Reaction') {
            await Base.wait();
            const msg = await message.channel.messages.fetch(message.id);
            const Reaction = msg.reactions.cache?.keys()?.next()?.value;
            
            if (Reaction) message.react(Reaction);
            
            if (process.env.LOG_CHANNEL) {
                const channel = await message.client.channels.fetch(process.env.LOG_CHANNEL).catch(e => null);
                if (channel) channel.send(`> **Joined A [giveaway](https://discord.com/channels/${message.guildId}/${message.channelId}/${message.id}) 🎉🎉 (${Type})**`);
            };
        };
    };

};