import { Test, TestingModule } from '@nestjs/testing';
import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';

describe('ExampleController', () => {
  let controller: ExampleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleController],
      providers: [ExampleService],
    }).compile();

    controller = module.get<ExampleController>(ExampleController);
  });

  it('should be defined ExampleController', () => {
    expect(controller).toBeDefined();
  });

  it('ExampleController.findAll', () => {
    const result = controller.findAll();
    expect(result).toEqual(['Item 1', 'Item 2', 'Item 3']);
  });
});
