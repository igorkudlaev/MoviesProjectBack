import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.model';
import { TokensDto } from './dto/tokens.dto';
import CreateUserDto from 'src/users/dto/create.user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.usersService.findOne(username);
    if (user) {
      const passValid = await bcrypt.compare(pass, user.password);
      if (passValid) {
        return user;
      }
    }
    return null;
  }
  async login(user: User): Promise<TokensDto> {
    const payload = { username: user.username, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userDto: CreateUserDto): Promise<TokensDto> {
    const user = await this.usersService.findOne(userDto.username);
    if (user) {
      throw new HttpException('User alredy exists', HttpStatus.CONFLICT);
    }
    const hashedPass = await bcrypt.hash(userDto.password, 5);
    const createdUser = await this.usersService.create({
      username: userDto.username,
      password: hashedPass,
    });
    return this.login(createdUser);
  }
}
