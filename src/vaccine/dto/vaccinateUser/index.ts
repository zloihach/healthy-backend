import {
  IsInt,
  IsString,
  IsOptional,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class VaccinateUserDto {
  @IsInt()
  vaccineId: number;

  @IsInt()
  userId: number;

  @IsString()
  @IsOptional()
  medicalCenter?: string;

  @IsNumber()
  @IsOptional()
  dose?: number;

  @IsString()
  @IsOptional()
  serialNumber?: string;

  @IsDateString()
  @IsOptional()
  vaccinationDate?: string;

  @IsString()
  @IsOptional()
  commentary?: string;
}
