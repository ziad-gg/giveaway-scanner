const { Message } = require('discord.js-selfbot-v13');

class Base {
    /**
     * @param {Message} message 
     * @returns {boolean} - Returns true if at least 3 giveaway conditions are met
     */
    static isGiveawayMessage(message) {
        const embed = message.embeds?.[0];
        if (!embed) return false;

        let conditionsMet = 0;

        // Validations
        if (message.content.includes('Review your giveaway')) return false;

        // content Check
        if (message.content.toUpperCase().includes('GIVEAWAY')) conditionsMet++;

        // title Check
        if (embed.title) conditionsMet++;

        // description Check
        if (embed.description?.toLowerCase().includes('ends') || embed.description?.toLowerCase().includes('hosted by')) conditionsMet++;

        // footer Check
        if (embed.footer?.text?.toLowerCase().includes('ends at')) conditionsMet++;

        // button Check
        if (message.components?.[0]?.components?.some(b => b.type === 'BUTTON')) conditionsMet++;

        // username Check
        if (message.author?.username?.toLowerCase().includes('giveaway')) conditionsMet++;

        return conditionsMet >= 3;
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