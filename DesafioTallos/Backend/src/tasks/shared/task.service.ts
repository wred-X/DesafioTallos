import { Injectable } from '@nestjs/common';
import { Task } from './task';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

//injeção das tarefas de Service
@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  //pegar todos os users
  async getAll() {
    return await this.taskModel.find().exec();
  }

  //pegar login/user especifico
  //to do: login por email e senha
  async getById(id: string) {
    return await this.taskModel.findById(id).exec();
  }

  //async login(email: string) {
  //  return await this.taskModel.findOne(email).exec();
  //}

  //criar user / singUp
  async create(task: Task) {
    const createdTask = new this.taskModel(task);
    return await createdTask.save();
  }

  //alterar user / inclui alteração de permição!
  async update(id: string, task: Task) {
    await this.taskModel.updateOne({ _id: id }, task).exec();
    return this.getById(id);
  }

  //deletar user
  async delete(id: string) {
    return await this.taskModel.deleteOne({ _id: id }).exec();
  }
}
