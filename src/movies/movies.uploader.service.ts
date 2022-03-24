import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { MoviesUploaderCredentialsDto } from './dto/movies.uploader.credentials.dto';
import { CredentialResponseDto } from './dto/credentials.response.dto';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { AxiosResponse } from 'axios';
import { MoviesUploaderResponseDto } from './dto/movies.uploader.response.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Movie } from './movies.model';
import { CastService } from 'src/cast/cast.service';

@Injectable()
export class MoviesUploaderService {
  constructor(
    @InjectModel(Movie) private moviesRepository: typeof Movie,
    private httpService: HttpService,
    private castService: CastService,
  ) {}

  private async auth(
    credentials: MoviesUploaderCredentialsDto,
  ): Promise<AxiosResponse<CredentialResponseDto, any>> {
    const observable = this.httpService.post<CredentialResponseDto>(
      'https://sarzhevsky.com/movies-api/Login',
      credentials,
    );
    observable.subscribe({
      error: (err) => {
        throw new HttpException('Invalid credentials', HttpStatus.FORBIDDEN);
      },
    });

    return firstValueFrom(observable);
  }

  async getMovie(
    credentials: MoviesUploaderCredentialsDto,
  ): Promise<MoviesUploaderResponseDto[]> {
    const { data } = await this.auth(credentials);
    const obesrvable = this.httpService
      .get<MoviesUploaderResponseDto[]>(
        'https://sarzhevsky.com/movies-api/Movies',
        {
          headers: {
            Authorization: 'Bearer ' + data.access_token,
          },
        },
      )
      .pipe(map(({ data }) => data));

    return lastValueFrom(obesrvable);
  }

  async getCast(
    credentials: MoviesUploaderCredentialsDto,
    id: number,
  ): Promise<string[]> {
    const { data } = await this.auth(credentials);
    const obesrvable = this.httpService
      .get<string[]>(`https://sarzhevsky.com//movies-api/Movies/${id}/Cast`, {
        headers: {
          Authorization: 'Bearer ' + data.access_token,
        },
      })
      .pipe(map(({ data }) => data));

    return lastValueFrom(obesrvable);
  }

  async seed(credentials: MoviesUploaderCredentialsDto) {
    const movies = await this.getMovie(credentials);
    const casts = await Promise.all(
      movies.map(async (movie) => {
        const cast = await this.getCast(credentials, movie.id);
        return cast.map((cast) => ({
          name: cast,
          movieId: movie.id,
        }));
      }),
    );

    this.moviesRepository.bulkCreate(
      movies.map((value) => {
        return {
          ...value,
          year: value.year.toString(),
        };
      }),
    );
    await this.castService.create(casts.flat());
  }
}
