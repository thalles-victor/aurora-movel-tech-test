import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './Auth.service';
import { SignUpDto } from './dtos/SignUp.dto';
import { SignInDto } from './dtos/SignIn.dto';
import { CreateAdminDto } from './dtos/CreateAdmin.dto';
import { JwtAuthGuard, RoleGuard } from 'src/@shared/guards';
import { RolesDecorator } from 'src/@shared/decorators';
import { ROLE } from 'src/@shared/metadata';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthResponse } from './dtos/Auth.response';
import { UserEntity } from 'src/Application/Entities/User.entity';

@ApiTags('auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @ApiOkResponse({
    type: AuthResponse,
  })
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('sign-in')
  @ApiOkResponse({
    type: AuthResponse,
  })
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @RolesDecorator(ROLE.ROOT)
  @ApiBearerAuth('jwt')
  @ApiOkResponse({ type: UserEntity })
  createAdmin(@Body() adminDto: CreateAdminDto) {
    return this.authService.promoteAdmin(adminDto.email);
  }
}
