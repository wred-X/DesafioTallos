import { AuthService } from './shared/auth.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [AuthService],
})
export class AuthModule {}
