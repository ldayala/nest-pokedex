import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform:true,// esta opcion y la siguiente es para que nos transforme automaticamente los parametros de los dto
    transformOptions:{
      enableImplicitConversion:true
    }
    })
   )
  app.setGlobalPrefix('api/v2')//para ponerle un f¡prefijo global a las endpoint
  await app.listen(3000);
}
bootstrap();
