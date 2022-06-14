import { Document } from 'mongoose';

export class Users extends Document {
  _id: string;
  email: string;
  name: string;
  age: number;
  description: string;
  owner: boolean;
}
