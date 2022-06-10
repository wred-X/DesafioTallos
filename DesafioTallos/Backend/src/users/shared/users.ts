/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export class Users extends Document {
  _id: string;
  email: string;
  owner: boolean;
}
