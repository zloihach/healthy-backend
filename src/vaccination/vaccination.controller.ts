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
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { VaccinationService } from './vaccination.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { UserVaccine } from '@prisma/client';
import { CreateVaccinationDto } from '../vaccine/dto/createVaccination';
import { UpdateVaccinationBodyDto } from './dto/updateVaccinationBody';
import { SetVaccinationStatusBodyDto } from './dto/setVaccinationStatus';

@Controller('vaccination')
@ApiTags('Vaccination')
export class VaccinationController {
  constructor(private readonly vaccinationService: VaccinationService) {}

  @Post('create')
  @Roles(Role.User)
  @ApiOperation({ summary: 'Create a new vaccination record' })
  @ApiOkResponse({ description: 'Vaccination record created successfully' })
  @HttpCode(HttpStatus.OK)
  async createVaccination(@Body() createVaccinationDto: CreateVaccinationDto) {
    return this.vaccinationService.createVaccination(createVaccinationDto);
  }

  @Get('user/:userid')
  @Roles(Role.User)
  @ApiOperation({ summary: 'Get vaccination records for a user' })
  @ApiOkResponse({ description: 'Vaccination records fetched successfully' })
  @HttpCode(HttpStatus.OK)
  async getUserVaccination(@Param('userid') userid: string) {
    return this.vaccinationService.getUserVaccinations(Number(userid));
  }

  @Patch('update')
  @Roles(Role.User)
  @ApiOperation({ summary: 'Update a vaccination record' })
  @ApiOkResponse({ description: 'Vaccination record updated successfully' })
  @HttpCode(HttpStatus.OK)
  async updateVaccination(
    @Body() updateVaccinationBodyDto: UpdateVaccinationBodyDto,
  ): Promise<UserVaccine> {
    return this.vaccinationService.updateVaccination(updateVaccinationBodyDto);
  }

  @Patch('change-status')
  @Roles(Role.User)
  @ApiOperation({ summary: 'Change status of a vaccination record' })
  @ApiOkResponse({
    description: 'Vaccination record status changed successfully',
  })
  @HttpCode(HttpStatus.OK)
  async setVaccinationStatus(
    @Body() setVaccinationStatusBodyDto: SetVaccinationStatusBodyDto,
  ): Promise<UserVaccine> {
    return this.vaccinationService.changeVaccinationStatus(
      setVaccinationStatusBodyDto,
    );
  }
}
