import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CookieService } from './shared/cookie.service';
import { PasswordService } from './password/password.service';
import { SignUpBodyDto } from './dto/signup';
import { Sex } from './enums/sex.enum';
import { SignInBodyDto } from './dto/signin';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: Partial<UsersService>;
  let jwtService: Partial<JwtService>;

  beforeEach(async () => {
    usersService = {
      findByEmail: jest.fn().mockResolvedValue(null),
      create: jest
        .fn()
        .mockImplementation((dto) =>
          Promise.resolve({ ...dto, id: Date.now() }),
        ),
    };
    jwtService = {
      signAsync: jest.fn().mockResolvedValue('mockAccessToken'),
    };

    const passwordServiceMock = {
      getHash: jest.fn().mockReturnValue('hashedPassword'),
      getSalt: jest.fn().mockReturnValue('somesalt'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
        { provide: CookieService, useValue: {} },
        { provide: PasswordService, useValue: passwordServiceMock },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should sign up a new user with all details', async () => {
    const signUpDto: SignUpBodyDto = {
      email: 'johndoe@mail.com',
      password: 'superStrongPassword',
      firstname: 'John',
      lastname: 'Doe',
      midname: 'Some Middle Name', // Это поле опционально
      dob: new Date('2000-01-01T00:00:00.000Z'),
      sex: Sex.MALE,
    };

    usersService.create = jest
      .fn()
      .mockImplementation((dto) => Promise.resolve({ ...dto, id: 1 }));

    const result = await authService.signUp(signUpDto);
    expect(result).toHaveProperty('accessToken');
    expect(usersService.findByEmail).toHaveBeenCalledWith(signUpDto.email);
    expect(usersService.create).toHaveBeenCalled();
  });

  it('should sign in a user with correct credentials', async () => {
    const signInDto: SignInBodyDto = {
      email: 'johndoe@mail.com',
      password: 'superStrongPassword',
    };

    const user = {
      ...signInDto,
      id: 1,
      salt: 'somesalt',
      hash: 'hashedPassword',
    };

    usersService.findByEmail = jest.fn().mockResolvedValue(user);
    const passwordServiceMock = {
      getHash: jest.fn().mockReturnValue(user.hash),
    };

    authService = new AuthService(
      usersService as any,
      passwordServiceMock as any,
      jwtService as any,
      {} as any,
    );

    const result = await authService.signIn(
      signInDto.email,
      signInDto.password,
    );
    expect(result).toHaveProperty('accessToken');
    expect(usersService.findByEmail).toHaveBeenCalledWith(signInDto.email);
  });

  it('should sign out a user', async () => {
    const resMock = {
      clearCookie: jest.fn(),
    };
    const cookieServiceMock = {
      removeToken: jest.fn(),
    };

    authService = new AuthService(
      {} as any,
      {} as any,
      {} as any,
      cookieServiceMock as any,
    );

    await authService.signOut(resMock as any);
    expect(cookieServiceMock.removeToken).toHaveBeenCalledWith(resMock);
  });
});
