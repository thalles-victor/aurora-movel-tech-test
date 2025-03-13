import 'dotenv/config';
import './@shared/env';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.enableVersioning();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
