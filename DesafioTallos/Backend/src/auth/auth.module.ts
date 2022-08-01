import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TasksModule } from 'src/tasks/tasks.module';
import { AuthController } from './auth.controller';
import { AuthService } from './shared/auth.service';
import { ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';
import { LoginValidationMiddleware } from './middlewares/login-validation.middleware';
import { AuthGateway } from './auth.gateway';
import { JwtStrategy } from './strategies/jwt.strategy';
// import { MessagesModule } from 'src/messages/messages.module';
// import { MessagesService } from 'src/messages/messages.service';
require('dotenv').config();

@Module({
  imports: [
    forwardRef(() => TasksModule),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthGateway,
    LocalStrategy,
    ConfigService,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login');
  }
}
