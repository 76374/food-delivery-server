const mongoose = require('mongoose');

const MenuItem = require('./menuItem');

const Schema = mongoose.Schema;
const MODEL_NAME = 'Order';

module.exports =
  mongoose.models[MODEL_NAME] ||
  mongoose.model(
    MODEL_NAME,
    new Schema({
      items: [{ type: Schema.Types.ObjectId, ref: MenuItem.modelName }],
      date: String,
    })
  );
