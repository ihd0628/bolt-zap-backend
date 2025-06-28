import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // 프론트엔드와의 통신을 위해 CORS 활성화
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); // 데이터 유효성 검사기 전역 적용
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
