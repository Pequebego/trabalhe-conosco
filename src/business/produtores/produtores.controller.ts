import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ProdutorDTO } from './dto/Produtor.dto';
import { ProdutoresService } from './produtores.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@Controller('produtores')
export class ProdutoresController {
  private readonly logger = new Logger(ProdutoresController.name);
  constructor(private readonly produtorService: ProdutoresService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: ProdutorDTO,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  addProdutor(@Body() produtor: ProdutorDTO, @Res() response) {
    this.produtorService.addProdutor(produtor).then((res) => {
      this.logger.log('Produtor incluído com sucesso');
      return response.status(201).send(res);
    });
  }


  @Get()
  @ApiOkResponse({
    type: ProdutorDTO,
    isArray: true,
  })
  getProdutores(@Res() response) {
    this.produtorService.getProdutores().then((res) => {
      return response.status(200).send(res);
    });
  }


  @Put()
  @ApiOkResponse({
    type: ProdutorDTO,
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  updateProdutor(@Body() produtor: ProdutorDTO, @Res() response) {
    this.produtorService.updateProdutor(produtor).then((res) => {
      this.logger.log('Produtor alterado com sucesso');
      return response.status(200).send(res);
    });
  }

  
  @Delete(':id')
  @ApiOkResponse({
    description: 'Deleted Successfully',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  deleteProdutor(@Param('id') id: number, @Res() response) {
    this.produtorService.deleteProdutor(id).then((res) => {
      this.logger.log('Produtor excluído com sucesso');
      return response.status(200).send(res);
    });
  }
}
