import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class ConceitosAutomaticoService {
  
  @Get()
  getHelloAutomatico(): string{
    return 'Hello do automatico service'
  }
}
