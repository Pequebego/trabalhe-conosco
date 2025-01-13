import { Test, TestingModule } from '@nestjs/testing';
import { SafraService } from './safra.service';
import { SafraEntity } from 'src/db/entities/safra.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('SafraService', () => {
  let service: SafraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SafraService, {provide : getRepositoryToken(SafraEntity), useFactory: jest.fn}],
    }).compile();

    service = module.get<SafraService>(SafraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
