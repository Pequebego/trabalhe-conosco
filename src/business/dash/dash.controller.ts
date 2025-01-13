import { Controller, Get, Res } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { DashService } from './dash.service';

@Controller('dash')
export class DashController {
  constructor(private readonly dashService: DashService) {}

  @Get()
  @ApiOkResponse({
    type: Number,
    isArray: false,
  })
  getProdutores(@Res() response) {
    this.dashService
      .getDash()
      .then((res) => {
        return response.status(200).send(res);
      })
      .catch((e) => {
        throw new Error(e);
      });
  }
}
