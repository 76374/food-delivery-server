import mongoose, { Schema, Document, Model } from 'mongoose';
import { SheduleCategory } from './sheduleCategory';

export interface MenuSchedule extends Document {
  date: Date;
  categories: SheduleCategory['_id'][];
}

const schema = new Schema({
  date: Date,
  categories: [{ type: Schema.Types.ObjectId, ref: 'ScheduleCategory' }],
});
const modelName = 'MenuSchedule';
const MenuScheduleModel =
  (mongoose.models[modelName] as Model<MenuSchedule>) ||
  mongoose.model<MenuSchedule>(modelName, schema);
export default MenuScheduleModel;
