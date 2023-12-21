import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
  IsDate,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';

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

  @ApiProperty({ type: 'Date', required: true, example: '2023-01-01' })
  @IsNotEmpty()
  @Type(() => Date)
  vaccinationDate?: Date;

  @ApiProperty({ type: 'string', required: false, example: 'Комментарий' })
  @IsString()
  @IsOptional()
  commentary?: string;

  @ApiProperty({ type: 'boolean', example: true })
  @IsNotEmpty()
  @IsBoolean()
  isVaccinated: boolean;
}
