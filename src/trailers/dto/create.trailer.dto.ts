import { FileSystemStoredFile } from 'nestjs-form-data';

export class CreateTrailerDto {
  movieId: number;
  preview: FileSystemStoredFile;
  url: string;
}
