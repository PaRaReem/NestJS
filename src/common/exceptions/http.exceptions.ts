import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { responseFormat } from '../utils/format.util';

@Catch() // Catch all exceptions
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>(); // Correctly specify the type using angle brackets
    const status = exception.getStatus();
    const message = exception.message;

    // You can further customize this based on the exception type
    response.status(status).json(responseFormat(status, { message }));
  }
}
