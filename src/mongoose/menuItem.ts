import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const modelName = 'MenuItem';
export default mongoose.models[modelName] ||
  mongoose.model(
    modelName,
    new Schema({
      title: { type: String, required: true },
      price: { type: Number, required: true },
      category: { type: Schema.Types.ObjectId, ref: 'MenuCategory' },
    })
  );
