import { NestFactory } from '@nestjs/core';
import { BackendModule } from './backend.module';

async function bootstrap() {
  const app = await NestFactory.create(BackendModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
