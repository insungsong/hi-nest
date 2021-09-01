import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //유효성 검사 파이프
  //express.js 미들웨어를 만드는것과 같다.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //true로 설정하면 유효성 검사기는 유효성 검사 데코레이터를 사용하지 않는 모든 속성의 유효성이 검사된(반환된) 객체를 제거합니다.
      forbidNonWhitelisted: true, //true로 설정하면 화이트리스트에 없는 속성을 제거하는 대신 유효성 검사기가 예외를 throw합니다
      transform: true, //url에 들어오는 값이 string인데 내가 db설정으로 받는 props를 number로 하고 싶을때 실제 원하는 타입으로 변환시켜준다.
    }),
  );
  await app.listen(3000);
}
bootstrap();
