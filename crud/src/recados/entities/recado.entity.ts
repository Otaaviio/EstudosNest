import { PrimaryGeneratedColumn, Column, CreateDateColumn, Entity, UpdateDateColumn, ManyToMany, ManyToOne, JoinColumn } from "typeorm";
import { Pessoa } from "../../pessoas/entities/pessoa.entity";

@Entity()
export class RecadoEntity {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'varchar', length: 255 })
    texto: string;
    
    @Column({ default: false })
    lido: boolean;
    
    @Column()
    data: Date;
    
    @CreateDateColumn()
    createdAt?: Date;
    
    @UpdateDateColumn()
    updatedAt?: Date;
    
    @ManyToOne(() => Pessoa)
    @JoinColumn({ name: 'de' })
    de: Pessoa;
    
    @ManyToOne(() => Pessoa)
    @JoinColumn({ name: 'para'  })
    para: string;
}