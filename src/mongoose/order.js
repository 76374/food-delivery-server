const mongoose = require('mongoose');

const MenuItem = require('./menuItem');

const Schema = mongoose.Schema;
const MODEL_NAME = 'Order';

const itemSchema = new Schema({
  menuItem: { type: Schema.Types.ObjectId, ref: MenuItem.modelName },
  count: Number,
});

const orderSchema = new Schema({
  items: { type: [itemSchema], required: true },
  date: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, orderSchema);
