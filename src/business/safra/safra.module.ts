import { Logger, Module } from '@nestjs/common';
import { SafraService } from './safra.service';
import { SafraController } from './safra.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SafraEntity } from 'src/db/entities/safra.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SafraEntity])],
  providers: [SafraService],
  controllers: [SafraController]
})
export class SafraModule {}
