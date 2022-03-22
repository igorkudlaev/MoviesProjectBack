import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Storage } from 'src/storage/storage.decorator';
import { IStorage } from 'src/storage/types/storage.interface';
import { HttpExceptionHandler } from '../utils/http.exception.handler';
import { CreateTrailerDto } from './dto/create.trailer.dto';
import { UpdateTrailerDto } from './dto/update.trailer.dto';
import { Trailer } from './trailers.model';

@Injectable()
export class TrailersService {
  constructor(
    @InjectModel(Trailer) private trailersRepository: typeof Trailer,
    @Storage('movies') private storageService: IStorage,
  ) {}
  async bulkCreate(trailers: CreateTrailerDto[]) {
    const uploadedTrailers = await Promise.all(
      trailers.map(async (trailer) => {
        const savedUrl = await this.storageService.uploadFile(
          trailer.preview.path,
        );
        return {
          ...trailer,
          preview: savedUrl,
        };
      }),
    );
    return this.trailersRepository.bulkCreate(uploadedTrailers);
  }
  async deleteByMovieId(movieId: number): Promise<number> {
    const trailers = await this.findByMovieId(movieId);
    trailers.forEach(async (trailer) => {
      await this.storageService.deleteFile(trailer.preview);
    });
    return this.trailersRepository.destroy({
      where: {
        movieId,
      },
    });
  }
  async findByMovieId(movieId: number): Promise<Trailer[]> {
    return this.trailersRepository.findAll({
      where: {
        movieId,
      },
    });
  }

  async findById(trailerId: number) {
    const trailer = await this.trailersRepository.findByPk(trailerId);
    if (!trailer) {
      throw new HttpException('Trailer not found', HttpStatus.NOT_FOUND);
    }
    return trailer;
  }

  async updateById(trailerId: number, { preview, ...rest }: UpdateTrailerDto) {
    try {
      const trailer = await this.findById(trailerId);
      if (preview) {
        await this.storageService.deleteFile(trailer.preview);
        const newUrl = await this.storageService.uploadFile(preview.path);
        trailer.preview = newUrl;
      }
      trailer.update({
        ...rest,
      });
      return await trailer.save();
    } catch (error) {
      new HttpExceptionHandler(error).throwIf(
        HttpStatus.NOT_FOUND,
        'the trailer cannot be updated as it has not been found',
      );
    }
  }

  async deleteById(trailerId: number): Promise<void> {
    try {
      const trailer = await this.findById(trailerId);
      await trailer.destroy();
    } catch (error) {
      new HttpExceptionHandler(error).throwIf(
        HttpStatus.NOT_FOUND,
        'the trailer cannot be deleted as it has not been found',
      );
    }
  }
}
