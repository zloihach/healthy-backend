import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Express } from 'express';
import { Transform } from 'class-transformer';

export class CreatePublicationBodyDto {
  @ApiProperty({
    example: 'Full Title',
    description: 'Полное название публикации',
  })
  @IsString()
  @IsNotEmpty()
  readonly full_title: string;

  @ApiProperty({
    example: 'Short Title',
    description: 'Краткое название публикации',
  })
  @IsString()
  @IsNotEmpty()
  readonly short_title: string;

  @ApiProperty({
    example: 'Publication Text',
    description: 'Текст публикации',
  })
  @IsString()
  @IsNotEmpty()
  readonly text: string;

  @ApiProperty({
    type: Boolean,
    example: true,
    description: 'Статус активности публикации',
  })
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  @IsBoolean()
  readonly is_active: boolean;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Изображение публикации',
    required: false,
  })
  @IsOptional()
  readonly image?: Express.Multer.File;
}
