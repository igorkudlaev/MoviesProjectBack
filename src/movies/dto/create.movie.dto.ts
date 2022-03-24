import { FileSystemStoredFile, HasMimeType, IsFile } from 'nestjs-form-data';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTrailerDto } from './create.trailer.dto';
import { CreateCastDto } from './create.cast.dto';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsFile()
  @HasMimeType(['image/jpeg', 'image/png'])
  poster: FileSystemStoredFile;

  @IsString()
  @Type(() => String)
  year: string;

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
  trailers: CreateTrailerDto[];
}
