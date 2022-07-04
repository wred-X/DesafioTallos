import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'static'));
  const cors = require('cors');

  app.use(cors());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      // whitelist: true,
      // forbidNonWhitelisted: true,
    })
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(3000);
}
bootstrap();
