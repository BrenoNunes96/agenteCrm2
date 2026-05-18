import { JwtService } from '@nestjs/jwt';

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Bcrypt } from '../bcrypt/bcrypt';
import { UsuarioLogin } from '../entities/usuarioLogin.entity';
import { usuarioService } from '../../usuario/services/usuario.service';


@Injectable()
export class AuthService{
    constructor(
        private usuarioService: usuarioService,
        private jwtService: JwtService,
        private bcrypt: Bcrypt
    ){ }

    async validateUser(username: string, password: string): Promise<any>{

        const buscaUsuario = await this.usuarioService.findbyname(username)

        if(!buscaUsuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND)

        const matchPassword = await this.bcrypt.compararSenhas(password, buscaUsuario.senha)

            const { senha, ...resposta } = buscaUsuario
            return resposta
        

        return null

    }

    async login(usuarioLogin: UsuarioLogin){

        const payload = { sub: usuarioLogin.usuario }

        const buscaUsuario = await this.usuarioService.findbyname(usuarioLogin.usuario)
   

        return{
            id: buscaUsuario?.id,
            usuario: usuarioLogin.usuario,
            senha: '',

            token: `Bearer ${this.jwtService.sign(payload)}`,
        }

    }
}