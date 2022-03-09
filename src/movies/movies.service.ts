import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MovieDto } from './dto/movie.dto';
import { Movie } from './movies.model';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie) private movieRepository: typeof Movie) {}

  async findAll(): Promise<MovieDto[]> {
    return this.movieRepository.findAll();
  }

  async findById(id: number): Promise<MovieDto> {
    const movie = this.movieRepository.findByPk(id);
    if (!movie) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }
    return movie;
  }
}
