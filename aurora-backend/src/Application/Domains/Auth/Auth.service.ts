import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { KEY_OF_INJECTION, ROLE } from 'src/@shared/metadata';
import { IUserRepositoryContract } from 'src/Application/Infra/Repositories/User/User.repository-contract';
import { SignUpDto } from './dtos/SignUp.dto';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import { ENV } from 'src/@shared/env';
import { JwtService } from '@nestjs/jwt';
import { PayloadType } from 'src/@shared/types';
import { SignInDto } from './dtos/SignIn.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(KEY_OF_INJECTION.USER_REPOSITORY)
    private readonly userRepository: IUserRepositoryContract,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const user = await this.userRepository.getBy({ email: signUpDto.email });

    if (user) {
      throw new UnauthorizedException('email in used');
    }

    const hashedPassword = await bcrypt.hash(
      signUpDto.password,
      await bcrypt.genSalt(10),
    );

    const roles = this.isRoot(signUpDto.email) ? [ROLE.ROOT] : [ROLE.USER];

    const userCreated = await this.userRepository.create({
      id: uuid.v4(),
      email: signUpDto.email,
      name: signUpDto.name,
      roles,
      password: hashedPassword,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const payload: PayloadType = {
      id: userCreated.id,
      email: userCreated.email,
      roles: userCreated.roles,
    };

    const accessToken = {
      token: this.jwtService.sign(payload),
      expiresIn: ENV.JWT_EXPIRES_IN,
    };

    const { password, ...rest } = userCreated;

    return {
      user: rest,
      accessToken,
    };
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.userRepository.getBy({ email: signInDto.email });

    if (!user) {
      throw new UnauthorizedException('unregistered user');
    }

    const passwordMatches = bcrypt.compare(signInDto.password, user.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('password invalid');
    }

    const payload: PayloadType = {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };

    const accessToken = {
      token: this.jwtService.sign(payload),
      expiresIn: ENV.JWT_EXPIRES_IN,
    };

    const { password, ...rest } = user;

    return {
      user: rest,
      accessToken,
    };
  }

  private isRoot(email: string) {
    return ENV.ROOT_EMAIL === email;
  }
}
