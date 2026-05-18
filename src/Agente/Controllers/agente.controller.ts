import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Injectable, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { AgenteService } from "../Service/agente.service";
import { AgenteEntity } from "../Entities/agente.entity";
import { DeleteResult } from "typeorm";
import { LocalAuthGuard } from "../../auth/guard/local-auth.guard";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("agente")
@ApiBearerAuth() 
@Controller("/agente")
export class AgenteController{

  constructor(private agenteService: AgenteService){}

  @UseGuards(JwtAuthGuard)
  @Get("/media")
  @HttpCode(HttpStatus.OK)
  async media(): Promise<AgenteEntity>{
    return await this.agenteService.mediaTokens()
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<AgenteEntity[]>{
    return await this.agenteService.Findall() 
  }}

