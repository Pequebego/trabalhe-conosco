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
import { FazendasService } from './fazendas.service';
import { FazendaDTO } from './dto/Fazenda.dto';
import {
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

@Controller('fazendas')
export class FazendasController {
  private readonly logger = new Logger(FazendasController.name);
  constructor(private readonly fazendaService: FazendasService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: FazendaDTO,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  addFazenda(@Body() fazenda: FazendaDTO, @Res() response) {
    this.fazendaService.addFazenda(fazenda).then((res) => {
      this.logger.log('Fazenda incluída com sucesso');
      return response.status(201).send(res);
    });
  }


  @Get()
  @ApiOkResponse({
    type: FazendaDTO,
    isArray: true,
  })
  getFazendas(@Res() response) {
    this.fazendaService.getFazendas().then((res) => {
      return response.status(200).send(res);
    });
  }


  @Put()
  @ApiOkResponse({
    type: FazendaDTO,
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  updateFazenda(@Body() fazenda: FazendaDTO, @Res() response) {
    this.fazendaService.updateFazenda(fazenda).then((res) => {
      this.logger.log('Fazenda atualizada com sucesso');
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
  deleteFazenda(@Param('id') id: number, @Res() response) {
    this.fazendaService.deleteFazenda(id).then((res) => {
      this.logger.log('Fazenda excluída com sucesso');
      return response.status(200).send(res);
    });
  }
  
}
