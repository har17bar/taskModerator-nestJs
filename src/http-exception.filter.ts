import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message.message;

    response.status(status).json({
      error: {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message
      }
    });
  }
  // catch(exception: MongoError, host: ArgumentsHost) {
  //   console.log('__)__');
  //   switch (exception.code) {
  //     case 11000:
  //       // duplicate exception
  //       // do whatever you want here, for instance send error to client
  //   }
  // }
}
