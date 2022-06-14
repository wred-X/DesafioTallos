import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/shared/users.service';
import { ConfigModule } from '@nestjs/config';

//Definir importação (services no controller ou a partir de ExemploModule dentro de imports)
@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(process.env.USER_BD),
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
