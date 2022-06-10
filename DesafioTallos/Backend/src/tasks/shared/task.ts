/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export class Task extends Document {
  _id: string;
  description: string;
  completed: boolean;
}
