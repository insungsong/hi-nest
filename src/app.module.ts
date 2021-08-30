import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';

@Module({
  imports: [],
  controllers: [MoviesController], //controller: url을 가져오고 함수를 실행하는 역할 / node.js로 치면 express의 router같은 것이다.
  providers: [MoviesService],
})
export class AppModule {}
