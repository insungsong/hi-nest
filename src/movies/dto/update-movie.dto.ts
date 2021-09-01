import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

//PartialType는 베이스 타입이 필요하다. UpdateMovieDto는 CreateDTO랑 다를게 없다. columne들이 필수 사항이 아닌것만 뺴면 말이다 그래서 partialType을 쓴것이다.
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
