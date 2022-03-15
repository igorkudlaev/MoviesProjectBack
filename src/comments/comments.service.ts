import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comments.model';
import { CreateComment } from './types/create.comment';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment) private commentsRepository: typeof Comment,
  ) {}

  async create(createCommentDto: CreateComment): Promise<Comment> {
    return this.commentsRepository.create(createCommentDto);
  }

  async findAll(movieId: number): Promise<Comment[]> {
    return this.commentsRepository.findAll({
      where: {
        movieId,
      },
    });
  }
}
