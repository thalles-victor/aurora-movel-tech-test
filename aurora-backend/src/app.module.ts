import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENV } from './@shared/env';
import { UserEntity } from './Application/Entities/User.entity';
import { BrandEntity } from './Application/Entities/Brand.enitty';
import { CarEntity } from './Application/Entities/Car.entity';
import { WYSIWYGEntity } from './Application/Entities/WYSIWYG.entity';
import { AuthModule } from './Application/Domains/Auth/Auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: ENV.POSTGRES_HOST,
      port: ENV.POSTGRES_PORT,
      database: ENV.POSTGRES_DB,
      username: ENV.POSTGRES_USER,
      password: ENV.POSTGRES_PASSWORD,
      entities: [UserEntity, BrandEntity, CarEntity, WYSIWYGEntity],
      synchronize: true, // disable when deploying
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
