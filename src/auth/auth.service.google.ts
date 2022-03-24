import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginTicket, OAuth2Client } from 'google-auth-library';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import GoogleTokenDto from './dto/google.token.dto';
import { TokensDto } from './dto/tokens.dto';
import PasswordGenerator from './password.generator';

@Injectable()
export default class AuthServiceGoogle {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private passwordGenerator: PasswordGenerator,
    private client: OAuth2Client,
  ) {}

  async auth(googleTokenDto: GoogleTokenDto): Promise<TokensDto> {
    const ticket = await this.verify(googleTokenDto);
    const { email } = ticket.getPayload();
    const user = await this.usersService.findOne(email);

    if (user) {
      const tokens = await this.authService.login(user);
      return tokens;
    }
    const tokens = this.authService.register({
      username: email,
      password: this.passwordGenerator.generatePassword(),
    });
    return tokens;
  }

  private async verify(googleTokenDto: GoogleTokenDto): Promise<LoginTicket> {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: googleTokenDto.token,
        audience: this.client._clientId,
      });
      return ticket;
    } catch {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
