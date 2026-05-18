import { InjectRepository } from "@nestjs/typeorm";
import { registroEntity } from "../entities/RE.entity";
import { Repository } from "typeorm";
import { HttpException, HttpStatus } from "@nestjs/common";
import { AgenteEntity } from "../../Agente/Entities/agente.entity";
import { AgenteService } from "../../Agente/Service/agente.service";

export class registroService{
constructor(@InjectRepository(registroEntity)  private readonly registroEntity: Repository<registroEntity> ,
private readonly agenteService:AgenteService
){}

async create(x:registroEntity):Promise<registroEntity | undefined>{
    let agenteBanco = await this.agenteService.findById(x.agente.id)  // procura no banco Agente , numero do agente que se quer relacionar 

console.log(x)

 if(agenteBanco?.Status ==='Ativo'){     // caso  seja  agente.Status ativo e caso exista o agente que se quer relacionar
 
x.totaldeTokens = x.quantidadeDeTokensDeSaida +x.quantidadeDeTokensDeEntrada // soma total de tokens
      
       agenteBanco['LimiteMaxMensal'] -= x.quantidadeDeTokensDeSaida +x.quantidadeDeTokensDeEntrada   // att limite deste agente

     if(agenteBanco.LimiteMaxMensal < 0 ){         // caso o limite do agente requisitado no registroexecucao esteja com limitemnesal menor que zero entao da BAD_REQUEST
        throw new HttpException("Limite excedido do ",HttpStatus.BAD_REQUEST)
      }   
      else if(agenteBanco.LimiteMaxToken < x.totaldeTokens ){
        throw new HttpException("Limite excedido de tokens do dia !",HttpStatus.BAD_REQUEST)
        
      }
     await this.agenteService.Updated(agenteBanco)        // atualiza o agente agora com o limitemensal atual
      
 return this.registroEntity.save(x)

    }  
        
}

    }



