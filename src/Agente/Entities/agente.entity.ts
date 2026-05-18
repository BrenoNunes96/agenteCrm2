import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { registroEntity } from "../../registroExecucoes/entities/RE.entity";
import { usuarioEntity } from "../../usuario/entities/usuario.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'tb_agente' })
export class AgenteEntity {

    @PrimaryGeneratedColumn()   
    @ApiProperty()
    id!: number;

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
     @ApiProperty()
    NomeAgente!: string;

    @Column({ length: 255, nullable: false })
     @ApiProperty()
    Descricao!: string;

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
     @ApiProperty()
    PromptPrincipal!: string; 

    @IsNotEmpty()
    @Column({ nullable: false })
    LimiteMaxToken!: number;
    
    @IsNotEmpty()
    @Column({ nullable: false })
     @ApiProperty()
    LimiteMaxMensal!: number;

    @Column()
     @ApiProperty()
    Status!: string;


    @OneToMany(() => registroEntity, (registroEntity) => registroEntity.agente)
    registroExecucao!: registroEntity[];

    @ManyToOne(() => usuarioEntity, (x) => x.agente, {
        onDelete: 'CASCADE'
    })
     @ApiProperty()
    usuario!: usuarioEntity;
}