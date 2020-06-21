import mongoose from 'mongoose';

import Path from '../consts/path';

let connected = false;
const connect = async function () {
    if (!connected) {
        await mongoose.connect(Path.DB, { useNewUrlParser: true, useUnifiedTopology: true });
        connected = true;
    }
}

export default connect;