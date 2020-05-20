const mongoose = require('mongoose');

const MenuItem = require('./menuItem');

const Schema = mongoose.Schema;
const MODEL_NAME = 'MenuCategory';

module.exports =
  mongoose.models[MODEL_NAME] ||
  mongoose.model(
    MODEL_NAME,
    new Schema({
      title: {
        type: String,
        required: true,
      },
      items: [{ type: Schema.Types.ObjectId, ref: MenuItem.modelName }],
    })
  );
