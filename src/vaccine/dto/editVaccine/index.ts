import { IsNotEmpty, IsString, IsInt, Min, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VaccineType } from '@prisma/client';

/**
 * DTO для редактирования вакцины
 *
 * @class
 */
export class EditVaccineDto {
  /**
   * Наименование вакцины
   * @type {string}
   */
  @ApiProperty({ required: false, example: 'COVID-19 Vaccine' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  /**
   * Тип вакцины
   * @type {VaccineType}
   */
  @ApiProperty({ required: false, example: 'EPIDEMIOLOGY' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  type?: VaccineType;

  /**
   * Минимальный возраст для вакцинации
   * @type {number}
   */
  @ApiProperty({ required: false, example: 6 })
  @IsOptional()
  @IsInt()
  @Min(0)
  min_age?: number;

  /**
   * Максимальный возраст для вакцинации
   * @type {number}
   */
  @ApiProperty({ required: false, example: 18 })
  @IsOptional()
  @IsInt()
  @Min(0)
  max_age?: number;

  /**
   * Описание вакцины
   * @type {string}
   */
  @ApiProperty({ required: false, example: 'A vaccine for COVID-19' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;
}
