import { MongooseModule } from '@nestjs/mongoose';
import { forwardRef, Module } from '@nestjs/common';
import { ChatService } from './shared/chat.service';
import { AuthModule } from 'src/auth/auth.module';
import { ChatGateway } from './chat.gateway';

//Para colocar dentro de imports do app.module, definindo aqui o controller e o provider
@Module({
  imports: [],
  controllers: [],
  providers: [ChatService, AuthModule, ChatGateway],
  exports: [ChatService],
})
export class ChatModule {}
