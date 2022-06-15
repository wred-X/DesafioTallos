// import { Injectable } from '@nestjs/common';
// import { Task } from 'src/tasks/shared/task';
// import { TaskService } from 'src/tasks/shared/task.service';

// @Injectable()
// export class AuthService {
//   constructor(private taskService: TaskService) {}

//   async validateUser(email: string, pass: string): Promise<Task> {
//     const user = await this.taskService.login(email);
//     if (user && user.password === pass) {
//       const { ...result } = user;
//       return result;
//     }
//     return null;
//   }
// }
