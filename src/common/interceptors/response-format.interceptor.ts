import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { formatLog, formatResponse } from '../utils/format.util';
import { logger } from '../utils/winston-logger.util';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((data) => {
        const statusCode = response.statusCode;
        const formatedResponse = formatResponse(statusCode, data);
        logger.info(formatLog(request, response, formatedResponse));
        response.status(statusCode).json(formatedResponse);
      }),
    );
  }
}
