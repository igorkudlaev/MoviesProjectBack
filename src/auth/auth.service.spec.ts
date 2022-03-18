import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { getRedisToken } from '@liaoliaots/nestjs-redis';
import MockRedis from '../utils/mocks/redis.service';
import CreateUserDto from 'src/users/dto/create.user.dto';
import MockUserService from '../utils/mocks/user.service';

describe('AuthService', () => {
  let service: AuthService;
  const existUser: CreateUserDto = {
    username: 'testuser',
    password: 'superpassword',
  };
  const newUser: CreateUserDto = {
    username: 'newuser',
    password: 'superpassword',
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'secret',
          signOptions: {
            expiresIn: 60 * 60,
          },
        }),
      ],
      providers: [
        AuthService,
        {
          provide: UsersService,
          useClass: MockUserService,
        },
        {
          provide: getRedisToken('default'),
          useClass: MockRedis,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should create a user and return tokens', async () => {
    const result = await service.register(newUser);
    expect(result).toHaveProperty('access_token');
    expect(result).toHaveProperty('refresh_token');
    expect(() => {
      return service.register(existUser);
    }).rejects.toThrow();
  });
  it('should generate new tokens', async () => {
    const tokens = await service.register(newUser);
    const newTokens = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(service.refresh(tokens));
      }, 1000);
    });
    expect(newTokens).toEqual({
      access_token: expect.not.stringMatching(tokens.access_token),
      refresh_token: expect.not.stringMatching(tokens.refresh_token),
    });
    expect(() => service.refresh(tokens)).rejects.toThrow();
  });
});
