import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
// import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //cors
  app.enableCors();

  // somewhere in your initialization file
  app.use(helmet());

  // //csrf
  // app.use(csurf());

  //swagger
  const config = new DocumentBuilder()
    .setTitle('API SIM APP')
    .setTermsOfService('Backend SIM APP')
    .setVersion('1.0.0')
    .addTag('SIM APP')
    .addBasicAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
