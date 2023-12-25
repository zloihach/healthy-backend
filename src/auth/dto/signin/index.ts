import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

/**
 * DTO для входа в систему
 *
 * @class
 */
export class SignInBodyDto {
  /**
   * Адрес электронной почты пользователя
   * @type {string}
   */
  @ApiProperty({ example: 'johndoe@mail.com' })
  @IsEmail()
  email: string;

  /**
   * Пароль пользователя
   * @type {string}
   */
  @ApiProperty({ example: 'superStrongPassword' })
  @IsNotEmpty()
  password: string;
}
