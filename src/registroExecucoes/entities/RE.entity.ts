import { Column, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AgenteEntity } from "../../Agente/Entities/agente.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity({"name":"tb_registro_de_execuções"})
export class registroEntity{

@PrimaryGeneratedColumn()
   @ApiProperty() 
id!:number

@Column({length:255,nullable:false})
   @ApiProperty() 
mensagemDeEntrada !: string

@Column({length:255,nullable:false})
   @ApiProperty() 
mensagemDeSaida ! : string

@Column({"type":"int",nullable:false})
quantidadeDeTokensDeEntrada !: number

@Column({"type":"int",nullable:false})
   @ApiProperty() 
quantidadeDeTokensDeSaida !: number

@Column({"type":"int" ,nullable:false })
   @ApiProperty() 
totaldeTokens !: number

@Column({"type":"decimal",precision:9,scale:2,nullable:false})

tempoDeExecucaoEmMilissegundos !: number

@ManyToOne(()=> AgenteEntity,(x)=>x['registroExecucao'],{
    onDelete: 'CASCADE'
} )

agente !: AgenteEntity






}