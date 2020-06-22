import mongoose, { Schema, Document, Model } from 'mongoose';

export interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  pwd: string;
}

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  pwd: { type: String, required: true },
});
const modelName = 'User';
const UserModel = mongoose.models[modelName] as Model<User> || mongoose.model<User>(modelName, userSchema);
export default UserModel;
