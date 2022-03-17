import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { CastService } from '../cast/cast.service';
import { TrailersService } from '../trailers/trailers.service';
import { StorageService } from '../storage/storage.service';
import { Movie } from './movies.model';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create.movie.dto';
import { PassThrough } from 'stream';
import { CreateCastDto } from './dto/create.cast.dto';
import { FileSystemStoredFile } from 'nestjs-form-data';

describe('MoviesService', () => {
  let service: MoviesService;
  const mockMovieRepository = {
    create: jest
      .fn()
      .mockImplementation((movie) =>
        Promise.resolve({ id: Date.now(), ...movie }),
      ),
  };
  const mockStorageService = {
    uploadFile: jest.fn().mockImplementation((path: string) => path),
  };
  const mockCastService = {
    create: jest.fn().mockImplementation((cast: Array<CreateCastDto>) =>
      cast.map((item) => ({
        id: Date.now(),
        ...item,
      })),
    ),
  };
  const mockTrailersService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getModelToken(Movie),
          useValue: mockMovieRepository,
        },
        {
          provide: StorageService,
          useValue: mockStorageService,
        },
        {
          provide: CastService,
          useValue: mockCastService,
        },
        {
          provide: TrailersService,
          useValue: mockTrailersService,
        },
      ],
    })
      .overrideProvider(StorageService)
      .useValue(mockStorageService)
      .compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', async () => {
    const createMovieDto: CreateMovieDto = {
      cast: [],
      duration: '44m',
      poster: await FileSystemStoredFile.create(
        'test',
        'utf-8',
        'image/jpeg',
        new PassThrough(),
        {},
      ),
      rating: '7.7',
      title: 'test',
      trailers: [
        {
          preview: await FileSystemStoredFile.create(
            'test',
            'utf-8',
            'image/jpeg',
            new PassThrough(),
            {},
          ),
          url: '',
        },
      ],
      year: 2020,
    };
    expect(service.create(createMovieDto)).toBeDefined();
  });
});
