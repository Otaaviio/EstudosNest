import { Injectable, NotFoundException } from '@nestjs/common';
import { RecadoEntity } from './entities/recado.entity';
import { CriaRecadoDto } from './dto/cria-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(RecadoEntity)
    private readonly recadoRepository: Repository<RecadoEntity>,
  ) {}

  findAll() {
    return this.recadoRepository.find();
  }

  async findOne(id: number) {
    const recado = await this.recadoRepository.findOne({
      where: { id: id }
    }) 

    if (recado) return recado

    throw new NotFoundException("Recado não encontrado") 
  }

  async create(createRecadoDto: CriaRecadoDto) {
    
    const novoRecado = {
      ...createRecadoDto,
      lido: false,
      data: new Date()
    }
    
    const recado = await this.recadoRepository.create(novoRecado);

    return this.recadoRepository.save(recado);
  }

  async update(id: number, updateRecadoDto: UpdateRecadoDto) {
    const partial = {
      lido: updateRecadoDto?.lido,
      texto: updateRecadoDto?.texto
    };
    
    const recado = await this.recadoRepository.preload({
      id,
      ...partial
    });

    if (!recado) throw new NotFoundException()

    await this.recadoRepository.save(recado);

    return recado
  }


  async delete(id: number) {
    
    const recado = await this.findOne(id)

    if (!recado) throw new NotFoundException()

    return this.recadoRepository.remove(recado);
  }
}
