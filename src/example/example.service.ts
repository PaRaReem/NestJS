import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ExampleService {
  constructor(private configService: ConfigService) {
    const port = this.configService.get<string>('PORT');
    console.log(`Service is running on port: ${port}`);
  }
}
