import { ApiProperty } from '@nestjs/swagger';
import { Sex, Role } from '@prisma/client';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetCurrentUserDto {
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber()
  readonly id: number;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  firstname: string;

  @ApiProperty({ required: false })
  midname?: string | null;

  @ApiProperty()
  dob: Date;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: Sex })
  sex: Sex;

  @ApiProperty({ enum: Role })
  role: Role;

  @ApiProperty()
  is_active: boolean;

  @ApiProperty()
  is_confirmed_email: boolean;

  @ApiProperty()
  notification_period: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  edited_at: Date;
}
