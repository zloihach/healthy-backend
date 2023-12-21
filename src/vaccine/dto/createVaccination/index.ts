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

  @ApiProperty({ type: 'string', required: false, example: 'Medical Center' })
  @IsString()
  @IsOptional()
  medicalCenter?: string;

  @ApiProperty({ type: 'number', required: false, example: 1 })
  @IsNumber()
  @IsOptional()
  dose?: number;

  @ApiProperty({ type: 'string', required: false, example: 'Serial Number' })
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
  vaccinationDate?: Date;

  @ApiProperty({ type: 'string', required: false, example: 'Comment' })
  @IsString()
  @IsOptional()
  commentary?: string;

  @ApiProperty({ type: 'boolean', example: true })
  @IsNotEmpty()
  @IsBoolean()
  isVaccinated: boolean;
}
