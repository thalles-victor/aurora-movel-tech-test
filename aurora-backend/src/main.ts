import 'dotenv/config';
import './@shared/env';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'node:path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ENV } from './@shared/env';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableVersioning();
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(path.join(process.cwd(), '@Upload'), {
    prefix: '/static/assets',
  });

  // app.enableCors({
  //   origin: 'http://localhost:4200',
  //   methods: 'GET,POST,PUT,DELETE,PATCH',
  //   allowedHeaders: 'Content-Type,Authorization',
  //   credentials: true,
  // });

  const config = new DocumentBuilder()
    .setTitle('Aurora Móvel')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cars')
    .addServer(
      `${ENV.BACKEND_PROTOCOL}://${ENV.BACKEND_DOMAIN}:${ENV.PORT}`,
      'Production',
    )
    .addTag('Your API Tag')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'jwt',
        description: 'Enter JWT token',
        in: 'header',
      },
      'jwt',
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, documentFactory);

  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
