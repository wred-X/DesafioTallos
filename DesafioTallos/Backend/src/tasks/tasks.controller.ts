import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './shared/task.service';
import { Task } from './shared/task';

@Controller('tasks')
export class TasksController {
  //constructor com chamada das Tarefas que estão no service
  constructor(private taskService: TaskService) {}

  //async para utilização dos Promise's

  //rota get, retornando todos os users
  @Get()
  async getAll(): Promise<Task[]> {
    return this.taskService.getAll();
  }

  //rota get, retornando user por id
  //to do: retorna validação de login de user por email e senha
  @Get(':id')
  async getById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getById(id);
  }

  //@Get(':email')
  //async login(@Param('email') email: string): Promise<Task> {
  //  return this.taskService.login(email);
  //}

  //rota post, criar user
  @Post()
  async create(@Body() task: Task): Promise<Task> {
    return this.taskService.create(task);
  }

  //rota put, alterar user, incluindo permições
  @Put(':id')
  async update(@Param('id') id: string, @Body() task: Task): Promise<Task> {
    return this.taskService.update(id, task);
  }

  //deletar user
  @Delete(':id')
  async delete(@Param('id') id: string) {
    this.taskService.delete(id);
  }
}
