const { QuickDB } = require('quick.db');

const db = new QuickDB({
    filePath: './src/whitelist'
});

module.exports = db;