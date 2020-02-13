import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  Logger,
  ValidationError,
  ValidationPipe
} from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe()
    //     {
    //   exceptionFactory: (errors: ValidationError[]) => {
    //     return new BadRequestException('Validation error');
    //   }
    // }
  );
  await app.listen(3000);
}

bootstrap().then(r => undefined);
