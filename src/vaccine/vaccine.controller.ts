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
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { Vaccine } from '@prisma/client';
import { VaccineService } from './vaccine.service';
import { CreateVaccineDto } from './dto/createVaccine';
import { EditVaccineDto } from './dto/editVaccine';
import { SearchVaccineDto } from './dto/seacrhVaccine';

@Controller('vaccine')
@ApiTags('Vaccine')
@UseGuards(AuthGuard, RoleGuard)
export class VaccineController {
  constructor(private readonly vaccineService: VaccineService) {}

  @Get('')
  @Roles(Role.User)
  @ApiOperation({ summary: 'Get all vaccines' })
  @ApiOkResponse({ description: 'List of vaccines fetched successfully' })
  @HttpCode(HttpStatus.OK)
  async getAllVaccine() {
    return this.vaccineService.getAllVaccine();
  }

  @Get('/:id')
  @Roles(Role.User)
  @ApiOperation({ summary: 'Get vaccine by ID' })
  @ApiOkResponse({ description: 'Vaccine fetched successfully' })
  @HttpCode(HttpStatus.OK)
  async getVaccineById(@Param('id') id: string) {
    return this.vaccineService.getVaccineById(Number(id));
  }

  @Post('create')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create a new vaccine' })
  @ApiOkResponse({ description: 'Vaccine created successfully' })
  @HttpCode(HttpStatus.OK)
  async createVaccine(@Body() createVaccineDto: CreateVaccineDto) {
    return this.vaccineService.createVaccine(createVaccineDto);
  }

  @Patch('update/:id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Update a vaccine' })
  @ApiOkResponse({ description: 'Vaccine updated successfully' })
  @HttpCode(HttpStatus.OK)
  async updateVaccine(
    @Param('id') id: string,
    @Body() editVaccineDto: EditVaccineDto,
  ): Promise<Vaccine> {
    return this.vaccineService.updateVaccine(Number(id), editVaccineDto);
  }

  @Get('search')
  @Roles(Role.User)
  @ApiOperation({ summary: 'Search for vaccines' })
  @ApiOkResponse({ description: 'Vaccines fetched successfully' })
  @ApiQuery({
    name: 'keyword',
    description: 'Keyword for vaccine search',
    required: false,
  })
  @ApiQuery({
    name: 'type',
    description: 'Type of vaccine',
    required: false,
    schema: {
      default: 'EPIDEMIOLOGY',
    },
  })
  @HttpCode(HttpStatus.OK)
  async searchVaccine(@Query() searchVaccineDto: SearchVaccineDto) {
    return this.vaccineService.searchVaccine(searchVaccineDto);
  }
}
