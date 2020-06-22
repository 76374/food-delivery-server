import mongoose, { Schema, Document, Model } from 'mongoose';
import { MenuSchedule } from './MenuScheduleModel';
import { MenuCategory } from './MenuCategoryModel';
import { MenuItem } from './MenuItemModel';

export interface SheduleCategory extends Document {
  schedule: MenuSchedule['_id'];
  category: MenuCategory['_id'];
  items: MenuItem['_id'][];
}

const schema = new Schema({
  schedule: { type: Schema.Types.ObjectId, ref: 'MenuSchedule', required: true },
  category: { type: Schema.Types.ObjectId, ref: 'MenuCategory', required: true },
  items: [{ type: Schema.Types.ObjectId, ref: 'MenuItem', required: true }],
});
const modelName = 'ScheduleCategory';
const SheduleCategoryModel =
  (mongoose.models[modelName] as Model<SheduleCategory>) ||
  mongoose.model<SheduleCategory>(modelName, schema);
export default SheduleCategoryModel;
