const mongoose = require('mongoose');

const MenuItem = require('./menuItem');

const Schema = mongoose.Schema;
const MODEL_NAME = 'Order';

const itemSchema = new Schema({
  id: { type: Schema.Types.ObjectId, ref: MenuItem.modelName },
  count: Number,
});

const orderSchema = new Schema({
  items: [itemSchema],
  date: String,
});

module.exports = mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, orderSchema);
