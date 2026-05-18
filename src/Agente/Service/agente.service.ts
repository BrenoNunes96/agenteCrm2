import { InjectRepository } from "@nestjs/typeorm";
import { AgenteEntity } from "../Entities/agente.entity";
import { Any, ILike, Index, Repository } from "typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeleteResult } from "typeorm/browser";
import { registroEntity } from "../../registroExecucoes/entities/RE.entity";
import { totalmem } from "os";

@Injectable()
export class AgenteService{

    constructor(@InjectRepository(AgenteEntity)    private readonly agente:Repository<AgenteEntity> ){ }


async Create (x:AgenteEntity):Promise<AgenteEntity>{
let  name = await this.findByName(x.NomeAgente)
  if(name){throw new HttpException("agente ja existente com mesmo nome",HttpStatus.BAD_REQUEST)}
return await this.agente.save(x)
 
}

async Findall():Promise<AgenteEntity []>{

  return await this.agente.find({relations:{registroExecucao:true}})  
}


async findByName(NomeAgente:string):Promise<AgenteEntity | null>{

     
  if(!NomeAgente){ throw new HttpException("não foi possivel achar o nome do agente",HttpStatus.NOT_FOUND)}

    return this.agente.findOne({where:{NomeAgente:ILike(`%${NomeAgente}%`)},relations:{registroExecucao:true}})
}



async findById(id:number):Promise<AgenteEntity | null>{

return await this.agente.findOne({where:{id},relations:{registroExecucao:true}})


}


async Updated(x:AgenteEntity):Promise<AgenteEntity>{
    await this.findById(x.id) // verifica se existe o agente pelo id

  let nomeAgente = await this.findByName(x['NomeAgente']) // verifica agente por nome 

  if(nomeAgente && nomeAgente.id !== x.id ){ throw new HttpException("não pode repetir o nome do agente !", HttpStatus.BAD_REQUEST)}
     return this.agente.save(x)

} 



async Delete(id:number):Promise<DeleteResult>{
return await this.agente.delete(id)

}



async mediaTokens():Promise<any>{
  let agenteFinal:Array<any> =[]  // array de objetos ordenado com nome do agente e media
  let registroExecucao:Array<any> = []        //MEDIA DE CADA AGENTE SOMAR CADA TOTAL DE TOKEN DE CADA EXECUCAO E COLOCAR NUMA LSITA EM ORDEM CRESCENTE
let agente = await this.Findall()    // procurar todos os agentes
let accAcum :Array<any>= []

for(let x of agente){  // procura agente
 

registroExecucao.push([{[x.id]:x.registroExecucao}])  // coloca o registroExecucao do agente + mais o id dele


}

for(let x of registroExecucao){    // entra no array registroexecucao
for(let y of x){                   // entra no inidice

  let indice =Number(Object.keys(y)[0]) // 5 ou 1  indice entrado com sucesso 


for(let i of y[indice]){          // entrei no objeto registroexecucao de cada agente

 accAcum.push({[Object.keys(y)[0]] : i["totaldeTokens"]}) // [ {"1":45} {"5":54}]


}


}

}



let mediaTokensAgente = accAcum.reduce((acc,item)=>{  // cada looping  um agente diferente     ** Object.keys(item)[0] é o indice q ta em accAccum
   
if(!acc[Object.keys(item)[0]]){ 
acc[Object.keys(item)[0]] = {media:0,somando:0, contador : 0}    // se nao tiver o primeiro indice ,sera igual a media somando e contando zero


}


acc[Object.keys(item)[0]].somando +=item[Object.keys(item)[0]]     // {"1":somando:99}
acc[Object.keys(item)[0]].contador  += 1           // {"1":contador:1}
acc[Object.keys(item)[0]].media = acc[Object.keys(item)[0]].somando / acc[Object.keys(item)[0]].contador // {"1":{media:79.9}}



return acc


},{})
let pushmediaOrdenado: Array<any> = [];
pushmediaOrdenado.push(mediaTokensAgente); // coloca em array cada indice com media etc

console.log(pushmediaOrdenado)

let agenteOrdem: Array<any> = [];

for (let x of pushmediaOrdenado) {     

  for (let chave in x) {      // entra no indice
     
    agenteOrdem.push({
      agente: chave,           // pega o nome da chave ('1' ou '5')
      media: x[chave].media,   // Object.keys(x)[0] **indice
    
    })   // acessa o valor da média daquela chave ;
  }
}
agenteOrdem.sort((a, b) => a.media - b.media); // colocando em ordem de media os agente com agente :id e media :x[chave].media

console.log(agenteOrdem)
for(let x of agenteOrdem){     // entra em agente ex : agente : "1", media:"49.9"
  agenteFinal = agenteOrdem.map((x) =>  {

let agenteNome=agente.find((a)=> a.id == Number(x.agente))   // achando id dentro de agentes todos com id de agenteOrdem
 
if(agenteNome){  // caso tenha um agente em comum retorna um novo objeto 
  return {
    agente: agenteNome?.NomeAgente,
    media:x.media

  }
}else{
    console.log('nenhum agente achado')
  }

}

)
console.log(agenteFinal)


}
return agenteFinal
}

}