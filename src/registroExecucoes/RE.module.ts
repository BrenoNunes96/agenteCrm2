import { Module } from "@nestjs/common";
import { registroController } from "./controllers/RE.controllers";
import { registroService } from "./Service/RE.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { registroEntity } from "./entities/RE.entity";
import { AgenteService } from "../Agente/Service/agente.service";
import { AgenteEntity } from "../Agente/Entities/agente.entity";

@Module({
    imports:[TypeOrmModule.forFeature([registroEntity,AgenteEntity])],
    providers:[registroService,AgenteService],
    exports:[registroService,AgenteService],
    controllers:[registroController]

})

export class reModule {}