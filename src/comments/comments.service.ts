import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comments.model';
import { CreateCommentDto } from './dto/create.comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment) private commentsRepository: typeof Comment,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentsRepository.create(createCommentDto);
  }
}
