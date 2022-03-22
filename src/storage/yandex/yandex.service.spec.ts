import { Test, TestingModule } from '@nestjs/testing';
import { YandexService } from './yandex.service';

describe('YandexService', () => {
  let service: YandexService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YandexService],
    }).compile();

    service = module.get<YandexService>(YandexService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
