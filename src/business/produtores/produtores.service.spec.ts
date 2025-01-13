import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoresService } from './produtores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutorEntity } from 'src/db/entities/produtor.entity';

describe('ProdutoresService', () => {
  let service: ProdutoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProdutoresService],
      imports : [TypeOrmModule.forFeature([ProdutorEntity])]
    }).compile();

    service = module.get<ProdutoresService>(ProdutoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
