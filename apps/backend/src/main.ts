import * as yaml from 'js-yaml';
import { writeFileSync } from 'node:fs';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { BackendModule } from './backend.module';

async function bootstrap() {
  const app = await NestFactory.create(BackendModule, { cors: { origin: ['http://localhost:4200', 'http://locahost:4300'] } });

  const config = new DocumentBuilder()
    .setTitle('Todo list')
    .setDescription('The todo API description')
    .setVersion('1.0')
    .addTag('todos')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const yamlString = yaml.dump(document);
  writeFileSync('openapi.yaml', yamlString);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
