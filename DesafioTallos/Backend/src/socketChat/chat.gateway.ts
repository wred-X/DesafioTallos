import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ChatService } from './shared/chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
//export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatService: ChatService,
    private logger: Logger = new Logger('ChatGateway')
  ) {}

  // async handleConnection(socket: Socket) {
  //   await this.chatService.getUserFromSocket(socket);
  // }

  @SubscribeMessage('msgToServer')
  async handleMessage(client: Socket, payload: string): Promise<void> {
    this.server.emit('msgToClient', payload);
  }

  async afterInit(server: Server) {
    await this.logger.log('Init');
  }

  async handleDisconnect(client: Socket) {
    await this.logger.log(`Client disconnected: ${client.id}`);
  }
  async handleConnection(socket: Socket) {
    await this.chatService.getUserFromSocket(socket);
  }

  @SubscribeMessage('send_message')
  async listenForMessages(
    @MessageBody() content: string,
    @ConnectedSocket() socket: Socket
  ) {
    const author = await this.chatService.getUserFromSocket(socket);

    this.server.sockets.emit('receive_message', {
      content,
      author,
    });
  }
}
