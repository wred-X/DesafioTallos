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
import { Task } from './shared/task';
import { InterceptorForClassSerializer } from './shared/interceptor';
import { NestResponseBuilder } from '../core/http/nest-response-builder';
import { NestResponse } from '../core/http/nest-response';
//import { IsPublic } from 'src/auth/decorators/is-public-decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/decorators/is-public-decorator';

@ApiTags('tasks')
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

  //teste current user
  @Get('me')
  getMe(@CurrentUser() task: Task) {
    return this.taskService.getMe(task);
  }

  //rota get, retornando user por id
  @Get(':id')
  async getById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getById(id);
  }

  //rota post, criar user
  @Post()
  async create(@Body() task: Task): Promise<NestResponse> {
    const usuarioCriado = await this.taskService.create(task);
    return new NestResponseBuilder()
      .comStatus(HttpStatus.CREATED)
      .comBody(usuarioCriado)
      .comHeaders({
        Location: `/tasks/${usuarioCriado._id}`,
      })
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
    return this.taskService.delete(id);
  }
}
