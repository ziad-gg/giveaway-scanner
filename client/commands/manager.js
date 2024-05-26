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

    const formattedList = whitelist.map(id => {
        const mention = `<@${id}>`;
        return `${mention} \`(${id})\``;
    }).join('\n');

    message.reply(formattedList);
});
