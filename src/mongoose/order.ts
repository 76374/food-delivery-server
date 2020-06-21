import mongoose from 'mongoose';

import MenuItem from './menuItem';
import User from './user';

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  menuItem: { type: Schema.Types.ObjectId, ref: MenuItem.modelName, required: true },
  count: { type: Number, required: true },
});

const orderSchema = new Schema({
  items: { type: [itemSchema], required: true },
  date: { type: Date, required: true },
  price: { type: Number, required: true },
  owner: { type: Schema.Types.ObjectId, ref: User.modelName, required: true },
});

const modelName = 'Order';
export default mongoose.models[modelName] || mongoose.model(modelName, orderSchema);
