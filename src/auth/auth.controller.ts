import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CookieService } from './shared/cookie.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SignUpBodyDto } from './dto/signup';
import { Response } from 'express';
import { AuthGuard } from './guards/auth.guard';
import { SignInBodyDto } from './dto/signin';
import { SessionInfo } from './decorators/session-info.decorator';
import { GetSessionInfoDto } from './dto/sessioninfo';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
  ) {}

  @Post('sign-in')
  @ApiOkResponse()
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
  @ApiOkResponse()
  async signUp(
    @Body() signUpDto: SignUpBodyDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.signUp(signUpDto);
    this.cookieService.setToken(res, accessToken);
  }

  @Post('sign-out')
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async signOut(@Res({ passthrough: true }) res: Response) {
    await this.authService.signOut(res);
  }

  @Post('session')
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    type: GetSessionInfoDto,
  })
  getSessionInfo(@SessionInfo() session: GetSessionInfoDto) {
    return session;
  }
}
