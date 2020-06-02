const mongoose = require('mongoose');

const MenuItem = require('./menuItem');

const MODEL_NAME = 'MenuSchedule';
const Schema = mongoose.Schema;

module.exports =
  mongoose.models[MODEL_NAME] ||
  mongoose.model(
    MODEL_NAME,
    new Schema({
      date: Date,
      items: [{ type: Schema.Types.ObjectId, ref: MenuItem.modelName }],
    })
  );
