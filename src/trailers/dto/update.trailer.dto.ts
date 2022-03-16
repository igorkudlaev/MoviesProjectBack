import { IsUrl, ValidateIf } from 'class-validator';
import { FileSystemStoredFile, HasMimeType, IsFile } from 'nestjs-form-data';

export class UpdateTrailerDto {
  @IsUrl()
  @ValidateIf((value) => value.url)
  url?: string;
  @IsFile()
  @HasMimeType(['image/jpeg', 'image/png'])
  @ValidateIf((value) => value.preview)
  preview?: FileSystemStoredFile;
}
