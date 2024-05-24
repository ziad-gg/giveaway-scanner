const { Message } = require('discord.js-selfbot-v13');
const Base = require('./src/base.js');

/**
 * @param {Message} message
 */
module.exports.check = async function (message) {
    await message.edit(`Checking ...`).catch(e => null);

    const channels = (await message.guild.channels.fetch()).filter(channel => channel.isText() && !channel.isVoice());

    message.edit(`Checking ${channels.size} channel`).catch(e => null);
    console.log(`Checking ${channels.size} channel`)

    for (const channel of channels.values()) {
        const messages = await channel.messages.fetch({ limit: 20 }).catch(e => null);
        if (!messages) continue;

        message.edit(`Checking ${messages.size} in ${channel.name}`).catch(e => null);
        console.log(`Checking ${messages.size} in ${channel.name}`);
        
        for (const message of messages.values()) {
            if (!Base.isGiveawayMessage(message)) continue;
            const Type = Base.GiveAwayType(message);

            console.log(Type, ' ', channel.name)

            if (Type == 'Button') {
                const Button = message.components[0].components[0];

                if (!Button.customId) {
                    console.log('Ended GiveAway');
                    continue;
                } else {
                    message.useButton(Button.customId).then(() => {
                        console.log(`Got button ${Button.customId}`);
                    }).catch(() => {
                        console.log(`Got error ${Button.customId}`);
                    });
                };

            } else if (Type == 'Reaction') {
                await Base.wait();
                const msg = await message.channel.messages.fetch(message.id);
                const Reaction = msg.reactions.cache?.keys()?.next()?.value;
                if (Reaction) message.react(Reaction);
            };
        };
    }
}