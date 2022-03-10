import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTrailerDto } from './dto/create.trailer.dto';
import { Trailer } from './trailers.model';

@Injectable()
export class TrailersService {
  constructor(
    @InjectModel(Trailer) private trailersRepository: typeof Trailer,
  ) {}
  async bulkCreate(trailers: CreateTrailerDto[]) {
    return this.trailersRepository.bulkCreate(trailers);
  }
}
