import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { VaccineType } from '@prisma/client';

export class SearchVaccineDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  keyword?: string;
  @IsOptional()
  @IsEnum(VaccineType)
  @IsNotEmpty()
  type?: VaccineType;
}
