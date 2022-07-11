import {
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { AuthService } from './shared/auth.service';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AuthGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly authService: AuthService) {}

  sendToAll(msg: string) {
    this.server.emit('alertToClient', { type: 'Alert', message: msg });
  }
}
