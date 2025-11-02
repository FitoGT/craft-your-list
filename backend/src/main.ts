import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  // Log explícito para que veas que arrancó
  // (si no ves esto, el server NO está levantado)
  // Abre: http://localhost:3000/health
  console.log('Nest running on http://localhost:3000');
}
bootstrap();
