import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommentsService } from 'src/comments/comments.service';
import { MovieDto } from './dto/movie.dto';
import { MoviesService } from './movies.service';
import { Comment } from 'src/comments/comments.model';
import { Auth } from 'src/auth/auth.decorator';
import { CreateCommentDto } from './dto/create.comment.dto';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(
    private moviesService: MoviesService,
    private commentsService: CommentsService,
  ) {}

  @Auth()
  @Get()
  async getAll(): Promise<MovieDto[]> {
    return this.moviesService.findAll();
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
}
