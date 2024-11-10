import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';

type BodySignIn = {
  email: string;
  password: string;
};

@Controller('auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() body: BodySignIn) {
    return this.authService.signIn(body);
  }
}
