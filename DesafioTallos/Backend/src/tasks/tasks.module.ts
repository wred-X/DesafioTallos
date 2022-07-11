import { MongooseModule } from '@nestjs/mongoose';
import { forwardRef, Module } from '@nestjs/common';
import { TaskService } from './shared/task.service';
import { TasksController } from './tasks.controller';
import { TaskSchema } from './schemas/task.schema';
import { IsSameEmailConstraint } from './shared/validator.decorator';
import { AuthModule } from 'src/auth/auth.module';
import { TaskGateway } from './shared/task.gateway';
import { MessagesModule } from 'src/messages/messages.module';

//Para colocar dentro de imports do app.module, definindo aqui o controller e o provider
@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => MessagesModule),
    MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),
  ],
  controllers: [TasksController],
  providers: [
    TaskService,
    IsSameEmailConstraint,
    TaskGateway,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
  exports: [TaskService],
})
export class TasksModule {}
