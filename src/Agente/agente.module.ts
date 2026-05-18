import { Module } from "@nestjs/common";
import {TypeOrmModule} from '@nestjs/typeorm'
import { AgenteEntity } from "./Entities/agente.entity";
import { AgenteController } from "./Controllers/agente.controller";
import { AgenteService } from "./Service/agente.service";

@Module({
    imports:[TypeOrmModule.forFeature([AgenteEntity])],
    exports:[AgenteService],
    providers:[AgenteService],
    controllers:[AgenteController]
})

export class AgenteModule{}