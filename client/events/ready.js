const { EventBuilder } = require('handler.djs');

EventBuilder.$N`ready`.$E(Execution).$L().$O();

function Execution(client) {
    console.log(`Client Is Ready (${client.user.tag})`);
};