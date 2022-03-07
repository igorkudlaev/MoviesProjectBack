import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
} from '@nestjs/common';
import CreateUserDto from 'src/users/dto/create.user.dto';
import { AuthService } from './auth.service';
import { TokensDto } from './dto/tokens.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<TokensDto> {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() user: CreateUserDto): Promise<TokensDto> {
    return this.authService.register(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
