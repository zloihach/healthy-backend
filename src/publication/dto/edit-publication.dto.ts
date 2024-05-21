import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Express } from 'express';
import { Transform } from 'class-transformer';

export class EditPublicationBodyDto {
  @ApiProperty({
    example: 1,
    description: 'Идентификатор публикации',
  })
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber()
  readonly id: number;

  @ApiProperty({
    example: 'Full Title',
    description: 'Полное название публикации',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly full_title?: string;

  @ApiProperty({
    example: 'Short Title',
    description: 'Краткое название публикации',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly short_title?: string;

  @ApiProperty({
    example: 'Publication Text',
    description: 'Текст публикации',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly text?: string;

  @ApiProperty({
    type: Boolean,
    example: true,
    description: 'Статус активности публикации',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  @IsBoolean()
  readonly is_active?: boolean;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Новое изображение публикации',
    required: false,
  })
  @IsOptional()
  readonly image?: Express.Multer.File;
}
