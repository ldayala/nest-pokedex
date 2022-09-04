import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    })
   )
  app.setGlobalPrefix('api/v2')//para ponerle un f¡prefijo global a las endpoint
  await app.listen(3000);
}
bootstrap();
