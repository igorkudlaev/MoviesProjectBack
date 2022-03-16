import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Trailer } from './trailers.model';
import { TrailersService } from './trailers.service';
import { TrailersController } from './trailers.controller';
import { FileSystemStoredFile, NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    SequelizeModule.forFeature([Trailer]),
    NestjsFormDataModule.config({
      storage: FileSystemStoredFile,
      fileSystemStoragePath: 'tmp/uploads',
    }),
  ],
  providers: [TrailersService],
  exports: [TrailersService],
  controllers: [TrailersController],
})
export class TrailersModule {}
