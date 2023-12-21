import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  IsOptional,
  IsNumber,
  IsDateString,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';

export class CreateVaccinationDto {
  @ApiProperty({ type: 'integer', example: 1 })
  @IsInt()
  vaccineId: number;

  @ApiProperty({ type: 'integer', example: 1 })
  @IsInt()
  userId: number;

  @ApiProperty({
    type: 'string',
    required: false,
    example: 'Медицинский центр',
  })
  @IsString()
  @IsOptional()
  medicalCenter?: string;

  @ApiProperty({ type: 'number', required: false, example: 1 })
  @IsNumber()
  @IsOptional()
  dose?: number;

  @ApiProperty({ type: 'string', required: false, example: 'Серийный номер' })
  @IsString()
  @IsOptional()
  serialNumber?: string;

  @ApiProperty({
    type: 'string',
    required: false,
    example: '2023-01-01',
  })
  @IsDateString()
  @IsOptional()
  vaccinationDate?: string; // Измените тип на строку для примера

  @ApiProperty({ type: 'string', required: false, example: 'Комментарий' })
  @IsString()
  @IsOptional()
  commentary?: string;

  @ApiProperty({ type: 'boolean', example: true })
  @IsNotEmpty()
  @IsBoolean()
  isVaccinated: boolean;
}
