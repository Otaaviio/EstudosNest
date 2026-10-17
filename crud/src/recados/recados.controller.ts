import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes } from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CriaRecadoDto } from './dto/cria-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Controller('recados')
@UsePipes(ParseIntPipe)
export class RecadosController {
  constructor(private readonly recadosService: RecadosService){}

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    const recados = await this.recadosService.findAll(paginationDto);
    return recados
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.recadosService.findOne(id);
  }

  @Post()
  create(@Body() createRecadoDto: CriaRecadoDto) {
    return this.recadosService.create(createRecadoDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRecadoDto: UpdateRecadoDto) {
    return this.recadosService.update(id, updateRecadoDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.recadosService.delete(id);
  }

}
