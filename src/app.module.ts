import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { AgenteEntity } from './Agente/Entities/agente.entity';
import { AgenteModule } from './Agente/agente.module';
import { registroEntity } from './registroExecucoes/entities/RE.entity';
import { reModule } from './registroExecucoes/RE.module';
import { AuthModule } from './auth/auth.module';
import { usuarioEntity } from './usuario/entities/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [TypeOrmModule.forRoot({
  type:'mysql',
  port:3306,
  database:'IaAgente',
  password:'root',
  username:'root',
  host:'localhost',
  entities:[AgenteEntity,registroEntity,usuarioEntity],
  synchronize:false

}),AgenteModule,reModule ,AuthModule,UsuarioModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
