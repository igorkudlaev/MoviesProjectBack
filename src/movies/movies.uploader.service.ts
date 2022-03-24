import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { MoviesUploaderCredentialsDto } from './dto/movies.uploader.credentials.dto';
import { CredentialResponseDto } from './dto/credentials.response.dto';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { AxiosResponse } from 'axios';
import { MoviesUploaderResponseDto } from './dto/movies.uploader.response.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Movie } from './movies.model';

@Injectable()
export class MoviesUploaderService {
  constructor(
    @InjectModel(Movie) private moviesRepository: typeof Movie,
    private httpService: HttpService,
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

  async download(
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

  async seed(credentials: MoviesUploaderCredentialsDto) {
    const movies = await this.download(credentials);
    console.log(movies);

    return this.moviesRepository.bulkCreate(
      movies.map((value) => {
        return {
          ...value,
          year: value.year.toString(),
        };
      }),
    );
  }
}
