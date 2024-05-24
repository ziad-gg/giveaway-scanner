const { Message } = require('discord.js-selfbot-v13');
const database = require('./database');

class Base {
    /**
     * @param {Message} message 
     * @returns {Promise<boolean>} - Returns true if at least 3 giveaway conditions are met
     */
    static async isGiveawayMessage(message) {
        const embed = message.embeds?.[0];

        if (!embed || (message.components[0]?.components.length == 3 && message.author.username.includes('Dyno'))) {
            return false;
        }

        let conditionsMet = 0;

        // Validations
        if (message.content.includes('Review your giveaway')) {
            return false;
        }

        // description
        if (embed.description?.includes('React with')) conditionsMet++;
        if (embed.description?.includes('Winners')) conditionsMet++;
        if (embed.description?.includes('to participate')) conditionsMet++;
        if (embed.description?.includes('button to enter')) conditionsMet++;

        if (embed.description?.toLowerCase().includes('ends')) conditionsMet++;
        if (embed.description?.toLowerCase().includes('hosted by')) conditionsMet++;
        if (embed.description?.toLowerCase()?.includes('time remaining')) conditionsMet++;

        // footer
        if (embed.footer?.text?.toLowerCase?.().includes?.('ends at')) conditionsMet++;
        if (embed.footer?.text?.toLowerCase?.()?.includes('winner')) conditionsMet++;

        // fields 
        if (embed.fields?.find(f => f.name == 'Hosted By')) conditionsMet++;
        if (embed.fields?.find(f => f.name == 'Time Remaining')) conditionsMet++;

        // author
        if (message.author.username.toLowerCase().includes('giveaway')) conditionsMet++;
        if (message.author.bot) conditionsMet++;

        // utils
        if ((await database.get('whitelist')).includes(message.author.id)) conditionsMet++;
        if (message.components?.[0]?.components?.some(b => b.type === 'BUTTON')) conditionsMet++;
        if (embed.url?.includes('dyno.gg')) conditionsMet++;

        console.log(`Total conditions met: ${conditionsMet}\n`);
        console.log('-'.repeat(25))

        return conditionsMet >= 5;
    };


    /**
     * @param {Message} message 
     * @returns {'Button' | 'Reaction' | 'Ended'}
     */
    static GiveAwayType(message) {
        const embed = message.embeds[0];

        if (embed.description?.toLowerCase().includes('winners:')) {
            const winnersRegex = /winners:\s*<@!?(\d+)>/i;
            if (winnersRegex.test(embed.description)) {
                return 'Ended';
            }
        };

        if (message.components?.[0]?.components?.some(b => b.type === 'BUTTON')) return 'Button';
        else return 'Reaction';
    };

    static wait(t = 2000) {
        return new Promise(resolve => setTimeout(resolve, t));
    };
}

module.exports = Base;