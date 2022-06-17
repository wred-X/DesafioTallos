import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Task } from 'src/tasks/shared/task';
import { AuthRequest } from '../models/AuthRequest';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): Task => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  }
);
