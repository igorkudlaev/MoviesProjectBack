import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cast } from './cast.model';
import { CastService } from './cast.service';

@Module({
  imports: [SequelizeModule.forFeature([Cast])],
  providers: [CastService],
  exports: [CastService],
})
export class CastModule {}
