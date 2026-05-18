import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { registroEntity } from "../entities/RE.entity";
import { registroService } from "../Service/RE.service";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
   @ApiTags('registroExecução') 
@Controller("/registroExecucao")
export class registroController{
constructor (private readonly registroService:registroService){}


@UseGuards(JwtAuthGuard)
@Post("/registrar")
async create (@Body() x:registroEntity):Promise<registroEntity | undefined>{
return await this.registroService.create(x)


}




}