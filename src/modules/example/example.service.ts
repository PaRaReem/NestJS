import { Injectable } from '@nestjs/common';

@Injectable()
export class ExampleService {
  async example() {
    return 'this is example';
  }
}
