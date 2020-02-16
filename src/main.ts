import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  Logger,
  ValidationError,
  ValidationPipe
} from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { log } from 'util';

async function bootstrap() {
  const logger = new Logger('bootstrap');

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
  const options = new DocumentBuilder()
    .setTitle('NestJS Example App')
    .setDescription('The API description')
    .setVersion('1.0')
    .setBasePath('api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  const port = 3000;
  SwaggerModule.setup('/docs', app, document);
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}

bootstrap().then(r => undefined);
