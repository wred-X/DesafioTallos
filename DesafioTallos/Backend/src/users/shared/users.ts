import { Document } from 'mongoose';

export class Users extends Document {
  _id: string;
  email: string;
  name: string;
  age: string;
  description: string;
  owner: boolean;
}
