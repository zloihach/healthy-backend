import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CookieService } from './shared/cookie.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from './guards/auth.guard';
import { SessionInfo } from './decorators/session-info.decorator';
import { SignInBodyDto } from './dto/signin';
import { SignUpBodyDto } from './dto/signup';
import { GetSessionInfoDto } from './dto/sessioninfo';
import { RedisService } from '../../redis/redis.service';
import { GetCurrentUserDto } from './dto/get-current-user.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private redisService: RedisService,
  ) {}

  @Post('sign-in')
  @ApiOperation({ summary: 'Sign in user' })
  @ApiOkResponse({ description: 'User signed in successfully' })
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() body: SignInBodyDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.signIn(
      body.email,
      body.password,
    );
    this.cookieService.setToken(res, accessToken);
  }

  @Post('sign-up')
  @ApiOperation({ summary: 'Sign up user' })
  @ApiOkResponse({ description: 'User signed up successfully' })
  async signUp(
    @Body() signUpDto: SignUpBodyDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.signUp(signUpDto);
    this.cookieService.setToken(res, accessToken);
  }

  @Post('sign-out')
  @ApiOperation({ summary: 'Sign out user' })
  @ApiOkResponse({ description: 'User signed out successfully' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async signOut(@Res({ passthrough: true }) res: Response) {
    await this.authService.signOut(res);
  }

  @Post('session')
  @ApiOperation({ summary: 'Get session information' })
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'Session information fetched successfully',
    type: GetSessionInfoDto,
  })
  async getSessionInfo(@SessionInfo() session: GetSessionInfoDto) {
    const cacheKey = `session:${session.id}`;
    const cachedSession = await this.redisService.get(cacheKey);

    if (cachedSession) {
      console.log(
        `Redis: Fetched session info from cache with key ${cacheKey}`,
      );
      return JSON.parse(cachedSession);
    }

    await this.redisService.insert(cacheKey, JSON.stringify(session));
    console.log(`Redis: Inserted session info into cache with key ${cacheKey}`);

    return session;
  }

  @Get('get-me')
  @ApiOperation({ summary: 'Get user information' })
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'User information fetched successfully',
    type: GetCurrentUserDto,
  })
  async getMe(@SessionInfo() session: GetSessionInfoDto): Promise<GetCurrentUserDto | null> {
    return await this.authService.getMe(session.id);
  }
}
