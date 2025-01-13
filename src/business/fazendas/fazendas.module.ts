import { Logger, Module } from '@nestjs/common';
import { FazendasController } from './fazendas.controller';
import { FazendasService } from './fazendas.service';
import { FazendaEntity } from 'src/db/entities/fazenda.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([FazendaEntity])],
  controllers: [FazendasController],
  providers: [FazendasService],
})
export class FazendasModule {}
