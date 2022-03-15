import { IsUrl } from 'class-validator';

export class CreateTrailerDto {
  @IsUrl()
  url: string;
}
