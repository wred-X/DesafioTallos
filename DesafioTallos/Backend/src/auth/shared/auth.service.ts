import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Task } from 'src/tasks/shared/task';
import { TaskService } from 'src/tasks/shared/task.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from '../errors/unauthorized.error';
import { UserPayload } from '../models/UserPayload';
import { UserToken } from '../models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly taskService: TaskService // @Inject(forwardRef(() => TaskService)) // private readonly taskService: TaskService
  ) {}

  async login(task: Task): Promise<UserToken> {
    const payload: UserPayload = {
      sub: task._id,
      email: task.email,
      name: task.name,
    };

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
  //   async validateUser(email: string, pass: string): Promise<Task> {
  //     const user = await this.taskService.login(email);
  //     if (user && user.password === pass) {
  //       const { ...result } = user;
  //       return result;
  //     }
  //     return null;
  //   }
}
