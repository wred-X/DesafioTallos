import { Injectable } from '@nestjs/common';
import { Task } from '../../tasks/shared/task';
import { TaskService } from '../../tasks/shared/task.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from '../errors/unauthorized.error';
import { UserPayload } from '../models/UserPayload';
import { UserToken } from '../models/UserToken';
import { ConfigService } from '@nestjs/config';
import { Server } from 'socket.io';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
//import { MessagesService } from '../../messages/messages.service';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class AuthService {
  @WebSocketServer()
  server: Server;
  constructor(
    //private readonly messagesService: MessagesService,
    private readonly jwtService: JwtService,
    private readonly taskService: TaskService, // @Inject(forwardRef(() => TaskService)) // private readonly taskService: TaskService
    private readonly configService: ConfigService
  ) {}

  async login(task: Task): Promise<UserToken> {
    const payload: UserPayload = {
      sub: task._id,
      email: task.email,
      name: task.name,
      age: task.age,
      description: task.description,
      owner: task.owner,
    };
    this.server.emit('user-login', payload.sub, () => {
      return;
    });
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<Task> {
    const user = await this.taskService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return await user;
      }
    }

    throw new UnauthorizedError(
      'Endereço de email ou password estão incorretos.'
    );
  }

  public async getUserFromAuthToken(token: string) {
    const payload: UserPayload = this.jwtService.verify(token, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });
    if (payload.sub) {
      return this.taskService.getById(payload.sub);
    }
  }
}
