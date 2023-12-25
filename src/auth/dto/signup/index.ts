import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { Sex } from '../../enums/sex.enum';

/**
 * DTO для регистрации нового пользователя
 *
 * @class
 */
export class SignUpBodyDto {
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

  /**
   * Имя пользователя
   * @type {string}
   */
  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  firstname: string;

  /**
   * Фамилия пользователя
   * @type {string}
   */
  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  lastname: string;

  /**
   * Среднее имя пользователя (опционально)
   * @type {string|undefined}
   */
  @ApiProperty({ example: 'Some Middle Name', required: false })
  @IsOptional()
  midname?: string;

  /**
   * Дата рождения пользователя
   * @type {Date}
   */
  @ApiProperty({ example: '2000-01-01T00:00:00.000Z' })
  @IsDateString()
  @IsNotEmpty()
  dob: Date;

  /**
   * Пол пользователя (опционально)
   * @type {Sex|undefined}
   */
  @ApiProperty({ example: Sex.MALE })
  @IsOptional()
  @IsEnum(Sex)
  sex: Sex;
}
