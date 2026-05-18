import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';

describe('Testes dos Módulos Usuario e Auth (e2e)', () => {

  let token: any;
  let usuarioId: any;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [__dirname + "./../src/**/entities/*.entity.ts"],
          synchronize: true,
          dropSchema: true,
        }),
        AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  })

  it("01 - Deve Cadastrar um novo Usuário", async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuario/registrar')
      .send({

        usuario: 'root@root.com',
        senha: 'rootroot',
      })
      .expect(201)

    usuarioId = resposta.body.id;

  });

  it("02 - Não Deve Cadastrar um Usuário Duplicado", async () => {
    await request(app.getHttpServer())
      .post('/usuario/registrar')
      .send({
      
        usuario: 'root@root.com',
        senha: 'rootroot',
      })
      .expect(400)

  });

  it("03 - Deve Autenticar o Usuário (Login)", async () => {
    const resposta = await request(app.getHttpServer())
    .post("/usuarios/logar")
    .send({
      usuario: 'root@root.com',
      senha: 'rootroot',
    })
    .expect(200)

    token = resposta.body.token;

  })

  it("04 - Deve Listar todos os Usuários", async () => {
    return request(app.getHttpServer())
    .get('/usuario/')
    .set('Authorization', `${token}`)
    .send({})
    .expect(200)
  })

  it("05 - Deve Atualizar um Usuário", async () => {

    console.log("ID RECUPERADO NO TESTE 01:", usuarioId);

    const resposta = await request(app.getHttpServer())
      .put('/usuario/atualizar')
      .set('Authorization', `${token}`)
      .send({
        id: usuarioId,
        usuario: 'usuario_atualizado@root.com',
        senha: 'nova_senha_root',
      });

   
    if (resposta.status !== 200) {
      console.log("ERRO INTERNO DA API NO TESTE 05:", resposta.body);
    }

   
    expect(resposta.status).toBe(200);
    
   
    expect(resposta.body.usuario).toEqual('usuario_atualizado@root.com');
  });

});
