import { FileSystemStoredFile, HasMimeType, IsFile } from 'nestjs-form-data';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { CreateTrailerDto } from './create.trailer.dto';
import { CreateCastDto } from './create.cast.dto';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsFile()
  @HasMimeType(['image/jpeg', 'image/png'])
  poster: FileSystemStoredFile;

  @IsNumber()
  @Type(() => Number)
  year: number;

  @IsNotEmpty()
  @IsString()
  duration: string;

  @IsNotEmpty()
  @IsString()
  rating: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCastDto)
  cast: CreateCastDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTrailerDto)
  @Transform(({ value }) => JSON.parse(value))
  trailers: CreateTrailerDto[];
}
