import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { formatLog, formatResponse } from '../utils/format.util';
import { logger } from '../utils/winston-logger.util';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest<Request>();
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.message;
    const formatedResponse = formatResponse(status, { message });
    logger.info(formatLog(request, response, formatedResponse));
    response.status(status).json(formatedResponse);
  }
}
