import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { TaskService } from './shared/task.service';
import { TasksController } from './tasks.controller';
import { TaskSchema } from './schemas/task.schema';

//Para colocar dentro de imports do app.module, definindo aqui o controller e o provider
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }])],
  controllers: [TasksController],
  providers: [TaskService],
})
export class TasksModule {}
