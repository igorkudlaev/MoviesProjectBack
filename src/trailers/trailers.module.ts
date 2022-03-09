import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Trailer } from './trailers.model';
import { TrailersService } from './trailers.service';

@Module({
  imports: [SequelizeModule.forFeature([Trailer])],
  providers: [TrailersService],
})
export class TrailersModule {}
