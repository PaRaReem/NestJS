import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExampleModule } from './example/example.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load environment variables globally
    ExampleModule,
  ],
})
export class AppModule {}
