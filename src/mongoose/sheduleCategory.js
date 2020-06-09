const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const modelName = 'ScheduleCategory';
module.exports =
  mongoose.models[modelName] ||
  mongoose.model(
    modelName,
    new Schema({
      schedule: { type: Schema.Types.ObjectId, ref: 'MenuSchedule', required: true },
      category: { type: Schema.Types.ObjectId, ref: 'MenuCategory', required: true },
      items: [{ type: Schema.Types.ObjectId, ref: 'MenuItem', required: true }],
    })
  );
