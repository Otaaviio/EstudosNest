import { Injectable, NotFoundException } from '@nestjs/common';
import { RecadoEntity } from './entities/recado.entity';
import { CriaRecadoDto } from './dto/cria-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoasService } from '../pessoas/pessoas.service';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(RecadoEntity)
    private readonly recadoRepository: Repository<RecadoEntity>,
    private readonly pessoaService: PessoasService,
  ) {}

  async findAll() {
    const recados = await this.recadoRepository.find({
      relations: { de: true, para: true }
    });
    return recados;
  }

  async findOne(id: number) {
    const recado = await this.recadoRepository.findOne({
      where: { id: id },
      relations: { de: true, para: true }
    }) 

    if (recado) return recado

    throw new NotFoundException("Recado não encontrado") 
  }

  async create(createRecadoDto: CriaRecadoDto) {
    
    const {deId, paraId} = createRecadoDto;

    const [de, para] = await Promise.all([
      this.pessoaService.findOne(deId),
      this.pessoaService.findOne(paraId)
    ])

    const novoRecado = {
      texto: createRecadoDto.texto,
      de,
      para,
      lido: false,
      data: new Date()
    }
    
    const recado = await this.recadoRepository.create(novoRecado);
    await this.recadoRepository.save(recado);

    return {
      ...recado,
      de: {
        id: recado.de.id,
      },
      para: {
        id: recado.para.id,
      }
    };
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
