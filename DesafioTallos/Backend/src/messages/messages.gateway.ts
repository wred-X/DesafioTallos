import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Socket, Server } from 'socket.io';
import { Task } from '../tasks/shared/task';
import { ApiTags } from '@nestjs/swagger';
import { CreateLogDto } from './dto/create-log.dto';

@ApiTags('messages')
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  async create(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket
  ) {
    const message = await this.messagesService.create(
      createMessageDto,
      client.id
    );

    this.server.emit('message', message);

    return message;
  }

  @SubscribeMessage('newUsers')
  async getUser(): Promise<Task[]> {
    const newUser = await this.messagesService.getUser();
    await this.server.emit('task', newUser);
    return newUser;
  }

  @SubscribeMessage('userLog')
  async newLog(
    @MessageBody('name') name: string,
    @MessageBody('_id') _id: string,
    @ConnectedSocket() client: Socket
  ) {
    await this.messagesService.indentify(name, client.id);
    //const login = await this.messagesService.getById(_id);
    this.server.emit('userLog', { name, _id });
    //this.server.emit('idLog', _id);
    return name && _id;
  }

  @SubscribeMessage('join')
  joinRoom(
    @MessageBody('name') name: string,
    @ConnectedSocket() client: Socket
  ) {
    return this.messagesService.indentify(name, client.id);
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody('isTyping') isTyping: boolean,
    @ConnectedSocket() client: Socket
  ) {
    const name = await this.messagesService.getClientName(client.id);

    client.broadcast.emit('typing', { name, isTyping });
  }
}
