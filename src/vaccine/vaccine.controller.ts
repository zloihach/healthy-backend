import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { VaccineService } from './vaccine.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { CreateVaccineDto } from './dto/createVaccine';
import { EditVaccineDto } from './dto/editVaccine';
import { Vaccine } from '@prisma/client';
import { SearchVaccineDto } from './dto/seacrhVaccine';
import { CreateVaccinationDto } from './dto/createVaccination';

@Controller('vaccine')
@ApiTags('Vaccine')
@UseGuards(AuthGuard, RoleGuard)
export class VaccineController {
  constructor(private readonly vaccineService: VaccineService) {}
  @Get('getAllVaccine')
  @Roles(Role.User)
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async getAllVaccine() {
    return this.vaccineService.getAllVaccine();
  }

  @Get('getVaccineById/:id')
  @Roles(Role.User)
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async getVaccineById(@Param('id') id: string) {
    return this.vaccineService.getVaccineById(Number(id));
  }

  @Post('createVaccine')
  @Roles(Role.Admin)
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async createVaccine(@Body() createVaccineDto: CreateVaccineDto) {
    return this.vaccineService.createVaccine(createVaccineDto);
  }

  @Patch('updateVaccine/:id')
  @Roles(Role.Admin)
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async updateVaccine(
    @Param('id') id: string,
    @Body() editVaccineDto: EditVaccineDto,
  ): Promise<Vaccine> {
    return this.vaccineService.updateVaccine(Number(id), editVaccineDto);
  }

  @Get('searchVaccine')
  @Roles(Role.User)
  @ApiOkResponse()
  @ApiQuery({
    name: 'keyword',
    description: 'Keyword for vaccine search',
    required: false,
  })
  @ApiQuery({
    name: 'vaccineType',
    description: 'Type of vaccine',
    required: false,
    schema: {
      default: 'CALENDAR',
    },
  })
  @HttpCode(HttpStatus.OK)
  async searchVaccine(@Query() searchVaccineDto: SearchVaccineDto) {
    return this.vaccineService.searchVaccine(searchVaccineDto);
  }

  @Post('createVaccination')
  @Roles(Role.User)
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async vaccinateUser(@Body() createVaccinationDto: CreateVaccinationDto) {
    return this.vaccineService.createVaccination(createVaccinationDto);
  }

  @Get('getUserVaccination/:id')
  @Roles(Role.User)
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async getUserVaccination(@Param('id') id: string) {
    return this.vaccineService.getUserVaccinations(Number(id));
  }
}
