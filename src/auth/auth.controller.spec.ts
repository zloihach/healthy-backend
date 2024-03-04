import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CookieService } from './shared/cookie.service';
import { Response } from 'express';
import { SignUpBodyDto } from './dto/signup';
import { Sex } from './enums/sex.enum';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let cookieService: CookieService;
  let jwtService: Partial<JwtService>;

  beforeEach(async () => {
    const mockAuthService = {
      signIn: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
    };

    const mockCookieService = {
      setToken: jest.fn(),
      removeToken: jest.fn(),
    };

    jwtService = {
      signAsync: jest.fn().mockResolvedValue('mockAccessToken'),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: CookieService, useValue: mockCookieService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    cookieService = module.get<CookieService>(CookieService);
  });

  it('should call AuthService.signUp on POST sign-up', async () => {
    // Обновляем reqBody, чтобы он соответствовал ожиданиям SignUpBodyDto
    const reqBody: SignUpBodyDto = {
      email: 'newuser@example.com',
      password: 'password',
      firstname: 'Test',
      lastname: 'User',
      dob: new Date('1990-01-01'), // Добавляем недостающее поле dob
      sex: Sex.MALE, // Добавляем недостающее поле sex
      // Проверьте, необходимо ли добавить другие поля, если они определены в SignUpBodyDto
    };

    const resMock = { cookie: jest.fn() } as unknown as Response;
    jest
      .spyOn(authService, 'signUp')
      .mockResolvedValue({ accessToken: 'newUserToken' });

    await controller.signUp(reqBody, resMock);

    expect(authService.signUp).toHaveBeenCalledWith(reqBody);
    expect(cookieService.setToken).toHaveBeenCalledWith(
      resMock,
      'newUserToken',
    );
  });

  it('should call AuthService.signOut on POST sign-out', async () => {
    const resMock = { clearCookie: jest.fn() } as unknown as Response;

    await controller.signOut(resMock);

    expect(authService.signOut).toHaveBeenCalledWith(resMock);
  });

});
