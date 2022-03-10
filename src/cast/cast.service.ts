import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cast } from './cast.model';
import { CreateCastDto } from './dto/create.cast.dto';

@Injectable()
export class CastService {
  constructor(@InjectModel(Cast) private castRepository: typeof Cast) {}

  async create(createCastDto: CreateCastDto[]) {
    return this.castRepository.bulkCreate(createCastDto);
  }

  async findByMovieId(movieId: number) {
    return this.castRepository.findAll({
      where: {
        movieId,
      },
    });
  }
}
