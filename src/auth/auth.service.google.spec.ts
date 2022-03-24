import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { getRedisToken } from '@liaoliaots/nestjs-redis';
import MockRedis from '../utils/mocks/redis.service';
import MockUserService from '../utils/mocks/user.service';
import AuthServiceGoogle from './auth.service.google';
import { OAuth2Client } from 'google-auth-library';
import { MockOauthClient } from '../utils/mocks/google.oauth.client';
import PasswordGenerator from './password.generator';

describe('AuthService', () => {
  let service: AuthServiceGoogle;
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
        {
          provide: OAuth2Client,
          useClass: MockOauthClient,
        },
        AuthServiceGoogle,
        PasswordGenerator,
      ],
    }).compile();

    service = module.get<AuthServiceGoogle>(AuthServiceGoogle);
  });
  it('should register user with gAuth', async () => {
    const tokens = await service.auth({ token: 'valid token' });
    expect(tokens).toHaveProperty('access_token');
    expect(tokens).toHaveProperty('refresh_token');
  });
});
