const { WebEmbed } = require('discord.js-selfbot-v13');
const { CommandBuilder } = require('handler.djs');

CommandBuilder.$N`uptime`.$M(Execution)

CommandBuilder.$N`ping` .$M(PingExecution)

const startTime = Date.now();

const env = process.env.RAILWAY_ENVIRONMENT_NAME || 'building';

function Execution(message) {
    const currentTime = Date.now();
    const uptime = currentTime - startTime;
    const uptimeString = formatUptime(uptime);

    const embed = new WebEmbed()
        .setColor('#0099ff')
        .setTitle('Bot Uptime')
        .setDescription(`🕒 Uptime: ${uptimeString} ${env}`)

    message.reply(`${WebEmbed.hiddenEmbed}${embed}`);
}

function PingExecution(message) {
    const embed = new WebEmbed()
        .setColor('#00ff00')
        .setTitle('Ping')
        .setDescription(`🏓 Pong! Latency is ${Date.now() - message.createdTimestamp}ms ${env}.`)

    message.reply(`${WebEmbed.hiddenEmbed}${embed}`);
}

/**
 * @param {number} uptime 
 * @returns {string}
 */
function formatUptime(uptime) {
    const seconds = Math.floor((uptime / 1000) % 60);
    const minutes = Math.floor((uptime / (1000 * 60)) % 60);
    const hours = Math.floor((uptime / (1000 * 60 * 60)) % 24);
    const days = Math.floor(uptime / (1000 * 60 * 60 * 24));

    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
};