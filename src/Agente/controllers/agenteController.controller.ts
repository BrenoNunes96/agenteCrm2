import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Injectable, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { AgenteService } from "../Service/agente.service";
import { AgenteEntity } from "../Entities/agente.entity";
import { DeleteResult } from "typeorm";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { jwtGuard } from "../../auth/guard/jwtLocal.Guard";



@ApiTags("agente")
@ApiBearerAuth() 
@Controller("/agente")
export class AgenteController{

  constructor(private agenteService: AgenteService){}


@Post("/registrar")
@UseGuards(jwtGuard)
@HttpCode(HttpStatus.OK)
async created(@Body() x:AgenteEntity):Promise<AgenteEntity>{
console.log(x)
  return await this.agenteService.Create(x)
}


  @Delete("/deletar")
  @UseGuards(jwtGuard)
  @HttpCode(HttpStatus.OK)
  async deletar(@Params x:number):Promise<AgenteEntity>{
    return await this.agenteService.Delete(x)
  }

  @Get("/media")
  @UseGuards(jwtGuard)
  @HttpCode(HttpStatus.OK)
  async media(): Promise<AgenteEntity>{
    return await this.agenteService.mediaTokens()
  }

@UseGuards(jwtGuard)
@Put("/atualizar")
@HttpCode(HttpStatus.OK)
async atualizar(@Body()x:AgenteEntity):Promise<AgenteEntity>{
return await this.agenteService.Updated(x)

}

  @UseGuards(jwtGuard)
  @Get("/")
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<AgenteEntity[]>{
    return await this.agenteService.Findall() 
  }}
