import { InjectRepository } from "@nestjs/typeorm";
import { usuarioEntity } from "../entities/usuario.entity";
import { Repository } from "typeorm";
import { Bcrypt } from "../../auth/bcrypt/bcrypt";
import { HttpException, HttpStatus } from "@nestjs/common";

export class usuarioService {

constructor(  
    private bcrypt: Bcrypt,
    @InjectRepository(usuarioEntity) 
private readonly usuario:Repository<usuarioEntity> ){}


async findbyname(usuario:string):Promise<usuarioEntity |null>{

return this.usuario.findOne({where:{usuario}})

}

async atualizar (x:usuarioEntity):Promise<usuarioEntity>{
let  usuarios = await this.findbyname(x?.usuario)
if(usuarios && usuarios?.id !== x.id){
    throw new HttpException("ja existe usuario com o mesmo nome!",HttpStatus.BAD_REQUEST)
}
return await  this.usuario.save(x)
}


async create(x:usuarioEntity):Promise<usuarioEntity>{
    let usuarioCadastro = await this.findbyname(x.usuario)

if(usuarioCadastro){
throw new HttpException("mesmo usuario escolha outro",HttpStatus.BAD_REQUEST  )

}


        x.senha = await this.bcrypt.criptografarSenha(x.senha)
    return await this.usuario.save(x)

}
async findAll():Promise<usuarioEntity []>{

    return this.usuario.find({ relations:{
            agente: true
          }})
   


}


}