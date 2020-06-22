import mongoose, { Schema, Document, Model } from 'mongoose';
import { MenuCategory } from './MenuCategoryModel';

export interface MenuItem extends Document {
  title: string;
  price: number;
  category: MenuCategory['_id'];
}

const schema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'MenuCategory' },
});
const modelName = 'MenuItem';
const MenuItemModel =
  (mongoose.models[modelName] as Model<MenuItem>) || mongoose.model<MenuItem>(modelName, schema);
export default MenuItemModel;
