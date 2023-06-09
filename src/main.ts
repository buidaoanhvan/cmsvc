import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // public directory
  app.use(express.static(join(__dirname, '..', 'public')));
  // Serve the 'public' directory as a static directory
  app.use('/public', express.static(join(__dirname, '..', 'public')));
  // fix cors
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap();
