import { Controller, Get } from '@nestjs/common';

@Controller('app')
export class AppController {

  @Get('hello')
  getHello(): string {
    return 'Hello';
  }

  @Get('exemplo')
  getExemplo(): string {
    return 'Rota exemplo';
  }
}
