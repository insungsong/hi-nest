import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('shold return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should resturn a movie', () => {
      service.createMovie({
        title: 'testMovie',
        genres: ['test'],
        year: 2021,
      });

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 Error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movies', () => {
      service.createMovie({
        title: 'testMovie',
        genres: ['test'],
        year: 2021,
      });

      const beforeDeleteMovies = service.getAll().length;
      service.deleteMovie(1);
      const afterDelete = service.getAll().length;

      expect(afterDelete).toBeLessThan(beforeDeleteMovies);
    });

    it('should return a 404', () => {
      try {
        service.deleteMovie(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.createMovie({
        title: 'testMovie',
        genres: ['test'],
        year: 2021,
      });

      const afterCreate = service.getAll().length;
      console.log(beforeCreate, afterCreate);

      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.createMovie({
        title: 'testMovie',
        genres: ['test'],
        year: 2021,
      });

      service.updateMovie(1, { title: 'updated Test' });

      const movie = service.getOne(1);

      expect(movie.title).toEqual('updated Test');

      // it('should throw a NotFoundException 404', () => {
      //   try {
      //     service.updateMovie(999, {});
      //   } catch (e) {
      //     expect(e).toBeInstanceOf(NotFoundException);
      //   }
      // });
    });
  });
});
