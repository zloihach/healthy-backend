import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInBodyDto {
  @ApiProperty({ example: 'johndoe@mail.com' })
  @IsEmail()
  email: string;
  @ApiProperty({ example: 'superStrongPassword' })
  @IsNotEmpty()
  password: string;
}
