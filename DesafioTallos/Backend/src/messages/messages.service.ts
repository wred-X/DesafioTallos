import { Injectable, Inject } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Task } from '../tasks/shared/task';
import { Message } from './entities/message.entity';
import { Log } from './entities/log.entity';
import { use } from 'passport';
import { TaskService } from '../tasks/shared/task.service';
import { CreateLogDto } from './dto/create-log.dto';

@Injectable()
export class MessagesService {
  constructor(private taskService: TaskService) {}
  task: Task[];
  messages: Message[] = [{ name: 'Wesley', text: 'oiii' }];
  log: Log[] = [{ _id: '1' }];
  clientToUser = {};

  indentify(name: string, clientId: string) {
    this.clientToUser[clientId] = name;

    return Object.values(this.clientToUser);
  }

  findMe(clientId: string) {
    //console.log(clientId);
    return this.clientToUser[clientId];
  }

  getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }

  create(createMessageDto: CreateMessageDto, clientId: string) {
    const message = {
      name: this.clientToUser[clientId],
      text: createMessageDto.text,
    };
    this.messages.push(message);

    return message;
  }

  async getUser() {
    return this.taskService.getAll();
  }

  async getById(id) {
    return this.taskService.getById(id);
  }

  async findAll() {
    return await this.task;
    //return this.messages;
  }
}
