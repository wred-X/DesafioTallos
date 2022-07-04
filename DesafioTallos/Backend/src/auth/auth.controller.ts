import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
  SerializeOptions,
} from '@nestjs/common';
import { AuthService } from './shared/auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public-decorator';
import { InterceptorForClassSerializer } from 'src/tasks/shared/interceptor';

@Controller()
@SerializeOptions({
  excludePrefixes: ['password'],
})
@UseInterceptors(InterceptorForClassSerializer)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }
}
