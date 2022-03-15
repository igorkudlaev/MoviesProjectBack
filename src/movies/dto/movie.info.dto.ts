import { Cast } from 'src/cast/cast.model';
import { Trailer } from 'src/trailers/trailers.model';
import { MovieDto } from './movie.dto';

export class MovieInfoDto extends MovieDto {
  cast: Cast[];
  trailers: Trailer[];
}
