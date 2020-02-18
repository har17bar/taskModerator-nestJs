import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as config from 'config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const serverConfig = config.get('server');

  const logger = new Logger('bootstrap');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir([
    join(__dirname, '..', 'views'),
    join(__dirname, '../plugin', 'views')
  ]);
  app.setViewEngine('ejs');

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  }

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

  const port = process.env.PORT || serverConfig.port;
  SwaggerModule.setup('/docs', app, document);
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}

bootstrap().then(r => undefined);
