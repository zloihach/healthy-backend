// edit-vaccine.dto.ts

import { IsNotEmpty, IsString, IsInt, Min, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VaccineType } from '@prisma/client';

export class EditVaccineDto {
  @ApiProperty({ required: false, example: 'COVID-19 Vaccine' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({ required: false, example: 'EPIDEMIOLOGY' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  type?: VaccineType;

  @ApiProperty({ required: false, example: 6 })
  @IsOptional()
  @IsInt()
  @Min(0)
  min_age?: number;

  @ApiProperty({ required: false, example: 18 })
  @IsOptional()
  @IsInt()
  @Min(0)
  max_age?: number;

  @ApiProperty({ required: false, example: 'A vaccine for COVID-19' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;
}
