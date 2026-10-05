import { IsEmail } from "class-validator";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RecadoEntity } from "../../recados/entities/recado.entity";

@Entity()
export class Pessoa {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ length: 255 })
  senhaHash: string;

  @Column({ length: 100 })
  nome: string;

  @CreateDateColumn({  })
  createdAt: Date

  @CreateDateColumn({  })
  updatedAt: Date

  @OneToMany(() => RecadoEntity, RecadoEntity => RecadoEntity.de)
  recadosEnviados: RecadoEntity[];

  @OneToMany(() => RecadoEntity, RecadoEntity => RecadoEntity.para)
  recadosRecebidos: RecadoEntity[];
}
