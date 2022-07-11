import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/shared/auth.service';
import { Socket } from 'socket.io';
import { parse } from 'cookie';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class ChatService {
  constructor(private readonly authService: AuthService) {}

  async getUserFromSocket(socket: Socket) {
    const cookie = socket.handshake.headers.cookie;
    const { auth: authToken } = parse(cookie);
    const user = await this.authService.getUserFromAuthToken(authToken);
    if (!user) {
      throw new WsException('Invalid credentials.');
    }
    return user;
  }
}
