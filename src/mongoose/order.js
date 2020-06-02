const mongoose = require('mongoose');

const MenuItem = require('./menuItem');
const User = require('./user');

const Schema = mongoose.Schema;
const MODEL_NAME = 'Order';

const itemSchema = new Schema({
  menuItem: { type: Schema.Types.ObjectId, ref: MenuItem.modelName, required: true },
  count: { type: Number, required: true },
});

const orderSchema = new Schema({
  items: { type: [itemSchema], required: true },
  date: { type: Date, required: true },
  price: { type: Number, required: true },
  owner: { type: Schema.Types.ObjectId, ref: User.modelName, required: true }
});

module.exports = mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, orderSchema);
