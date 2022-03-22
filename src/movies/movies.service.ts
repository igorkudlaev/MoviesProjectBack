import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cast } from '../cast/cast.model';
import { CastService } from '../cast/cast.service';
import { Trailer } from '../trailers/trailers.model';
import { TrailersService } from '../trailers/trailers.service';
import { HttpExceptionHandler } from '../utils/http.exception.handler';
import { CreateMovieDto } from './dto/create.movie.dto';
import { MovieDto } from './dto/movie.dto';
import { MovieInfoDto } from './dto/movie.info.dto';
import { Movie } from './movies.model';
import { Storage } from 'src/storage/storage.decorator';
import { IStorage } from 'src/storage/types/storage.interface';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie) private moviesRepository: typeof Movie,
    @Storage('movies') private storageService: IStorage,
    private castService: CastService,
    private trailersService: TrailersService,
  ) {}

  async findAll(): Promise<MovieDto[]> {
    return this.moviesRepository.findAll();
  }

  async findById(id: number): Promise<MovieDto> {
    const movie = await this.moviesRepository.findByPk(id);
    if (!movie) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }
    return movie;
  }

  async fullInfoById(id: number): Promise<MovieInfoDto> {
    const movie = this.moviesRepository.findByPk(id, {
      include: [Cast, Trailer],
    });
    if (!movie) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }
    return movie;
  }

  async create(createMovieDto: CreateMovieDto): Promise<MovieInfoDto> {
    const posterUrl = await this.storageService.uploadFile(
      createMovieDto.poster.path,
    );
    const movie = await this.moviesRepository.create({
      posterUrl,
      duration: createMovieDto.duration,
      rating: createMovieDto.rating,
      title: createMovieDto.title,
      year: createMovieDto.year,
    });
    await this.castService.create(
      createMovieDto.cast.map((item) => ({
        ...item,
        movieId: movie.id,
      })),
    );
    await this.trailersService.bulkCreate(
      createMovieDto.trailers.map((item) => ({
        ...item,
        movieId: movie.id,
      })),
    );
    return this.fullInfoById(movie.id);
  }

  async deleteById(movieId: number): Promise<number> {
    try {
      const movie = await this.findById(movieId);
      await this.trailersService.deleteByMovieId(movieId);
      await this.storageService.deleteFile(movie.posterUrl);
      return await this.moviesRepository.destroy({
        cascade: true,
        where: { id: movieId },
      });
    } catch (error) {
      new HttpExceptionHandler(error).throwIf(
        HttpStatus.NOT_FOUND,
        'the movie cannot be deleted because it has not been found',
      );
    }
  }
}
