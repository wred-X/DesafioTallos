import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
  email: String,
  name: String,
  age: Number,
  description: String,
  owner: Boolean,
});

//Definição de schema
