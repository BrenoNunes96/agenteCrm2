import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { AgenteEntity } from './Agente/Entities/agente.entity';
import { AgenteModule } from './Agente/agente.module';
import { registroEntity } from './registroExecucoes/entities/RE.entity';
import { reModule } from './registroExecucoes/RE.module';

import { usuarioEntity } from './usuario/entities/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { authModule } from './auth/authModule.module';
import { config } from 'process';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/prod.service';
import { devServices } from './data/services/dev.service';

@Module({
  imports: [
      ConfigModule.forRoot(),
  TypeOrmModule.forRootAsync({
    useClass:ProdService,
    imports:[ConfigModule]
  }) ,AgenteModule,reModule,authModule,UsuarioModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
