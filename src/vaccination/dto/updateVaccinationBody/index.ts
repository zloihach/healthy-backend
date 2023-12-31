import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO для обновления информации о вакцинации
 *
 * @class
 */
export class UpdateVaccinationBodyDto {
  /**
   * Идентификатор записи вакцинации
   * @type {number}
   */
  @ApiProperty({ type: 'integer', example: 1 })
  @IsInt()
  vaccination_id: number;

  /**
   * Признак вакцинации
   * @type {boolean}
   */
  @ApiProperty({ type: 'boolean', example: true })
  @IsNotEmpty()
  @IsBoolean()
  is_vaccinated: boolean;

  /**
   * Медицинский центр
   * @type {string|undefined}
   */
  @ApiProperty({
    type: 'string',
    required: false,
    example: 'Медицинский центр',
  })
  @IsString()
  @IsOptional()
  medical_center?: string;

  /**
   * Доза вакцины
   * @type {number|undefined}
   */
  @ApiProperty({ type: 'number', required: false, example: 1 })
  @IsNumber()
  @IsOptional()
  dose?: number;

  /**
   * Серийный номер
   * @type {string|undefined}
   */
  @ApiProperty({ type: 'string', required: false, example: 'Серийный номер' })
  @IsString()
  @IsOptional()
  serial_number?: string;

  /**
   * Дата вакцинации
   * @type {Date|undefined}
   */
  @ApiProperty({ type: 'Date', required: true, example: '2023-01-01' })
  @IsNotEmpty()
  @Type(() => Date)
  vaccination_date?: Date;

  /**
   * Комментарий
   * @type {string|undefined}
   */
  @ApiProperty({ type: 'string', required: false, example: 'Комментарий' })
  @IsString()
  @IsOptional()
  commentary?: string;
}
