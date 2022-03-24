import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CommentsService } from '../comments/comments.service';
import { MovieDto } from './dto/movie.dto';
import { MoviesService } from './movies.service';
import { Comment } from '../comments/comments.model';
import { Auth } from '../auth/auth.decorator';
import { CreateCommentDto } from './dto/create.comment.dto';
import { CreateMovieDto } from './dto/create.movie.dto';
import { FormDataRequest } from 'nestjs-form-data';
import { MovieInfoDto } from './dto/movie.info.dto';
import { CastService } from '../cast/cast.service';
import { Cast } from '../cast/cast.model';
import { Trailer } from '../trailers/trailers.model';
import { TrailersService } from '../trailers/trailers.service';
import { CreateMovieBody } from './decorators/create.movie.body';
import { CreateTrailerDto } from './dto/create.trailer.dto';
import { CreateTrailerBody } from './decorators/create.trailer.body';
import { MoviesUploaderService } from './movies.uploader.service';
import { MoviesUploaderCredentialsDto } from './dto/movies.uploader.credentials.dto';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(
    private moviesService: MoviesService,
    private commentsService: CommentsService,
    private castService: CastService,
    private trailersService: TrailersService,
    private moviesUploaderService: MoviesUploaderService,
  ) {}

  @Auth()
  @Get()
  async getAll(): Promise<MovieDto[]> {
    return this.moviesService.findAll();
  }

  @Post('seed')
  async seed(@Body() credentials: MoviesUploaderCredentialsDto) {
    return this.moviesUploaderService.seed(credentials);
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
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteById(@Param('id') id: number): Promise<number> {
    return this.moviesService.deleteById(id);
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

  @CreateTrailerBody()
  @Auth()
  @ApiConsumes('multipart/form-data')
  @Post('/:id/trailers')
  async createTrailer(
    @Param('id') movieId: number,
    @Body() createTrailerDto: CreateTrailerDto,
  ): Promise<Trailer[]> {
    return this.trailersService.bulkCreate([{ ...createTrailerDto, movieId }]);
  }
}
