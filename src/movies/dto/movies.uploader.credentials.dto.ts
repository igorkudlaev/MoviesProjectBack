import { IsNotEmpty, IsString } from 'class-validator';

export class MoviesUploaderCredentialsDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
  readonly grant_type?: string = 'password';
}
