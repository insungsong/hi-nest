import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === +id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID: ${id} not found.`);
    }
    return movie;
  }

  deleteMovie(id: number): Movie[] {
    //무비가 존재하는 지 확인
    this.getOne(id);

    //무비가 존재한다면 해당 존재하던 무비를 제외한 나머지 무비를 return
    return this.movies.filter((movie) => {
      return movie.id !== +id;
    });
  }

  createMovie(movieData) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  updateMovie(id: number, updateData) {
    this.getOne(id);

    const filterMovies = this.deleteMovie(id);

    this.movies = filterMovies;

    this.movies.push({ id, ...updateData });

    return true;
  }
}
