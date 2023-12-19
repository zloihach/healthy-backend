import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class SearchVaccineDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  keyword?: string;
}
