// publication/dto/searchPublication.dto.ts
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class SearchPublicationBodyDto {
  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
