import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class BaseVaccinationDto {
  @ApiProperty({ example: 1, description: 'ID вакцины' })
  @IsNumber()
  readonly vaccine_id: number;

  @ApiProperty({
    example: 'Медицинский центр',
    description: 'Медицинский центр',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly medical_center?: string;

  @ApiProperty({ example: 1.0, description: 'Доза вакцины', required: false })
  @IsOptional()
  @IsNumber()
  readonly dose?: number;

  @ApiProperty({
    example: 'Серийный номер',
    description: 'Серийный номер',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly serial_number?: string;

  @ApiProperty({
    example: '2024-05-19T15:23:38.121Z',
    description: 'Дата вакцинации в формате ISO-8601',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  readonly vaccination_date?: string;

  @ApiProperty({
    example: '2024-06-19T15:23:38.121Z',
    description: 'Плановая дата вакцинации в формате ISO-8601',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  readonly planned_vaccination_date?: string;

  @ApiProperty({
    example: 'Комментарий',
    description: 'Комментарий',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly commentary?: string;

  @ApiProperty({
    example: true,
    description: 'Вакцинирован ли ребенок',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  readonly is_vaccinated?: boolean;
}

export class CreateVaccinationDto extends BaseVaccinationDto {}

export class UpdateVaccinationDto extends BaseVaccinationDto {}
