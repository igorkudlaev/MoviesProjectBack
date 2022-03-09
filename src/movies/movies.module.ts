import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movie } from './movies.model';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  imports: [SequelizeModule.forFeature([Movie]), CommentsModule],
  providers: [MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule {}
