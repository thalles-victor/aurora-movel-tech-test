import { Test } from '@nestjs/testing';
import { AuthService } from '../Auth.service';
import { KEY_OF_INJECTION, ROLE } from 'src/@shared/metadata';
import { UserInMemoryRepository } from 'src/Application/Infra/Repositories/User/UserInMemory.repository';
import { JwtModule } from '@nestjs/jwt';
import { ENV } from 'src/@shared/env';
import { SignUpDto } from '../dtos/SignUp.dto';
import { faker } from '@faker-js/faker';
import { SignInDto } from '../dtos/SignIn.dto';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          global: true,
          secret: ENV.JWT_SECRET,
          signOptions: { expiresIn: ENV.JWT_EXPIRES_IN },
        }),
      ],
      providers: [
        {
          provide: KEY_OF_INJECTION.USER_REPOSITORY,
          useClass: UserInMemoryRepository,
        },
        AuthService,
      ],
    }).compile();

    authService = moduleRef.get(AuthService);
  });

  it('auth service must be defined', () => {
    expect(authService).toBeDefined();
  });

  it('try create user that not exist', async () => {
    const userDto: SignUpDto = {
      name: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const userCreated = await authService.signUp(userDto);

    expect(userCreated.user).toBeDefined();
    expect(userCreated.accessToken).toBeDefined();
    expect(userCreated.user.name).toEqual(userDto.name);
    expect(userCreated.user.email).toEqual(userDto.email);
    expect(userCreated.user['password']).not.toBeDefined();
  });

  it('not should be able create user that already exist with same email', async () => {
    const userDto: SignUpDto = {
      name: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    await authService.signUp(userDto);

    expect(async () => await authService.signUp(userDto)).rejects.toThrow();
  });

  it('should be able access with ROOT with valid credentials', async () => {
    const signUpDto: SignUpDto = {
      name: faker.internet.username(),
      email: ENV.ROOT_EMAIL,
      password: ENV.ROOT_PASSWORD,
    };

    const userCreated = await authService.signUp(signUpDto);

    expect(userCreated.user.roles).toContain(ROLE.ROOT);
  });

  it('should be able authenticate user that already exist', async () => {
    const userDto: SignUpDto = {
      name: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    await authService.signUp(userDto);

    const userSignInDto: SignInDto = {
      email: userDto.email,
      password: userDto.password,
    };

    const userAuthenticated = await authService.signIn(userSignInDto);

    expect(userAuthenticated.accessToken).toBeDefined();
    expect(userAuthenticated.user).toBeDefined();
    expect(userAuthenticated.user.email).toEqual(userDto.email);
  });

  it('not should bea ble authenticate a user that nos registered', async () => {
    const userDto: SignInDto = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    expect(async () => await authService.signIn(userDto)).rejects.toThrow();
  });

  it('should be able access with login with ROOT user', async () => {
    const signUpDto: SignUpDto = {
      name: faker.internet.username(),
      email: ENV.ROOT_EMAIL,
      password: ENV.ROOT_PASSWORD,
    };

    await authService.signUp(signUpDto);

    const userDto: SignInDto = {
      email: ENV.ROOT_EMAIL,
      password: ENV.ROOT_PASSWORD,
    };

    const userAuthenticated = await authService.signIn(userDto);

    expect(userAuthenticated.user.roles).toContain(ROLE.ROOT);
  });

  it('should ba able promote to admin a user that already exist', async () => {
    const userDto: SignUpDto = {
      name: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const userCreated = await authService.signUp(userDto);

    expect(userCreated.user.roles).toContain(ROLE.USER);

    const userPromoted = await authService.promoteAdmin(userCreated.user.email);

    expect(userPromoted.roles).toContain(ROLE.ADMIN);
  });
});
