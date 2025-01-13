import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FazendaEntity } from 'src/db/entities/fazenda.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { FazendaDTO } from './dto/Fazenda.dto';

@Injectable()
export class FazendasService {
  private readonly logger = new Logger(FazendasService.name);
  constructor(
    @InjectRepository(FazendaEntity)
    private readonly fazendaRepository: Repository<FazendaEntity>,
  ) {}


  async getFazendas() {
    this.logger.log('Consultando todas as fazendas inseridas na base');
    return await this.fazendaRepository.find();
  }


  async addFazenda(fazenda: FazendaDTO): Promise<FazendaEntity> {
    this.logger.log('Inserindo fazenda no banco - ', fazenda);
    try {
      const faz = this.fazendaRepository.create(fazenda);
      return await this.fazendaRepository.save(faz);
    } catch (error) {
      this.logger.error('Falha ao inserir fazenda - ', error);
      throw new InternalServerErrorException(error);
    }
  }


  async updateFazenda(fazenda: FazendaDTO): Promise<UpdateResult> {
    this.logger.log(
      'Iniciando processo de atualização de fazenda no banco - ',
      fazenda,
    );
    const find = await this.fazendaRepository.findOne({
      where: {
        nome: fazenda.nome,
      },
    });
    if (!find) {
      this.logger.error('Fazenda não encontrada na base');
      throw new NotFoundException('Fazenda não encontrada');
    }

    try {
      return await this.fazendaRepository
        .createQueryBuilder()
        .update(FazendaEntity)
        .set(fazenda)
        .where('nome = :nome', { nome: fazenda.nome })
        .execute();
    } catch (error) {
      this.logger.error('Erro no processo de update de fazenda - ', error);
      throw new InternalServerErrorException(error);
    }
  }
  

  async deleteFazenda(id: number): Promise<DeleteResult> {
    this.logger.log(
      'Iniciando processo de exclusão de fazenda no banco - ID - ',
      id,
    );
    const find = await this.fazendaRepository.findOne({
      where: {
        idFazenda: id,
      },
    });

    if (!find) {
      this.logger.error('Fazenda não encontrada na base');
      throw new NotFoundException('Fazenda não encontrada');
    }

    try {
      return await this.fazendaRepository.delete(find);
    } catch (error) {
      this.logger.error('Erro no processo de exclusão de fazenda - ', error);
      throw new InternalServerErrorException(error);
    }
  }
}
