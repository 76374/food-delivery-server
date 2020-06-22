import mongoose, { Document, Schema, Model } from 'mongoose';
import { MenuItem } from './MenuItemModel';

export interface MenuCategory extends Document {
  title: string;
  items: MenuItem['_id'][];
}

const schema = new Schema({
  title: { type: String, required: true },
  items: [{ type: Schema.Types.ObjectId, ref: 'MenuItem' }],
});

const modelName = 'MenuCategory';
const MenuCategoryModel =
  (mongoose.models[modelName] as Model<MenuCategory>) ||
  mongoose.model<MenuCategory>(modelName, schema);
export default MenuCategoryModel;
