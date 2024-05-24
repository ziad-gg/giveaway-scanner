const { CommandBuilder } = require('handler.djs');
const database = require('../../src/database.js');

CommandBuilder.$N`test`.$M(async (message) => {
    const args = message.content.slice(1).split('');
    args.shift();
    if (!args[0]) return message.react('❌');

    const Message = await message.channel.messages.fetch(args[0]).catch(e => null);
    if (!Message) return message.react('❌');


});

