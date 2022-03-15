import { IsUrl } from 'class-validator';
import { FileSystemStoredFile, HasMimeType, IsFile } from 'nestjs-form-data';

export class CreateTrailerDto {
  @IsFile()
  @HasMimeType(['image/jpeg', 'image/png'])
  preview: FileSystemStoredFile;
  @IsUrl()
  url: string;
}
