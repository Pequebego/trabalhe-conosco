import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutoresModule } from './business/produtores/produtores.module';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { FazendasModule } from './business/fazendas/fazendas.module';
import { SafraModule } from './business/safra/safra.module';
import { DashModule } from './business/dash/dash.module';

@Module({
  imports: [
    ProdutoresModule,
    DbModule,
    ConfigModule.forRoot(),
    FazendasModule,
    SafraModule,
    DashModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
