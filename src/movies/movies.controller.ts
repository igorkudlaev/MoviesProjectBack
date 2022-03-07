import { Controller, Get, Param } from '@nestjs/common';
import { Movie } from './movies.model';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  async getAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.moviesService.findById(id);
  }
}
