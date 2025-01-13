import { Logger, Module } from '@nestjs/common';
import { ProdutoresController } from './produtores.controller';
import { ProdutoresService } from './produtores.service';
import { Repository } from 'typeorm';
import { ProdutorEntity } from 'src/db/entities/produtor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProdutorEntity])],
  controllers: [ProdutoresController],
  providers: [ProdutoresService]
})
export class ProdutoresModule {}
