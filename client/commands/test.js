const { CommandBuilder } = require('handler.djs');
const database = require('../../src/database.js');

CommandBuilder.$N`test`.$M(async (message) => {
    const id = '1243613655367553037';

    const Message = await message.channel.messages.fetch(id);
    if (!Message) return message.react('❌');

    if (!Message.embeds?.[0]) return message.react('❌');

    const embed = Message.embeds[0];

    return console.log(embed)

    console.log('-'.repeat(5).concat(' description ') + '-'.repeat(5));
    console.log('React with: ', embed.description?.includes('React with'))
    console.log('Ends: ', embed.description?.toLowerCase().includes('ends'))
    console.log('to participate: ', embed.description?.includes('to participate'))
    console.log('Hosted by: ', embed.description?.toLowerCase().includes('hosted by'))
    console.log('Time remaining: ', embed.description?.toLowerCase()?.includes('time remaining'))
    // console.log('-'.repeat(15));

    console.log('-'.repeat(5).concat(' footer ') + '-'.repeat(5));
    console.log('ends at: ', embed.footer?.text?.toLowerCase?.().includes?.('ends at'))
    console.log('winner(s): ', embed?.footer?.text?.toLowerCase?.()?.includes('winner(s)'))
    // console.log('-'.repeat(15));

    console.log('-'.repeat(5).concat(' author ') + '-'.repeat(5));
    console.log('username: ', Message.author?.username?.toLowerCase().includes('giveaway'))
    console.log('bot: ', Message.author.bot)
    // console.log('-'.repeat(15));


    console.log('-'.repeat(5).concat(' utils ') + '-'.repeat(5));
    console.log('whitelist: ', (await database.get('whitelist')).includes(Message.author.id))
    console.log('Apollo', Message.author.username.includes('Apollo'))
    console.log('Title', (embed.title && true) ?? false)

});

