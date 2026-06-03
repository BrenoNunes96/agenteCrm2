import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import process from 'process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
const config = new DocumentBuilder()
.setTitle("agente de ia")
.setContact("breno nunes","www.agente.com","brenocp3@live.com")
.setVersion("1.0")
.addBearerAuth()
.build()
const document = SwaggerModule.createDocument(app,config)

SwaggerModule.setup("swagger",app,document)

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
