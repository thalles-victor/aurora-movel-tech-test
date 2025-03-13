import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './Auth.service';
import { SignUpDto } from './dtos/SignUp.dto';
import { SignInDto } from './dtos/SignIn.dto';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
