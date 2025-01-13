import { Test, TestingModule } from '@nestjs/testing';
import { SafraController } from './safra.controller';
import { SafraEntity } from 'src/db/entities/safra.entity';
import { SafraService } from './safra.service';

describe('SafraController', () => {
  let controller: SafraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SafraController],
      imports: [SafraEntity],
      providers: [SafraService]
    }).compile();

    controller = module.get<SafraController>(SafraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
