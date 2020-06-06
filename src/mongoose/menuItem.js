const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const MODEL_NAME = 'MenuItem';

module.exports =
  mongoose.models[MODEL_NAME] ||
  mongoose.model(
    MODEL_NAME,
    new Schema({
      title: { type: String, required: true },
      price: { type: Number, required: true },
      category: { type: Schema.Types.ObjectId, ref: 'MenuCategory' },
    })
  );
