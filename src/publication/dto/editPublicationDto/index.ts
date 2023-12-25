import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO для редактирования публикации
 *
 * @class
 */
export class EditPublicationBodyDto {
  /**
   * Идентификатор публикации
   * @type {number}
   */
  @ApiProperty({ example: 1, description: 'Идентификатор публикации' })
  @IsInt()
  id: number;

  /**
   * Полное название публикации
   * @type {string}
   */
  @ApiProperty({
    required: false,
    example: 'Full Title',
    description: 'Полное название публикации',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  full_title?: string;

  /**
   * Краткое название публикации
   * @type {string}
   */
  @ApiProperty({
    required: false,
    example: 'Short Title',
    description: 'Краткое название публикации',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  short_title?: string;

  /**
   * Текст публикации
   * @type {string}
   */
  @ApiProperty({
    required: false,
    example: 'Publication Text',
    description: 'Текст публикации',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  text?: string;

  /**
   * Статус активности публикации
   * @type {boolean}
   */
  @ApiProperty({
    required: false,
    type: 'boolean',
    example: true,
    description: 'Статус активности публикации',
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
