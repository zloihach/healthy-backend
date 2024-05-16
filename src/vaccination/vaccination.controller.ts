import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post, UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { VaccinationService } from './vaccination.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { UserVaccine } from '@prisma/client';
import { CreateVaccinationDto } from '../vaccine/dto/createVaccination';
import { UpdateVaccinationBodyDto } from './dto/updateVaccinationBody';
import { SetVaccinationStatusBodyDto } from './dto/setVaccinationStatus';
import { UserIdFromSession } from '../auth/decorators/user-id-from-session.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SessionInfo } from '../auth/decorators/session-info.decorator';
import { GetSessionInfoDto } from '../auth/dto/sessioninfo';
import { AuthGuard } from '../auth/guards/auth.guard';

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

  @Post('user-vaccinations')
  @UseGuards(AuthGuard)
  @Roles(Role.User)
  @ApiOperation({ summary: 'Get all vaccinations for current user' })
  @ApiOkResponse({ description: 'List of vaccinations fetched successfully' })
  @HttpCode(HttpStatus.OK)
  async getAllVaccinationsForCurrentUser(
    @SessionInfo() session: GetSessionInfoDto,
  ) {
    try {
      const userId = session.id;
      return await this.vaccinationService.getAllVaccinationsForCurrentUser(
        userId,
      );
    } catch (error) {
      throw new Error('An error occurred while getting all vaccinations.');
    }
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
