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

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(
    private moviesService: MoviesService,
    private commentsService: CommentsService,
    private castService: CastService,
  ) {}

  @Auth()
  @Get()
  async getAll(): Promise<MovieDto[]> {
    return this.moviesService.findAll();
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        year: { type: 'number' },
        duration: { type: 'string' },
        rating: { type: 'string' },
        cast: {
          type: 'array',
          items: {
            properties: {
              name: { type: 'string' },
            },
          },
        },
        trailers: {
          type: 'array',
          items: {
            properties: {
              url: { type: 'string' },
            },
          },
        },
        poster: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
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
}
