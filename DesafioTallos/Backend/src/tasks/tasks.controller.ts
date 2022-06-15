import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { TaskService } from './shared/task.service';
import { Task } from './shared/task';
import { InterceptorForClassSerializer } from './shared/interceptor';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { NestResponse } from 'src/core/http/nest-response';
@Controller('tasks')
@SerializeOptions({
  excludePrefixes: ['password'],
})
@UseInterceptors(InterceptorForClassSerializer)
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

  //to do: retorna validação de login de user por email e senha
  @Get(':email')
  public login(@Param('email') email: string): Promise<Task> {
    const usuarioEncontrado = this.taskService.login(email);

    if (!usuarioEncontrado) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Usuário não encontrado.',
      });
    }
    return usuarioEncontrado;
  }

  //rota post, criar user
  @Post()
  async create(@Body() task: Task): Promise<NestResponse> {
    const usuarioCriado = await this.taskService.create(task);
    return new NestResponseBuilder()
      .comStatus(HttpStatus.CREATED)
      .comHeaders({
        Location: `/tasks/${usuarioCriado.email}`,
      })
      .comBody(usuarioCriado)
      .build();
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
