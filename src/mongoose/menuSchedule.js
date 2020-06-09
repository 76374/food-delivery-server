const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const modelName = 'MenuSchedule';
module.exports =
  mongoose.models[modelName] ||
  mongoose.model(
    modelName,
    new Schema({
      date: Date,
      categories: [{ type: Schema.Types.ObjectId, ref: 'ScheduleCategory' }],
    })
  );
