import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExampleModule } from './modules/example/example.module';
import { RequestIdMiddleware } from './common/middlewares/async-storage.middleware';
import { FirebaseModule } from './modules/firebase/firebase.module';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig], //* โหลด appConfig ที่เราดึงค่าจาก .env
      isGlobal: true, //* ให้ Config นี้ใช้ได้ทั่วทั้งโปรเจกต์
    }),
    ExampleModule,
    FirebaseModule, //* Import FirebaseModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*'); //* ใช้งาน Middleware กับทุก Route
  }
}
