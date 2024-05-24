const { ValidationBuilder } = require('handler.djs');

ValidationBuilder.$E((controller, next, end) => {

    if (controller.message.author.id !== controller.message.client.user.id) end();
    else next();

}).$O(1).$end();