import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('example')
export class ExampleController {
  @Get()
  @HttpCode(200)
  findAll(): string {
    return 'This action returns all cats';
  }
}
