import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // bật cors
  app.enableCors()
  // thêm "/api" vào url
  app.setGlobalPrefix("api")
  // thêm "v1" vào url
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ["1"]
  })
  // kích hoạt global validate
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  await app.listen(3000);
}
bootstrap();
