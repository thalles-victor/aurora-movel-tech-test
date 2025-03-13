import { Module } from '@nestjs/common';
import { AuthController } from './Auth.controller';
import { AuthService } from './Auth.service';
import { RepositoriesModule } from 'src/Application/Infra/Repositories/Repositories.module';
import { KEY_OF_INJECTION } from 'src/@shared/metadata';
import { UserTypeOrmRepository } from 'src/Application/Infra/Repositories/User/UserTypeOrm.repository';
import { JwtModule } from '@nestjs/jwt';
import { ENV } from 'src/@shared/env';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: ENV.JWT_SECRET,
      signOptions: { expiresIn: ENV.JWT_EXPIRES_IN },
    }),
    RepositoriesModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: KEY_OF_INJECTION.USER_REPOSITORY,
      useClass: UserTypeOrmRepository,
    },
    AuthService,
  ],
})
export class AuthModule {}
