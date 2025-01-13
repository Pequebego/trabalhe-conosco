import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdutorEntity } from 'src/db/entities/produtor.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProdutorDTO } from './dto/Produtor.dto';

@Injectable()
export class ProdutoresService {
  private readonly logger = new Logger(ProdutoresService.name);
  constructor(
    @InjectRepository(ProdutorEntity)
    private readonly produtorRepository: Repository<ProdutorEntity>,
  ) {}

  async getProdutores() {
    this.logger.log('Consultando todos produtores na base');
    return await this.produtorRepository.find();
  }


  async addProdutor(produtor: ProdutorDTO): Promise<ProdutorEntity> {
    this.logger.log('Inserindo produtor na base - ', produtor);
    const prod = this.produtorRepository.create(produtor);

    try {
      return await this.produtorRepository.save(prod);
    } catch (error) {
      this.logger.error('Falha ao inserir produtor - ', error);
      throw new InternalServerErrorException(error);
    }
  }


  async updateProdutor(produtor: ProdutorDTO): Promise<UpdateResult> {
    this.logger.log(
      'Iniciando processo de atualização de produtor na base - ',
      produtor,
    );
    const find = await this.produtorRepository.findOne({
      where: {
        cpfcnpj: produtor.cpfcnpj,
      },
    });
    if (!find) {
      this.logger.error('Produtor não encontrado');
      throw new NotFoundException('Produtor não encontrado');
    }
    try {
      return await this.produtorRepository
        .createQueryBuilder()
        .update(ProdutorEntity)
        .set({ cpfcnpj: produtor.cpfcnpj, nome: produtor.nome })
        .where('cpfcnpj = :cpfcnpj', { cpfcnpj: find.cpfcnpj })
        .execute();
    } catch (error) {
      this.logger.error('Falha ao atualizar produtor - ', error);
      throw new InternalServerErrorException(error);
    }
  }

  
  async deleteProdutor(id: number): Promise<DeleteResult> {
    this.logger.log(
      'Iniciando processo de exclusão de produtor na base - ID -',
      id,
    );
    const find = await this.produtorRepository.findOne({
      where: {
        idProdutor: id,
      },
    });
    if (!find) {
      this.logger.error('Produtor não encontrado');
      throw new NotFoundException('Produtor não encontrado');
    }

    try {
      return await this.produtorRepository.delete(find);
    } catch (error) {
      this.logger.error('Falha ao excluir produtor - ', error);
      throw new InternalServerErrorException(error);
    }
  }
}
