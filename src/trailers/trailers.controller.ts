import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { Auth } from '../auth/auth.decorator';
import { UpdateTrailerDto } from './dto/update.trailer.dto';
import { Trailer } from './trailers.model';
import { TrailersService } from './trailers.service';

@ApiTags('Trailers')
@Controller('trailers')
export class TrailersController {
  constructor(private trailersService: TrailersService) {}

  @Auth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteById(@Param('id') trailerId: number): Promise<void> {
    return this.trailersService.deleteById(trailerId);
  }

  @Auth()
  @ApiConsumes('multipart/form-data')
  @Put('/:id')
  @FormDataRequest()
  async update(
    @Param('id') trailerId: number,
    @Body() updateTrailerDto: UpdateTrailerDto,
  ): Promise<Trailer> {
    return this.trailersService.updateById(trailerId, updateTrailerDto);
  }
}
