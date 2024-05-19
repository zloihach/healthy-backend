import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Sex } from '@prisma/client';
import { Transform } from 'class-transformer';

export class CreateChildDto {
  @ApiProperty({
    example: 'Иванов',
    description: 'Фамилия ребенка',
  })
  @IsString()
  @IsNotEmpty()
  readonly lastname: string;

  @ApiProperty({
    example: 'Иван',
    description: 'Имя ребенка',
  })
  @IsString()
  @IsNotEmpty()
  readonly firstname: string;

  @ApiProperty({
    example: 'Иванович',
    description: 'Отчество ребенка',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly midname?: string;

  @ApiProperty({
    example: '2015-06-06T00:00:00.000Z',
    description: 'Дата рождения ребенка',
  })
  @IsDateString()
  readonly dob: Date;

  @ApiProperty({
    enum: Sex,
    example: 'MALE',
  })
  @IsEnum(Sex)
  readonly sex: Sex;

  @ApiProperty({
    example: true,
    description: 'Активность учетной записи ребенка',
  })
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  @IsBoolean()
  readonly is_active: boolean;
}
