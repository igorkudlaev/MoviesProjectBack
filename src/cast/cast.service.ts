import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cast } from './cast.model';
import { CreateTaskDto } from './dto/CreateCastDto';

@Injectable()
export class CastService {
  constructor(@InjectModel(Cast) private castRepository: typeof Cast) {}

  async create(createTaskDto: CreateTaskDto) {
    this.castRepository.bulkCreate(createTaskDto);
  }

  async findByMovieId(movieId: number) {
    return this.castRepository.findAll({
      where: {
        movieId,
      },
    });
  }
}
