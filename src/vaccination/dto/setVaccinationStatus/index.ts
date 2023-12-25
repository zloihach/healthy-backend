import { IsBoolean, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO для установки статуса вакцинации
 *
 * @class
 */
export class SetVaccinationStatusBodyDto {
  /**
   * Идентификатор записи вакцинации
   * @type {number}
   */
  @ApiProperty({ type: 'integer', example: 1 })
  @IsInt()
  id: number;

  /**
   * Признак вакцинации
   * @type {boolean}
   */
  @ApiProperty({ type: 'boolean', example: true })
  @IsBoolean()
  isVaccinated: boolean;
}
