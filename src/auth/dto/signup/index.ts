import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { Sex } from '../../enums/sex.enum';

export class SignUpBodyDto {
  @ApiProperty({
    example: 'johndoe@mail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'superStrongPassword',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'John',
  })
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({
    example: 'Doe',
  })
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({
    example: 'Some Middle Name',
    required: false,
  })
  @IsOptional()
  midname?: string;

  @ApiProperty({
    example: '2000-01-01T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  dob: Date;

  @ApiProperty({
    example: Sex.MALE,
  })
  @IsOptional()
  @IsEnum(Sex)
  sex: Sex;
}
