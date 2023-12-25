import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  // Enable CORS for all routes
  const corsOptions: CorsOptions = {
    origin: true, // Allow all origins
    credentials: true, // Enable credentials (cookies, authorization headers)
  };

  app.enableCors(corsOptions);

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
