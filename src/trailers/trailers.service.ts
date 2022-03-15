import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { StorageService } from 'src/storage/storage.service';
import { CreateTrailerDto } from './dto/create.trailer.dto';
import { Trailer } from './trailers.model';

@Injectable()
export class TrailersService {
  constructor(
    @InjectModel(Trailer) private trailersRepository: typeof Trailer,
    private storageService: StorageService,
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
  async findByMovieId(movieId: number): Promise<Trailer[]> {
    return this.trailersRepository.findAll({
      where: {
        movieId,
      },
    });
  }
}
