import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENV } from './@shared/env';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: ENV.POSTGRES_HOST,
      port: ENV.POSTGRES_PORT,
      database: ENV.POSTGRES_DB,
      username: ENV.POSTGRES_USER,
      password: ENV.POSTGRES_PASSWORD,
      entities: [],
      synchronize: true, // disable when deploying
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
