import mongoose, { Document, Schema, Model } from 'mongoose';

import { MenuItem } from './MenuItemModel';
import { User } from './UserModel';

export interface Order extends Document {
  items: OrderItem[];
  date: Date;
  price: number;
  owner: User['_id'];
}

export interface OrderItem {
  menuItem: MenuItem['_id'];
  count: number;
}

const orderSchema = new Schema({
  items: [
    {
      menuItem: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true },
      count: { type: Number, required: true },
    },
  ],
  date: { type: Date, required: true },
  price: { type: Number, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const modelName = 'Order';
const OrderModel =
  (mongoose.models[modelName] as Model<Order>) || mongoose.model<Order>(modelName, orderSchema);
export default OrderModel;
