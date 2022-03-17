import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { Redis } from 'ioredis';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from '@liaoliaots/nestjs-redis';

describe('AuthService', () => {
  let service: AuthService;
  const mockRedis = {};
  const mockUserService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'secret',
          signOptions: {
            expiresIn: 60 * 60,
          },
        }),
        RedisModule,
      ],
      providers: [
        AuthService,

        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
