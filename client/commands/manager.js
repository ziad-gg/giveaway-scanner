const { WebEmbed } = require('discord.js-selfbot-v13');
const { CommandBuilder } = require('handler.djs');
const database = require('../../src/database.js');

CommandBuilder.$N`add`.$M(async (message) => {
    const user = message.mentions.members.at(0);
    if (!user || !user.user.bot) return message.react('❌');

    database.push('whitelist', user.user.id);

    message.react('✅');
});

CommandBuilder.$N`remove`.$M(async (message) => {
    const args = message.content.split(/ +/g);
    if (!args[1]) return message.react('❌');

    database.pull('whitelist', args[1]);

    message.react('✅');
});

CommandBuilder.$N`list`.$M(async (message) => {
    const whitelist = await database.get('whitelist');

    // Calculate the maximum length of mentions to ensure consistent spacing
    const mentions = whitelist.map(id => `<@${id}>`);
    const maxMentionLength = Math.max(mentions.map(id => id.length));

    console.log(maxMentionLength);

    const formattedList = whitelist.map(id => {
        const mention = `<@${id}>`;
        const spaces = ' '.repeat(maxMentionLength);
        return `${mention}${spaces}  \`(${id})\``;
    }).join('\n');

    const embed = new WebEmbed()
        .setColor('RANDOM')
        .setTitle(`Found ${whitelist.length} in the whitelist`)
        .setDescription(formattedList);

    message.reply(formattedList);
});
