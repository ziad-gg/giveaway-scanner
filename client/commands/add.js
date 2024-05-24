const { CommandBuilder } = require('handler.djs');
const database = require('../../src/database.js');

CommandBuilder.$N`add`.$M(async (message) => {
    const user = message.mentions.members.at(0);
    if (!user || !user.user.bot) return message.react('❌');

    database.push('whitelist', user.user.id);

    message.react('✅');
});