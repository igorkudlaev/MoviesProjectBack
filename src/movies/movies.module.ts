import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movie } from './movies.model';
import { CommentsModule } from 'src/comments/comments.module';
import { CastModule } from 'src/cast/cast.module';
import { FileSystemStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { TrailersModule } from 'src/trailers/trailers.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Movie]),
    CommentsModule,
    CastModule,
    TrailersModule,
    NestjsFormDataModule.config({
      storage: FileSystemStoredFile,
      fileSystemStoragePath: 'tmp/uploads',
    }),
  ],
  providers: [MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule {}
