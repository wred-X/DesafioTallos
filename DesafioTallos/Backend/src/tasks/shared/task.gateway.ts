import {
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Body, SerializeOptions, UseInterceptors } from '@nestjs/common';
import { InterceptorForClassSerializer } from './interceptor';
import { InjectModel } from '@nestjs/mongoose';
import { TaskService } from './task.service';
import { Model } from 'mongoose';
import { Socket, Server } from 'socket.io';
import { NestResponse } from 'src/core/http/nest-response';
import { Task } from './task';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@SerializeOptions({
  excludePrefixes: ['password'],
})
@UseInterceptors(InterceptorForClassSerializer)
export class TaskGateway {
  @WebSocketServer() server: Server;

  constructor(private taskService: TaskService) {}

  async getCreate(): Promise<Task[]> {
    await this.server.emit('getCreate', this.taskService.getAll());
    //await console.log(this.taskService.getAll(), 'novo user');
    return this.taskService.getAll();
  }
  //@Get()
  //async getAll(): Promise<Task[]> {
  //  return this.taskService.getAll();
  //};
  // }
}
