import * as mongoose from 'mongoose';
import { Task } from '../shared/task';

export const TaskSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  age: Number,
  description: String,
  owner: Boolean,
});

export type TaskDocument = Task & mongoose.Document;

//Definição de schema
