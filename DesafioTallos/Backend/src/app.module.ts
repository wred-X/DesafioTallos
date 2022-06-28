import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { FitroDeExcecaoHttp } from './common/filter/filtro-de-excecao-http.filter';
import { InterceptorForClassSerializer } from './tasks/shared/interceptor';
import { TransformInterceptor } from './core/http/transform.interceptor';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AuthModule } from './auth/auth.module';
// import { ChatGateway } from './chat.gateway';

//Definir importação (services no controller ou a partir de ExemploModule dentro de imports)
@Module({
  imports: [
    ConfigModule.forRoot(),
    //UsersModule,
    AuthModule,
    MongooseModule.forRoot(process.env.USER_BD),
    TasksModule,
  ],
  controllers: [],
  providers: [
    // ChatGateway,
    {
      provide: APP_FILTER,
      useClass: FitroDeExcecaoHttp,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: InterceptorForClassSerializer,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
