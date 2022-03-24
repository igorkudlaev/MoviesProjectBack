import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import AuthServiceGoogle from './auth.service.google';
import PasswordGenerator from './password.generator';
import { OAuth2Client } from 'google-auth-library';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: 60 * 60,
      },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    AuthServiceGoogle,
    PasswordGenerator,
    {
      provide: OAuth2Client,
      useValue: new OAuth2Client(process.env.GOOGLE_CLIENT_ID),
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
