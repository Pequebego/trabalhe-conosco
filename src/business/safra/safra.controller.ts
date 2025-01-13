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
import { SafraService } from './safra.service';
import { SafraDTO } from './dto/Safra.dto';
import {
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';

@Controller('safra')
export class SafraController {
  private readonly logger = new Logger(SafraController.name);
  constructor(private readonly safraService: SafraService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: SafraDTO,
    isArray: false,
  })
  addSafra(@Body() safra: SafraDTO, @Res() response) {
    this.safraService.addSafra(safra).then((res) => {
      this.logger.log('Safra incluída com sucesso');
      return response.status(201).send(res);
    });
  }

  
  @Get()
  @ApiOkResponse({
    type: SafraDTO,
    isArray: true,
  })
  getSafras(@Res() response) {
    this.safraService.getSafras().then((res) => {
      return response.status(200).send(res);
    });
  }


  @Put()
  @ApiOkResponse({
    type: SafraDTO,
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  updateSafra(@Body() safra: SafraDTO, @Res() response) {
    this.safraService.updateSafra(safra).then((res) => {
      this.logger.log('Safra atualizada com sucesso');
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
  deleteSafra(@Param('id') id: number, @Res() response) {
    this.safraService.deleteSafra(id).then((res) => {
      this.logger.log('Safra excluída com sucesso');
      return response.status(200).send(res);
    });
  }
}
