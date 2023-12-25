import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { VaccinationService } from './vaccination.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { CreateVaccinationDto } from '../vaccine/dto/createVaccination';
import { UpdateVaccinationBodyDto } from './dto/updateVaccinationBody';
import { UserVaccine } from '@prisma/client';
import { SetVaccinationStatusBodyDto } from './dto/setVaccinationStatus';

@Controller('vaccination')
@ApiTags('Vaccination')
export class VaccinationController {
  constructor(private readonly vaccinationService: VaccinationService) {}

  @Post('createVaccination')
  @Roles(Role.User)
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async createVaccination(@Body() createVaccinationDto: CreateVaccinationDto) {
    return this.vaccinationService.createVaccination(createVaccinationDto);
  }

  @Get('getUserVaccination/:userid')
  @Roles(Role.User)
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async getUserVaccination(@Param('userid') userid: string) {
    return this.vaccinationService.getUserVaccinations(Number(userid));
  }

  @Patch('updateVaccination')
  @Roles(Role.User)
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async updateVaccination(
    @Body() updateVaccinationBodyDto: UpdateVaccinationBodyDto,
  ): Promise<UserVaccine> {
    return this.vaccinationService.updateVaccination(updateVaccinationBodyDto);
  }

  @Patch('changeVaccinationStatus')
  @Roles(Role.User)
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async setVaccinationStatus(
    @Body() setVaccinationStatusBodyDto: SetVaccinationStatusBodyDto,
  ): Promise<UserVaccine> {
    return this.vaccinationService.changeVaccinationStatus(
      setVaccinationStatusBodyDto,
    );
  }
}
