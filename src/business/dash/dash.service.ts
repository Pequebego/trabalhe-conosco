import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FazendaEntity } from 'src/db/entities/fazenda.entity';
import { SafraEntity } from 'src/db/entities/safra.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DashService {
  private readonly logger = new Logger(DashService.name);

  constructor(
    @InjectRepository(FazendaEntity)
    private readonly fazendaRepository: Repository<FazendaEntity>,
    @InjectRepository(SafraEntity)
    private readonly safraRepository: Repository<SafraEntity>,
  ) {}

  async getDash() {
    this.logger.log('Consultando todas as fazendas inseridas na base');
    const fazendas = await this.fazendaRepository.find();

    this.logger.log('Consultando todas as safras inseridas na base');
    const safras = await this.safraRepository.find();

    let areaTotal = 0;
    let areaUtilizada = 0;
    fazendas.forEach((e) => {
      areaTotal += e.areaTotal;
      areaUtilizada += e.areaAgriculturavel + e.areaVegetacao;
    });

    //Separa o array em múltiplos arrays baseado no Estado.
    let fazendasPorEstado = fazendas.reduce((acc, fazenda) => {
      if (!acc[fazenda.estado]) {
        acc[fazenda.estado] = [];
      }

      acc[fazenda.estado].push(fazenda);
      return acc;
    }, {});

    //Separa o array em multiplos arrays de int, iterando a cultura plantada.
    let culturas = safras.reduce((acc, safra) => {
      if (!acc[safra.culturaPlantada]) {
        acc[safra.culturaPlantada] = 0;
      }

      acc[safra.culturaPlantada] += 1;
      return acc;
    }, {});

    return {
      areaTotal: areaTotal,
      totalFazendas: fazendas.length,
      porcentagemAreaUtilizada: (areaUtilizada / areaTotal) * 100,
      fazendasPorEstado,
      culturasPlantadas: culturas,
    };
  }
}
