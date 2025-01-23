import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response-format.interceptor';
import { LoggerInterceptor } from './common/interceptors/logger.interceptor';
import { ConfigService } from '@nestjs/config';
import { FirebaseService } from './modules/firebase/firebase.service';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exceptions/http.exceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new ResponseInterceptor(), //* แปลง response format
    new LoggerInterceptor(), //* log request,response
  );
  const configService = app.get(ConfigService);
  const port = configService.get('app.port');
  // Get FirebaseService and test the connection
  const firebaseService = app.get(FirebaseService);
  const connectionStatus = await firebaseService.testConnection();
  console.log(connectionStatus);
  //* ใช้งาน Interceptor ระดับ Global
  //* AsyncStorage ทำงานคล้ายๆ Redux
  app.enableCors();
  await app.listen(port ?? 8088);
  console.log(`server started on port ${port}`);
}
bootstrap();
