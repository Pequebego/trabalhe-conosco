import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
const { promisify } = require('util');
const exec = promisify(require('child_process').exec)

@Controller('config')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    await exec('npm run migration:run')
    return this.appService.getHello();
  }
}
