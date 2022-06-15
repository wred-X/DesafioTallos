import { UsersModule } from './users/users.module';
//import { AuthModule } from './auth/auth.module';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { FitroDeExcecaoHttp } from './common/filter/filtro-de-excecao-http.filter';
import { InterceptorForClassSerializer } from './tasks/shared/interceptor';
import { TransformInterceptor } from './core/http/transform.interceptor';

//Definir importação (services no controller ou a partir de ExemploModule dentro de imports)
@Module({
  imports: [
    ConfigModule.forRoot(),
    //UsersModule,
    //AuthModule,
    MongooseModule.forRoot(process.env.USER_BD),
    TasksModule,
  ],
  controllers: [],
  providers: [
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
  ],
})
export class AppModule {}
