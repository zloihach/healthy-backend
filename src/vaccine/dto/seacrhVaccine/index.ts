import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VaccineType } from '@prisma/client';

/**
 * DTO для поиска вакцины
 *
 * @class
 */
export class SearchVaccineDto {
  /**
   * Ключевое слово для поиска вакцины
   * @type {string|undefined}
   */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: false, example: 'keyword' })
  keyword?: string;

  /**
   * Тип вакцины для фильтрации
   * @type {VaccineType|undefined}
   */
  @IsOptional()
  @IsEnum(VaccineType)
  @IsNotEmpty()
  @ApiProperty({ required: false, example: 'EPIDEMIOLOGY' })
  type?: VaccineType;
}
