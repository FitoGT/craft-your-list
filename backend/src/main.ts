import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:5173'], // tu Vite dev server
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // si algún día usas cookies/sesiones
  });
  await app.listen(3000);

  // Log explícito para que veas que arrancó
  // (si no ves esto, el server NO está levantado)
  // Abre: http://localhost:3000/health
  console.log('Nest running on http://localhost:3000');
}
bootstrap();
