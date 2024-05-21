import { ApiProperty } from '@nestjs/swagger';
import { VaccineType } from '@prisma/client';

/**
 * DTO для создания вакцины
 *
 * @class
 */
export class CreateVaccineDto {
  /**
   * Наименование вакцины
   * @type {string}
   */
  @ApiProperty({
    example: 'Pfizer-BioNTech',
  })
  name: string;

  /**
   * Тип вакцины
   * @type {VaccineType}
   */
  @ApiProperty({ example: 'CALENDAR' })
  type: VaccineType;

  /**
   * Минимальный возраст для вакцинации
   * @type {number}
   */
  @ApiProperty({
    example: 12,
  })
  min_age: number;

  /**
   * Максимальный возраст для вакцинации
   * @type {number}
   */
  @ApiProperty({
    example: 52,
  })
  max_age: number;

  /**
   * Описание вакцины
   * @type {string}
   */
  @ApiProperty({
    example:
      'This vaccine is used to prevent COVID-19. It works by teaching the immune system how to recognize and fight the virus that causes COVID-19. This vaccine is usually given as 2 shots in the upper arm muscle spaced 3 weeks apart.',
  })
  description: string;
}
