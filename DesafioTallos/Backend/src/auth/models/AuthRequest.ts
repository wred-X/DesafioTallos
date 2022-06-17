import { Request } from 'express';
import { Task } from 'src/tasks/shared/task';

export interface AuthRequest extends Request {
  user: Task;
}
