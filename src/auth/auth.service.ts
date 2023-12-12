import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PasswordService } from './password/password.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpBodyDto } from './dto/signup';
import { CookieService } from './cookie/cookie.service';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    private readonly cookieService: CookieService,
  ) {}

  async signUp(signUpBodyDto: SignUpBodyDto) {
    const user = await this.userService.findByEmail(signUpBodyDto.email);
    if (user) {
      throw new BadRequestException('Email already exists');
    }
    const salt = this.passwordService.getSalt();
    const hash = this.passwordService.getHash(signUpBodyDto.password, salt);
    const newUser = await this.userService.create(
      {
        ...signUpBodyDto,
      },
      salt,
      hash,
    );
    const accessToken = await this.jwtService.signAsync({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    });
    return { accessToken };
  }

  async signIn(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const hash = this.passwordService.getHash(password, user.salt);
    if (hash !== user.hash) {
      throw new UnauthorizedException();
    }
    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    return { accessToken };
  }

  async signOut(res: Response) {
    this.cookieService.removeToken(res);
  }
}
