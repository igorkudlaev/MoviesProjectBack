import { Test, TestingModule } from '@nestjs/testing';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { CommentsService } from '../comments/comments.service';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { CastService } from '../cast/cast.service';
import { TrailersService } from '../trailers/trailers.service';

describe('MoviesController', () => {
  let controller: MoviesController;
  const mockMovieService = {};
  const mockCommentsService = {
    create: jest.fn((dto) => {
      return {
        id: 1,
        ...dto,
      };
    }),
  };
  const mockCastService = {};
  const mockTrailersService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [NestjsFormDataModule],
      controllers: [MoviesController],
      providers: [MoviesService, CommentsService, CastService, TrailersService],
    })
      .overrideProvider(MoviesService)
      .useValue(mockMovieService)
      .overrideProvider(CommentsService)
      .useValue(mockCommentsService)
      .overrideProvider(CastService)
      .useValue(mockCastService)
      .overrideProvider(TrailersService)
      .useValue(mockTrailersService)
      .compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  it('should create a comment', async () => {
    expect(
      await controller.addComment({ message: 'test' }, 1, { user: { id: 1 } }),
    ).toEqual({
      id: expect.any(Number),
      message: 'test',
      movieId: 1,
      userId: 1,
    });
  });
});
