import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';

@Module({
  imports: [MoviesModule],
  controllers: [AppController], //controller: url을 가져오고 함수를 실행하는 역할 / node.js로 치면 express의 router같은 것이다.
  providers: [],
})
export class AppModule {}
