const { Message } = require('discord.js-selfbot-v13');

class Base {
    /**
     * @param {Message} message 
     * @returns {boolean} - Returns true if at least 3 giveaway conditions are met
     */
    static isGiveawayMessage(message) {
        const embed = message.embeds?.[0];
        let conditionsMet = 0;

        const logCondition = (condition, description) => {
            if (condition) {
                // console.log(`${description} - passed.\n`);
                conditionsMet++;
            } else {
                // console.log(`${description} - failed.\n`);
            }
        };

        if (!embed) {
            // console.log('No embed found.\n');
            return false;
        }

        if (message.content.includes('Review your giveaway')) {
            console.log('Validation failed: "Review your giveaway" found.\n');
            return false;
        }

        // Content Check
        logCondition(
            message.content.toLowerCase().includes('giveaway'),
            'Content check: "giveaway" found in message content'
        );

        // Title Check
        logCondition(
            embed.title && embed.title.toLowerCase().includes('giveaway'),
            'Title check: "giveaway" found in embed title'
        );

        // Description Check
        logCondition(
            embed.description?.toLowerCase().includes('ends') || embed.description?.toLowerCase().includes('hosted by'),
            'Description check: "ends" or "hosted by" found in embed description'
        );

        // Footer Check
        logCondition(
            embed.footer?.text?.toLowerCase().includes('ends at'),
            'Footer check: "ends at" found in embed footer'
        );

        // Button Check
        logCondition(
            message.components?.[0]?.components?.some(b => b.type === 'BUTTON'),
            'Button check: Button found in message components'
        );

        // Username Check for "giveaway" and bot
        logCondition(
            message.author?.username?.toLowerCase().includes('giveaway') && message.author.bot,
            'Username check: "giveaway" found in author username and author is a bot'
        );

        // Username Check for "apollo"
        logCondition(
            message.author.username.toLowerCase().includes('apollo'),
            'Username check: "apollo" found in author username'
        );

        console.log(`Total conditions met: ${conditionsMet}\n`);

        return conditionsMet >= 4;
    }


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