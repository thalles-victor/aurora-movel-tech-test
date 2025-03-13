import 'dotenv/config';
import './@shared/env';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'node:path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app.enableVersioning();
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(path.join(process.cwd(), '@Upload'), {
    prefix: '/static/assets',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
