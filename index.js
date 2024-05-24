const { Client } = require('discord.js-selfbot-v13');
const { Application } = require('handler.djs');

const client = new Client();

new Application(client, {
    events: __dirname.concat('/client/events'),
    commands: __dirname.concat('/client/commands'),
    validations: __dirname.concat('/client/validations'),
});

client.Application.build();

require('./src/Monitor.js');
require('dotenv').config();
require('addons.djs');

client.login(process.env.TOKEN);
