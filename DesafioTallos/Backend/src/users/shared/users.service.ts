/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Users } from './users';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly usersModel: Model<Users>
  ) {}

  async getAll() {
    return await this.usersModel.find().exec();
  }

  async getById(id: string) {
    return await this.usersModel.findById(id).exec();
  }

  async create(users: Users) {
    const createdUsers = new this.usersModel(Users);
    return await createdUsers.save();
  }

  async update(id: string, users: Users) {
    await this.usersModel.updateOne({ _id: id }, users).exec();
    return this.getById(id);
  }

  async delete(id: string) {
    return await this.usersModel.deleteOne({ _id: id }).exec();
  }
}
