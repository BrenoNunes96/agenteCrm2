import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from "@nestjs/common";
import { usuarioService } from "../services/usuario.service";
import { usuarioEntity } from "../entities/usuario.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiTags } from "@nestjs/swagger";
@ApiTags("Usuario")
@Controller("/usuario")
export class usuarioController{
constructor( private readonly usuarioService:usuarioService  ){}

@Post("/registrar")
@HttpCode(HttpStatus.CREATED)

async create(@Body() x:usuarioEntity):Promise<usuarioEntity>{

    return this.usuarioService.create(x)
}

@UseGuards(JwtAuthGuard)
@Put("/atualizar")
@HttpCode(HttpStatus.OK)
async atualizar(@Body() x:usuarioEntity):Promise<usuarioEntity>{
return this.usuarioService.atualizar(x)

}


@UseGuards(JwtAuthGuard)
@Get("/")
@HttpCode(HttpStatus.OK)
async findAll():Promise<usuarioEntity []>{

    return this.usuarioService.findAll()
}

@UseGuards(JwtAuthGuard)
@Get("/:nome") 
@HttpCode(HttpStatus.OK)
async findByName(@Param('nome') nome: string): Promise<usuarioEntity | null> {
    // Agora o NestJS extrai o "Joao" da URL /usuario/Joao
    return this.usuarioService.findbyname(nome);
}



}