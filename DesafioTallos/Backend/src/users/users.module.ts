import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UsersService } from './shared/users.service';
import { UsersController } from './users.controller';
import { UserSchema } from './schemas/users.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
