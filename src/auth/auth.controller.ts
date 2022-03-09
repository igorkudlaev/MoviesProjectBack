import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import CreateUserDto from 'src/users/dto/create.user.dto';
import { AuthService } from './auth.service';
import { TokensDto } from './dto/tokens.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({ type: CreateUserDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<TokensDto> {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() user: CreateUserDto): Promise<TokensDto> {
    return this.authService.register(user);
  }

  @Post('refresh')
  async refresh(@Body() tokens: TokensDto) {
    return this.authService.refresh(tokens);
  }
}
