import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const MODEL_NAME = 'User';

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  pwd: { type: String, required: true },
});

export default mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, userSchema);
