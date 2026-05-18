    import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
    import { AgenteEntity } from "../../Agente/Entities/agente.entity";
import { ApiProperty } from "@nestjs/swagger";
        @Entity({name:"tb_usuarios"})
    export class usuarioEntity{
        
    @PrimaryGeneratedColumn()
       @ApiProperty() 
        id!:number
  
        @Column({length:255,nullable:false})
           @ApiProperty() 
    usuario!: string
     
        @Column({length:255,nullable:false})
           @ApiProperty() 
    senha!: string
   @ApiProperty() 
    @OneToMany(()=>AgenteEntity , (x)=>x.usuario)
    

    agente!:AgenteEntity[]



    }