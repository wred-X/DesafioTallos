import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: String,
  name: String,
  age: String,
  description: String,
  owner: Boolean,
});
