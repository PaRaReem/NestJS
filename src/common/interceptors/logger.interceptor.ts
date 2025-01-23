import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import requestID from '../utils/request-id.util';
import { logger } from '../utils/winston-logger.util';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // ดึง request และ response จาก context
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    // เก็บข้อมูล request
    const { method, url, params, query, headers, body } = request;
    // ดักจับ response ก่อนที่จะส่งกลับ
    return next.handle().pipe(
      tap((data) => {
        const logPayload = {
          timestamp: new Date().toISOString(),
          requestID: requestID(),
          method,
          url,
          statusCode: response.statusCode,
          params,
          query,
          headers,
          body,
          response: data,
        };

        // Log the request and response details
        logger.info('HTTP Request and Response', logPayload);
      }),
    );
  }
}
