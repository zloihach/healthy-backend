import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PasswordService } from './password/password.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpBodyDto } from './dto/signup';
import { CookieService } from './shared/cookie.service';
import { Response } from 'express';
import { RedisService } from '../../redis/redis.service';
import { User } from '@prisma/client';
import { GetCurrentUserDto } from './dto/get-current-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    private readonly cookieService: CookieService,
    private readonly redisService: RedisService,
  ) {}

  private readonly cacheKeyPrefix = 'auth:';

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

    await this.redisService.insert(
      this.cacheKeyPrefix + newUser.id,
      JSON.stringify(newUser),
    );
    console.log(
      `Redis: Inserted new user into cache with key ${
        this.cacheKeyPrefix + newUser.id
      }`,
    );

    return { accessToken };
  }

  async signIn(email: string, password: string) {
    const cachedUser = await this.redisService.get(this.cacheKeyPrefix + email);
    let user;
    if (cachedUser) {
      console.log(
        `Redis: Fetched user from cache with key ${
          this.cacheKeyPrefix + email
        }`,
      );
      user = JSON.parse(cachedUser);
    } else {
      user = await this.userService.findByEmail(email);
      if (user) {
        await this.redisService.insert(
          this.cacheKeyPrefix + email,
          JSON.stringify(user),
        );
        console.log(
          `Redis: Inserted user into cache with key ${
            this.cacheKeyPrefix + email
          }`,
        );
      }
    }

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
    console.log('User signed out and token removed from cookies');
  }

  async getMe(id: number): Promise<GetCurrentUserDto | null> {
    try {
      const user = await this.userService.getUserById(id);
      if (!user) {
        return null;
      }
      return this.toGetCurrentUserDto(user);
    } catch (error) {
      throw error;
    }
  }

  private toGetCurrentUserDto(user: User): GetCurrentUserDto {
    return {
      id: user.id,
      lastname: user.lastname,
      firstname: user.firstname,
      midname: user.midname,
      dob: user.dob,
      email: user.email,
      sex: user.sex,
      role: user.role,
      is_active: user.is_active,
      is_confirmed_email: user.is_confirmed_email,
      notification_period: user.notification_period,
      created_at: user.created_at,
      edited_at: user.edited_at,
    };
  }
}
