import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CommentsService } from 'src/comments/comments.service';
import { MovieDto } from './dto/movie.dto';
import { MoviesService } from './movies.service';
import { Comment } from 'src/comments/comments.model';
import { Auth } from 'src/auth/auth.decorator';
import { CreateCommentDto } from './dto/create.comment.dto';
import { CreateMovieDto } from './dto/create.movie.dto';
import { FormDataRequest } from 'nestjs-form-data';
import { MovieInfoDto } from './dto/movie.info.dto';
import { CastService } from 'src/cast/cast.service';
import { Cast } from 'src/cast/cast.model';
import { Trailer } from 'src/trailers/trailers.model';
import { TrailersService } from 'src/trailers/trailers.service';
import { CreateMovieBody } from './decorators/create.movie.body';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(
    private moviesService: MoviesService,
    private commentsService: CommentsService,
    private castService: CastService,
    private trailersService: TrailersService,
  ) {}

  @Auth()
  @Get()
  async getAll(): Promise<MovieDto[]> {
    return this.moviesService.findAll();
  }

  @CreateMovieBody()
  @ApiConsumes('multipart/form-data')
  @Auth()
  @Post()
  @FormDataRequest()
  async createMovie(@Body() movie: CreateMovieDto): Promise<MovieInfoDto> {
    return this.moviesService.create(movie);
  }

  @Auth()
  @Get('/:id')
  async getById(@Param('id') id: number): Promise<MovieDto> {
    return this.moviesService.findById(id);
  }

  @Auth()
  @Get('/:id/comments')
  async getComments(@Param('id') movieId: number): Promise<Comment[]> {
    return this.commentsService.findAll(movieId);
  }

  @Auth()
  @Post('/:id/comments')
  async addComment(
    @Body() createCommentDto: CreateCommentDto,
    @Param('id') movieId,
    @Request() req,
  ): Promise<Comment> {
    return this.commentsService.create({
      movieId,
      userId: req.user.id,
      ...createCommentDto,
    });
  }

  @Auth()
  @Get('/:id/cast')
  async getCast(@Param('id') movieId: number): Promise<Cast[]> {
    return this.castService.findByMovieId(movieId);
  }

  @Auth()
  @Get('/:id/trailers')
  async getTrailers(@Param('id') movieId: number): Promise<Trailer[]> {
    return this.trailersService.findByMovieId(movieId);
  }
}
