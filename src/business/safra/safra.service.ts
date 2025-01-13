import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SafraEntity } from 'src/db/entities/safra.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { SafraDTO } from './dto/Safra.dto';

@Injectable()
export class SafraService {
  private readonly logger = new Logger(SafraService.name);
  constructor(
    @InjectRepository(SafraEntity)
    private readonly safraRepository: Repository<SafraEntity>,
  ) {}

  async getSafras() {
    this.logger.log('Consultando todas as safras inseridas na base');
    return await this.safraRepository.find();
  }


  async addSafra(safra: SafraDTO): Promise<SafraEntity> {
    this.logger.log(
      'Iniciando processo de inclusão de safra na base - ',
      safra,
    );

    const faz = this.safraRepository.create(safra);
    try {
      return await this.safraRepository.save(faz);
    } catch (error) {
      this.logger.error('Falha ao inserir safra - ', error);
      throw new InternalServerErrorException(error);
    }
  }


  async updateSafra(safra: SafraDTO): Promise<UpdateResult> {
    this.logger.log(
      'Iniciando processo de atualização de safra na base - ',
      safra,
    );

    const find = await this.safraRepository.findOne({
      where: {
        idFazenda: safra.idFazenda,
        culturaPlantada: safra.culturaPlantada,
      },
    });
    if (!find) {
      this.logger.error('Safra não encontrada');
      throw new NotFoundException('Safra não encontrada');
    }

    try {
      return await this.safraRepository
        .createQueryBuilder()
        .update(SafraEntity)
        .set(safra)
        .where('id_fazenda = :idFazenda', { idFazenda: safra.idFazenda })
        .andWhere('cultura_plantada = :culturaPlantada', {
          culturaPlantada: safra.culturaPlantada,
        })
        .execute();
    } catch (error) {
      this.logger.error('Falha ao atualizar safra - ', error);
      throw new InternalServerErrorException(error);
    }
  }

  
  async deleteSafra(id: number): Promise<DeleteResult> {
    this.logger.log(
      'Iniciando processo de exclusão de safra na base - ID -',
      id,
    );
    const find = await this.safraRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!find) {
      this.logger.error('Safra não encontrada');
      throw new NotFoundException('Safra não encontrada');
    }

    try {
      return await this.safraRepository.delete(find);
    } catch (error) {
      this.logger.error('Falha ao excluir safra - ', error);
      throw new InternalServerErrorException(error);
    }
  }
}
