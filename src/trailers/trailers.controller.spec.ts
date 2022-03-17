import { Test, TestingModule } from '@nestjs/testing';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { Auth } from '../auth/auth.decorator';
import { TrailersController } from './trailers.controller';
import { TrailersService } from './trailers.service';

describe('TrailersController', () => {
  let controller: TrailersController;

  const mockTrailersService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [NestjsFormDataModule],
      controllers: [TrailersController],
      providers: [
        TrailersService,
        {
          provide: Auth,
          useValue: jest.fn().mockImplementation(() => true),
        },
      ],
    })
      .overrideProvider(TrailersService)
      .useValue(mockTrailersService)
      .compile();

    controller = module.get<TrailersController>(TrailersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
