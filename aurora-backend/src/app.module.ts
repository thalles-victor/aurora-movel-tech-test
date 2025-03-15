import { Module, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENV } from './@shared/env';
import { UserEntity } from './Application/Entities/User.entity';
import { CarEntity } from './Application/Entities/Car.entity';
import { WYSIWYGEntity } from './Application/Entities/WYSIWYG.entity';
import { AuthModule } from './Application/Domains/Auth/Auth.module';
import { APP_PIPE } from '@nestjs/core';
import { CarModule } from './Application/Domains/Car/Car.module';
import { UploadModule } from './Application/Domains/Upload/Upload.module';
import { ImageEntity } from './Application/Entities/Image.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: ENV.POSTGRES_HOST,
      port: ENV.POSTGRES_PORT,
      database: ENV.POSTGRES_DB,
      username: ENV.POSTGRES_USER,
      password: ENV.POSTGRES_PASSWORD,
      entities: [UserEntity, CarEntity, WYSIWYGEntity, ImageEntity],
      synchronize: true, // disable when deploying
    }),
    AuthModule,
    CarModule,
    UploadModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    },
    AppService,
  ],
})
export class AppModule {}
