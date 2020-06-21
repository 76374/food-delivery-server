import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const modelName = 'MenuCategory';
export default
  mongoose.models[modelName] ||
  mongoose.model(
    modelName,
    new Schema({
      title: { type: String, required: true },
      items: [{ type: Schema.Types.ObjectId, ref: 'MenuItem' }],
    })
  );
