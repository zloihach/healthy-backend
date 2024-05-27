import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiParam,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { ChildrenService } from './children.service';
import { AuthGuard } from '../../../auth/guards/auth.guard';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { Role } from '../../../auth/enums/role.enum';
import { SessionInfo } from '../../../auth/decorators/session-info.decorator';
import { GetSessionInfoDto } from '../../../auth/dto/sessioninfo';
import { IsParentGuard } from '../../../common/guards/isParent.guard';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import {
  CreateVaccinationDto,
  UpdateVaccinationDto,
} from './dto/child-vaccination.dto';

@ApiTags('Children')
@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Get()
  @UseGuards(AuthGuard)
  @Roles(Role.User)
  @ApiOperation({ summary: 'Get all user children' })
  @ApiOkResponse({ description: 'Children fetched successfully' })
  @HttpCode(HttpStatus.OK)
  async getAllUserChildren(@SessionInfo() session: GetSessionInfoDto) {
    return this.childrenService.getAllUserChildren(session.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.User)
  @ApiOperation({ summary: 'Get user child by ID' })
  @ApiOkResponse({ description: 'Child fetched successfully' })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', description: 'Child ID' })
  async getUserChildById(
    @SessionInfo() session: GetSessionInfoDto,
    @Param('id') id: string,
  ) {
    return this.childrenService.getUserChildById(session.id, +id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @Roles(Role.User)
  @ApiOperation({ summary: 'Create a new child' })
  @ApiOkResponse({ description: 'Child created successfully' })
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('application/json')
  @ApiBody({ description: 'Data for creating a child', type: CreateChildDto })
  async createChild(
    @SessionInfo() session: GetSessionInfoDto,
    @Body() createChildDto: CreateChildDto,
  ) {
    return this.childrenService.createChild(session.id, createChildDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.User)
  @ApiOperation({ summary: 'Update an existing child' })
  @ApiOkResponse({ description: 'Child updated successfully' })
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('application/json')
  @ApiBody({ description: 'Data for updating a child', type: UpdateChildDto })
  async updateChild(
    @SessionInfo() session: GetSessionInfoDto,
    @Param('id') id: string,
    @Body() updateChildDto: UpdateChildDto,
  ) {
    return this.childrenService.updateChild(session.id, +id, updateChildDto);
  }

  @Delete(':childId')
  @UseGuards(AuthGuard, IsParentGuard)
  @Roles(Role.User)
  @ApiOperation({ summary: 'Delete a child' })
  @ApiOkResponse({ description: 'Child deleted successfully' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'childId', description: 'Child ID' })
  async deleteChild(
    @SessionInfo() session: GetSessionInfoDto,
    @Param('childId', ParseIntPipe) childId: number,
  ) {
    await this.childrenService.deleteChild(childId);
  }

  @Post(':childId/vaccinations')
  @UseGuards(AuthGuard, IsParentGuard)
  @Roles(Role.User)
  @ApiOperation({ summary: 'Create a vaccination record for a child' })
  @ApiOkResponse({ description: 'Vaccination record created successfully' })
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('application/json')
  @ApiBody({
    description: 'Data for creating a vaccination record',
    type: CreateVaccinationDto,
  })
  async createVaccination(
    @SessionInfo() session: GetSessionInfoDto,
    @Param('childId') childId: string,
    @Body() createVaccinationDto: CreateVaccinationDto,
  ) {
    return this.childrenService.createVaccination(
      session.id,
      +childId,
      createVaccinationDto,
    );
  }

  @Patch(':childId/vaccinations/:vaccinationId')
  @UseGuards(AuthGuard, IsParentGuard)
  @Roles(Role.User)
  @ApiOperation({ summary: 'Update a vaccination record for a child' })
  @ApiOkResponse({ description: 'Vaccination record updated successfully' })
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('application/json')
  @ApiBody({
    description: 'Data for updating a vaccination record',
    type: UpdateVaccinationDto,
  })
  async updateVaccination(
    @SessionInfo() session: GetSessionInfoDto,
    @Param('childId') childId: string,
    @Param('vaccinationId') vaccinationId: string,
    @Body() updateVaccinationDto: UpdateVaccinationDto,
  ) {
    return this.childrenService.updateVaccination(
      session.id,
      +childId,
      +vaccinationId,
      updateVaccinationDto,
    );
  }

  @Post(':childId/create-vaccination-calendar')
  @UseGuards(AuthGuard, IsParentGuard)
  @Roles(Role.User)
  @ApiOperation({ summary: 'Create vaccination calendar for a child' })
  @ApiOkResponse({ description: 'Vaccination calendar created successfully' })
  @HttpCode(HttpStatus.CREATED)
  @ApiParam({ name: 'childId', description: 'Child ID' })
  async createVaccinationCalendar(
    @SessionInfo() session: GetSessionInfoDto,
    @Param('childId') childId: string,
  ) {
    return this.childrenService.createVaccinationCalendar(session.id, +childId);
  }
}
