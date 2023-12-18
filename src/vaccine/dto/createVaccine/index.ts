import { ApiProperty } from '@nestjs/swagger';
import { VaccineType } from '@prisma/client';
export class CreateVaccineDto {
  //make dto with examples
  @ApiProperty({
    example: 'Pfizer-BioNTech',
  })
  name: string;
  @ApiProperty({ example: 'CALENDAR' })
  type: VaccineType;
  @ApiProperty({
    example: '12',
  })
  min_age: number;
  @ApiProperty({
    example: '52',
  })
  max_age: number;
  @ApiProperty({
    example:
      'This createVaccine is used to prevent COVID-19. It works by teaching the immune system how to recognize and fight the virus that causes COVID-19. This createVaccine is usually given as 2 shots in the upper arm muscle spaced 3 weeks apart.',
  })
  description: string;
}
