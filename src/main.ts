import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions = {
    origin : ['http://localhost:4200']
  }
  app.enableCors(corsOptions)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,     
    }),
  );
  await app.listen(3000);
}
bootstrap();
