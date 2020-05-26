const mongoose = require('mongoose');

const { DB } = require('../consts/path');

let connected = false;
const connect = async function () {
    if (!connected) {
        await mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true });
        connected = true;
    }
}

module.exports = connect;