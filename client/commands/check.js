const { CommandBuilder } = require('handler.djs');
const Base = require('../../src/base.js');

CommandBuilder.$N`check`.$M(async (message) => {
    // await message.edit(`Checking ...`).catch(e => null);

    const channels = (await message.guild.channels.fetch()).filter(channel => channel.isText() && !channel.isVoice());

    // message.edit(`Checking ${channels.size} channel`).catch(e => null);
    console.log(`Checking ${channels.size} channel`)

    let joinded = 0;

    for (const channel of channels.values()) {
        const messages = await channel.messages.fetch({ limit: 20 }).catch(e => null);
        if (!messages) continue;

        // message.edit(`Checking ${messages.size} in ${channel.name}`).catch(e => null);
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
                    message.useButton(Button.customId).then(async () => {
                        console.log(`Got button ${Button.customId}`);
                        joinded++;
                        if (process.env.LOG_CHANNEL) {
                            const channel = await message.client.channels.fetch(process.env.LOG_CHANNEL).catch(e => null);
                            if (channel) channel.send(`> **Joined A [giveaway](https://discord.com/channels/${message.guildId}/${message.channelId}/${message.id}) 🎉🎉 (${Type})**`);
                        };
                    }).catch(() => {
                        console.log(`Got error ${Button.customId}`);
                    });
                };

            } else if (Type == 'Reaction') {
                await Base.wait();
                const msg = await message.channel.messages.fetch(message.id);
                const Reaction = msg.reactions.cache?.keys()?.next()?.value;
                if (Reaction) message.react(Reaction);

                msg.reactions?.cache?.values().next()?.value?.me && (!msg.reactions?.cache?.values().next()?.value?.me && joinded++);

                if (process.env.LOG_CHANNEL) {
                    const channel = await message.client.channels.fetch(process.env.LOG_CHANNEL).catch(e => null);
                    if (channel) channel.send(`> **Joined A [giveaway](https://discord.com/channels/${message.guildId}/${message.channelId}/${message.id}) 🎉🎉 (${Type})**`);
                };
            };
        };

        // message.edit(`Joined New ${joinded} giveaway`).catch(e => null);
        console.log(`Joined New ${joinded} giveaway`)
        console.log(`-`.repeat(25));

    }
});