import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const modelName = 'MenuSchedule';
export default mongoose.models[modelName] ||
  mongoose.model(
    modelName,
    new Schema({
      date: Date,
      categories: [{ type: Schema.Types.ObjectId, ref: 'ScheduleCategory' }],
    })
  );
