import { forwardRef, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { usuarioService } from "../../usuario/services/usuario.service";
import { UsuarioLogin } from "../Entities/authEntity.entityt";
import { Bcrypt } from "../bcrypt/bcrypt";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export  class  AuthService{
    
constructor(@Inject(forwardRef(()=>usuarioService)) private readonly usuarioServices:usuarioService,private readonly jwt:JwtService,private bcrypt:Bcrypt){

}

async validarUser(usuario:string,senha:string ):Promise<any>{ // validação login para verificar se existe no banco de dados
 const buscarUsuario = await this.usuarioServices.findbyname(usuario) // acha o nome no banco com o usuario enviado
if(!buscarUsuario)throw new HttpException("usuario ou senha não corresposndem",HttpStatus.NOT_FOUND) // se n achar para aplicaçao

const compararSenha = await this.bcrypt.CompararSenha(senha,buscarUsuario.senha) // tenta achar senha no banco
if(!compararSenha)throw new HttpException("usuario ou senha não correspondem",HttpStatus.NOT_FOUND)

return buscarUsuario // retorna os dados do banco do usaurio com o mesmo usuario cadastrado enviado no login

}


async login(usuario:string,senha:string):Promise<any>{
let buscarUsuario = await this.usuarioServices.findbyname(usuario) // busca no banco usuario com o mesmo usuario enviado 
const payload = {sub:buscarUsuario?.usuario}
return{
id:buscarUsuario?.id,
usuario:buscarUsuario?.usuario,
token:`Bearer ${this.jwt.sign(payload)}`


}
}

}
