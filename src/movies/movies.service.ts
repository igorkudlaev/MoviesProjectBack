import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cast } from 'src/cast/cast.model';
import { CastService } from 'src/cast/cast.service';
import { StorageService } from 'src/storage/storage.service';
import { Trailer } from 'src/trailers/trailers.model';
import { TrailersService } from 'src/trailers/trailers.service';
import { CreateMovieDto } from './dto/create.movie.dto';
import { MovieDto } from './dto/movie.dto';
import { MovieInfoDto } from './dto/movie.info.dto';
import { Movie } from './movies.model';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie) private moviesRepository: typeof Movie,
    private storageService: StorageService,
    private castService: CastService,
    private trailersService: TrailersService,
  ) {}

  async findAll(): Promise<MovieDto[]> {
    return this.moviesRepository.findAll();
  }

  async findById(id: number): Promise<MovieDto> {
    const movie = this.moviesRepository.findByPk(id);
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
}
