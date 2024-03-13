import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

  //set version api
  app.setGlobalPrefix('api')
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ["1"]
  })
  //global validate
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  //public folder 
  app.useStaticAssets('public')

  await app.listen(Number(process.env.SV_PORT))
}
bootstrap();
