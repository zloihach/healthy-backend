import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO для создания новой публикации
 *
 * @class
 */
export class CreatePublicationBodyDto {
  /**
   * Полное название публикации
   * @type {string}
   */
  @ApiProperty({
    example: 'Full Title',
    description: 'Полное название публикации',
  })
  @IsString()
  @IsNotEmpty()
  full_title: string;

  /**
   * Краткое название публикации
   * @type {string}
   */
  @ApiProperty({
    example: 'Short Title',
    description: 'Краткое название публикации',
  })
  @IsString()
  @IsNotEmpty()
  short_title: string;

  /**
   * Текст публикации
   * @type {string}
   */
  @ApiProperty({ example: 'Publication Text', description: 'Текст публикации' })
  @IsString()
  @IsNotEmpty()
  text: string;

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

  /**
   * Ссылка на изображение публикации
   * @type {string}
   */
  @ApiProperty({
    example: 'https://your-cdn-url.com/path/to/image.jpg',
    description: 'Ссылка на изображение публикации',
  })
  @IsString()
  @IsNotEmpty()
  image_url: string;
}
