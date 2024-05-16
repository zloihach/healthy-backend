import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class CookieService {
  static tokenKey = 'access-token';

  setToken(res: Response, token: string) {
    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie(CookieService.tokenKey, token, {
      httpOnly: false,
      sameSite: isProduction ? 'none' : 'lax', // 'lax' or 'strict' for local testing
      secure: isProduction, // Only secure in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
  }

  removeToken(res: Response) {
    res.clearCookie(CookieService.tokenKey);
  }
}
