import { IsBoolean, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO для установки статуса публикации
 *
 * @class
 */
export class SetPublicationStatusBodyDto {
  /**
   * Идентификатор публикации
   * @type {number}
   */
  @ApiProperty({
    type: 'integer',
    example: 1,
    description: 'Идентификатор публикации',
  })
  @IsInt()
  id: number;

  /**
   * Статус активности публикации
   * @type {boolean}
   */
  @ApiProperty({
    type: 'boolean',
    example: true,
    description: 'Статус активности публикации',
  })
  @IsBoolean()
  is_active: boolean;
}
