import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { Repository } from 'typeorm';
import e from 'express';


@Injectable()
export class PessoasService {
  constructor (
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
  ) {}

  findAll() {
    return this.pessoaRepository.find({
      order: {
        id: 'DESC'
      }
    });
  }

  async findOne(id: number) {
    const pessoa = await this.pessoaRepository.findOne({
      where: { id: id }
    });

    if (pessoa) return pessoa;

    throw new NotFoundException("Pessoa não encontrada");
  }

  async create(createPessoaDto: CreatePessoaDto) {
    try{

      const dadosPessoa = {
        nome: createPessoaDto.nome,
        senhaHash: createPessoaDto.senha,
        email: createPessoaDto.email
      }

      const novaPessoa = await this.pessoaRepository.create(dadosPessoa);

      return this.pessoaRepository.save(novaPessoa);
    
    } catch (error) {
      throw error
    }
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {

    const partial = {
      nome: updatePessoaDto?.nome,
      email: updatePessoaDto?.email,
      senha: updatePessoaDto?.senha
    };

    const pessoa = await this.pessoaRepository.preload({
      id,
      ...partial
    });
    
    if (!pessoa) throw new NotFoundException()

    return this.pessoaRepository.save(pessoa)
  }

  async remove(id: number) {
    
    const pessoa = await this.findOne(id);

    if (!pessoa) throw new NotFoundException("Pessoa não encontrada");

    return 'Pessoa deletada com sucesso'
  }

}