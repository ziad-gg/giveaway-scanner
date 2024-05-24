const { Message } = require('discord.js-selfbot-v13');
const database = require('./database');

class Base {
    /**
     * @param {Message} message 
     * @returns {Promise<boolean>} - Returns true if at least 3 giveaway conditions are met
     */
    static async isGiveawayMessage(message) {
        const embed = message.embeds?.[0];

        if (!embed) {
            return false;
        }


        let conditionsMet = 0;

        // Validations
        if (message.content.includes('Review your giveaway')) {
            // console.log('Validation failed: "Review your giveaway" found.\n');
            return false;
        }

        // content Check
        if (message.content.toLowerCase().includes('giveaway')) {
            // console.log('Content check passed: "giveaway" found in message content.\n');
            conditionsMet++;
        }

        // title Check
        if (embed.title) {
            // console.log('Title check passed: Title found in embed.\n');
            conditionsMet++;
        }

        // description Check
        if (embed.description 
            && embed.description?.toLowerCase().includes('ends')
            || embed.description?.toLowerCase()?.includes('time remaining')
            || embed.description?.toLowerCase().includes('hosted by')
            || embed.description?.includes('React with')
            || embed.description.includes('to participate!')
        ) {
            // console.log('Description check passed: "ends" or "hosted by" found in embed description.\n');
            conditionsMet++;
        }

        if (embed.fields.find(f => f.name === 'Time Remaining')) {
            conditionsMet++;
        }

        if (embed.fields.find(f => f.name === 'Hosted By')) {
            conditionsMet++;
        }

        // footer Check
        if (embed.footer?.text?.toLowerCase?.().includes?.('ends at') || embed?.footer?.text?.toLowerCase?.()?.includes('winner(s)')) {
            // console.log('Footer check passed: "ends at" found in embed footer.\n');
            conditionsMet++;
        }

        // button Check
        if (message.components?.[0]?.components?.some(b => b.type === 'BUTTON')) {
            // console.log('Button check passed: Button found in message components.\n');
            conditionsMet++;
        }

        // username Check
        if (message.author?.username?.toLowerCase().includes('giveaway') && message.author.bot) {
            // console.log('Username check passed: "giveaway" found in author username and author is a bot.\n');
            conditionsMet++;
        }

        if (message.author.username.includes('Apollo')) {
            // console.log('Username check passed: "apollo" found in author username.\n');
            conditionsMet++;
        }

        if ((await database.get('whitelist')).includes(message.author.id)) {
            conditionsMet++;
        }

        console.log(`Total conditions met: ${conditionsMet}\n`);

        console.log('-'.repeat(25))

        // if (conditionsMet >= 4) console.log(message)
        return conditionsMet >= 4;
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