import { Module } from '@nestjs/common';
import { DashController } from './dash.controller';
import { FazendaEntity } from 'src/db/entities/fazenda.entity';
import { DashService } from './dash.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SafraEntity } from 'src/db/entities/safra.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FazendaEntity]),
    TypeOrmModule.forFeature([SafraEntity]),
  ],
  controllers: [DashController],
  providers: [DashService],
})
export class DashModule {}
