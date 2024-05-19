import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Sex } from '@prisma/client';
import { Transform } from 'class-transformer';

/**
 * DTO для создания учетной записи ребенка
 *
 * @class
 */
export class CreateChildDto {
  /**
   * Фамилия ребенка
   * @type {string}
   */
  @ApiProperty({ type: 'string', example: 'Иванов' })
  @IsString()
  lastname: string;

  /**
   * Имя ребенка
   * @type {string}
   */
  @ApiProperty({ type: 'string', example: 'Иван' })
  @IsString()
  firstname: string;

  /**
   * Отчество ребенка (опционально)
   * @type {string}
   */
  @ApiProperty({ type: 'string', example: 'Иванович', required: false })
  @IsOptional()
  @IsString()
  midname?: string;

  /**
   * Дата рождения ребенка
   * @type {string}
   */
  @ApiProperty({ type: 'string', format: 'date', example: '2015-06-01' })
  @IsDateString()
  dob: string;

  /**
   * Пол ребенка
   * @type {Sex}
   */
  @ApiProperty({ enum: Sex, example: Sex.MALE })
  @IsEnum(Sex)
  sex: Sex;

  /**
   * Признак активности учетной записи ребенка
   * @type {boolean}
   */
  @ApiProperty({ type: 'boolean', example: true })
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  @IsBoolean()
  is_active: boolean;
}
