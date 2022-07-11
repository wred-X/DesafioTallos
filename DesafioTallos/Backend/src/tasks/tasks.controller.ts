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
  Inject,
  forwardRef,
} from '@nestjs/common';
import { TaskService } from './shared/task.service';
import { TaskGateway } from './shared/task.gateway';
import { Task } from './shared/task';
import { InterceptorForClassSerializer } from './shared/interceptor';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { NestResponse } from 'src/core/http/nest-response';
import { IsPublic } from 'src/auth/decorators/is-public-decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { MessagesGateway } from 'src/messages/messages.gateway';
@Controller('tasks')
@SerializeOptions({
  excludePrefixes: ['password'],
})
@UseInterceptors(InterceptorForClassSerializer)
export class TasksController {
  //constructor com chamada das Tarefas que estão no service
  constructor(
    private taskService: TaskService,
    private taskGateway: TaskGateway
  ) {}

  //async para utilização dos Promise's

  //rota get, retornando todos os users
  @IsPublic()
  @Get()
  async getAll(): Promise<Task[]> {
    return this.taskService.getAll();
  }

  //teste current user
  @Get('me')
  getMe(@CurrentUser() task: Task) {
    return task;
  }

  //rota get, retornando user por id
  //to do: retorna validação de login de user por email e senha
  @IsPublic()
  @Get(':id')
  async getById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getById(id);
  }

  //rota post, criar user
  @IsPublic()
  @Post()
  async create(@Body() task: Task): Promise<NestResponse> {
    const usuarioCriado = await this.taskService.create(task);
    return new NestResponseBuilder()
      .comStatus(HttpStatus.CREATED)
      .comHeaders({
        Location: `/tasks/${usuarioCriado._id}`,
      })
      .comBody(usuarioCriado)
      .build();
  }

  //rota put, alterar user, incluindo permições
  @IsPublic()
  @Put(':id')
  async update(@Param('id') id: string, @Body() task: Task): Promise<Task> {
    return this.taskService.update(id, task);
  }

  //deletar user
  @IsPublic()
  @Delete(':id')
  async delete(@Param('id') id: string) {
    this.taskService.delete(id);
  }
}
