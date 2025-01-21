import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExampleModule } from './modules/example/example.module';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig], // โหลด appConfig ที่เราดึงค่าจาก .env
      isGlobal: true, // ให้ Config นี้ใช้ได้ทั่วทั้งโปรเจกต์
    }),
    ExampleModule,
  ],
})
export class AppModule {}
