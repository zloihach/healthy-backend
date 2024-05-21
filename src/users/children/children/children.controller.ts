// // import {
// //   Body,
// //   Controller,
// //   Delete,
// //   Get,
// //   HttpCode,
// //   HttpStatus,
// //   Param,
// //   Patch,
// //   Post,
// //   UseGuards,
// // } from '@nestjs/common';
// // import { ChildrenService } from './children.service';
// // import { AuthGuard } from '../../../auth/guards/auth.guard';
// // import { Roles } from '../../../auth/decorators/roles.decorator';
// // import {
// //   ApiBody,
// //   ApiConsumes,
// //   ApiOkResponse,
// //   ApiOperation,
// //   ApiTags,
// //   ApiParam,
// // } from '@nestjs/swagger';
// // import { CreateChildDto } from './dto/create-child.dto';
// // import { UpdateChildDto } from './dto/update-child.dto';
// // import { SessionInfo } from '../../../auth/decorators/session-info.decorator';
// // import { Role } from '../../../auth/enums/role.enum';
// // import { GetSessionInfoDto } from '../../../auth/dto/sessioninfo';
// // import { IsParentGuard } from '../../../common/guards/isParent.guard';
// // import {
// //   CreateVaccinationDto,
// //   UpdateVaccinationDto,
// // } from './dto/child-vaccination.dto';
// //
// // @ApiTags('Children')
// // @Controller('children')
// // export class ChildrenController {
// //   constructor(private readonly childrenService: ChildrenService) {}
// //
// //   @Get()
// //   @UseGuards(AuthGuard)
// //   @Roles(Role.User)
// //   @ApiOperation({ summary: 'Get all user children' })
// //   @ApiOkResponse({ description: 'Children fetched successfully' })
// //   @HttpCode(HttpStatus.OK)
// //   async getAllUserChildren(@SessionInfo() session: GetSessionInfoDto) {
// //     const userId = session.id;
// //     return this.childrenService.getAllUserChildren(userId);
// //   }
// //
// //   @Get(':id')
// //   @UseGuards(AuthGuard)
// //   @Roles(Role.User)
// //   @ApiOperation({ summary: 'Get user child by ID' })
// //   @ApiOkResponse({ description: 'Child fetched successfully' })
// //   @HttpCode(HttpStatus.OK)
// //   @ApiParam({ name: 'id', description: 'Child ID' })
// //   async getUserChildById(
// //     @SessionInfo() session: GetSessionInfoDto,
// //     @Param('id') id: string,
// //   ) {
// //     const userId = session.id;
// //     return this.childrenService.getUserChildById(userId, +id);
// //   }
// //
// //   @Post()
// //   @UseGuards(AuthGuard)
// //   @Roles(Role.User)
// //   @ApiOperation({ summary: 'Create a new child' })
// //   @ApiOkResponse({ description: 'Child created successfully' })
// //   @HttpCode(HttpStatus.CREATED)
// //   @ApiConsumes('application/json')
// //   @ApiBody({
// //     description: 'Data for creating a child',
// //     type: CreateChildDto,
// //   })
// //   async createChild(
// //     @SessionInfo() session: GetSessionInfoDto,
// //     @Body() createChildDto: CreateChildDto,
// //   ) {
// //     const userId = session.id;
// //     return this.childrenService.createChild(userId, createChildDto);
// //   }
// //
// //   @Patch(':id')
// //   @UseGuards(AuthGuard)
// //   @Roles(Role.User)
// //   @ApiOperation({ summary: 'Update an existing child' })
// //   @ApiOkResponse({ description: 'Child updated successfully' })
// //   @HttpCode(HttpStatus.OK)
// //   @ApiConsumes('application/json')
// //   @ApiBody({
// //     description: 'Data for updating a child',
// //     type: UpdateChildDto,
// //   })
// //   async updateChild(
// //     @SessionInfo() session: GetSessionInfoDto,
// //     @Param('id') id: string,
// //     @Body() updateChildDto: UpdateChildDto,
// //   ) {
// //     const userId = session.id;
// //     return this.childrenService.updateChild(userId, +id, updateChildDto);
// //   }
// //
// //   @Delete(':id')
// //   @UseGuards(AuthGuard)
// //   @Roles(Role.User)
// //   @ApiOperation({ summary: 'Delete a child' })
// //   @ApiOkResponse({ description: 'Child deleted successfully' })
// //   @HttpCode(HttpStatus.NO_CONTENT)
// //   @ApiParam({ name: 'id', description: 'Child ID' })
// //   async deleteChild(
// //     @SessionInfo() session: GetSessionInfoDto,
// //     @Param('id') id: string,
// //   ) {
// //     const userId = session.id;
// //     return this.childrenService.deleteChild(userId, +id);
// //   }
// //
// //   @Post(':childId/vaccinations')
// //   @UseGuards(AuthGuard, IsParentGuard)
// //   @Roles(Role.User)
// //   @ApiOperation({ summary: 'Create a vaccination record for a child' })
// //   @ApiOkResponse({ description: 'Vaccination record created successfully' })
// //   @HttpCode(HttpStatus.CREATED)
// //   @ApiConsumes('application/json')
// //   @ApiBody({
// //     description: 'Data for creating a vaccination record',
// //     type: CreateVaccinationDto,
// //   })
// //   async createVaccination(
// //     @SessionInfo() session: GetSessionInfoDto,
// //     @Param('childId') childId: string,
// //     @Body() createVaccinationDto: CreateVaccinationDto,
// //   ) {
// //     const userId = session.id;
// //     return this.childrenService.createVaccination(
// //       userId,
// //       +childId,
// //       createVaccinationDto,
// //     );
// //   }
// //
// //   @Patch(':childId/vaccinations/:vaccinationId')
// //   @UseGuards(AuthGuard, IsParentGuard)
// //   @Roles(Role.User)
// //   @ApiOperation({ summary: 'Update a vaccination record for a child' })
// //   @ApiOkResponse({ description: 'Vaccination record updated successfully' })
// //   @HttpCode(HttpStatus.OK)
// //   @ApiConsumes('application/json')
// //   @ApiBody({
// //     description: 'Data for updating a vaccination record',
// //     type: UpdateVaccinationDto,
// //   })
// //   async updateVaccination(
// //     @SessionInfo() session: GetSessionInfoDto,
// //     @Param('childId') childId: string,
// //     @Param('vaccinationId') vaccinationId: string,
// //     @Body() updateVaccinationDto: UpdateVaccinationDto,
// //   ) {
// //     const userId = session.id;
// //     return this.childrenService.updateVaccination(
// //       userId,
// //       +childId,
// //       +vaccinationId,
// //       updateVaccinationDto,
// //     );
// //   }
// // }
// //
// // //
// // //
// // // import {
// // //   Body,
// // //   Controller,
// // //   Delete,
// // //   Param,
// // //   Patch,
// // //   Post,
// // //   UseGuards,
// // //   HttpCode,
// // //   HttpStatus,
// // // } from '@nestjs/common';
// // // import { ChildrenService } from './children.service';
// // // import { AuthGuard } from '../../../auth/guards/auth.guard';
// // // import { Roles } from '../../../auth/decorators/roles.decorator';
// // // import {
// // //   ApiBody,
// // //   ApiConsumes,
// // //   ApiOkResponse,
// // //   ApiOperation,
// // //   ApiTags,
// // //   ApiParam,
// // // } from '@nestjs/swagger';
// // // import { CreateChildDto } from './dto/create-child.dto';
// // // import { UpdateChildDto } from './dto/update-child.dto';
// // // import { SessionInfo } from '../../../auth/decorators/session-info.decorator';
// // // import { Role } from '../../../auth/enums/role.enum';
// // // import { GetSessionInfoDto } from '../../../auth/dto/sessioninfo';
// // // import { IsParentGuard } from '../../../common/guards/isParent.guard';
// // // import {
// // //   CreateVaccinationDto,
// // //   UpdateVaccinationDto,
// // // } from './dto/child-vaccination.dto';
// // //
// // // @ApiTags('Children')
// // // @Controller('children')
// // // export class ChildrenController {
// // //   constructor(private readonly childrenService: ChildrenService) {}
// // //
// // //   @Post('all')
// // //   @UseGuards(AuthGuard)
// // //   @Roles(Role.User)
// // //   @ApiOperation({ summary: 'Get all user children' })
// // //   @ApiOkResponse({ description: 'Children fetched successfully' })
// // //   @HttpCode(HttpStatus.OK)
// // //   async getAllUserChildren(@SessionInfo() session: GetSessionInfoDto) {
// // //     const userId = session.id;
// // //     return this.childrenService.getAllUserChildren(userId);
// // //   }
// // //
// // //   @Post(':id')
// // //   @UseGuards(AuthGuard)
// // //   @Roles(Role.User)
// // //   @ApiOperation({ summary: 'Get user child by ID' })
// // //   @ApiOkResponse({ description: 'Child fetched successfully' })
// // //   @HttpCode(HttpStatus.OK)
// // //   @ApiParam({ name: 'id', description: 'Child ID' })
// // //   async getUserChildById(
// // //     @SessionInfo() session: GetSessionInfoDto,
// // //     @Param('id') id: string,
// // //   ) {
// // //     const userId = session.id;
// // //     return this.childrenService.getUserChildById(userId, +id);
// // //   }
// // //
// // //   @Post()
// // //   @UseGuards(AuthGuard)
// // //   @Roles(Role.User)
// // //   @ApiOperation({ summary: 'Create a new child' })
// // //   @ApiOkResponse({ description: 'Child created successfully' })
// // //   @HttpCode(HttpStatus.CREATED)
// // //   @ApiConsumes('application/json')
// // //   @ApiBody({
// // //     description: 'Data for creating a child',
// // //     type: CreateChildDto,
// // //   })
// // //   async createChild(
// // //     @SessionInfo() session: GetSessionInfoDto,
// // //     @Body() createChildDto: CreateChildDto,
// // //   ) {
// // //     const userId = session.id;
// // //     return this.childrenService.createChild(userId, createChildDto);
// // //   }
// // //
// // //   @Patch(':id')
// // //   @UseGuards(AuthGuard)
// // //   @Roles(Role.User)
// // //   @ApiOperation({ summary: 'Update an existing child' })
// // //   @ApiOkResponse({ description: 'Child updated successfully' })
// // //   @HttpCode(HttpStatus.OK)
// // //   @ApiConsumes('application/json')
// // //   @ApiBody({
// // //     description: 'Data for updating a child',
// // //     type: UpdateChildDto,
// // //   })
// // //   async updateChild(
// // //     @SessionInfo() session: GetSessionInfoDto,
// // //     @Param('id') id: string,
// // //     @Body() updateChildDto: UpdateChildDto,
// // //   ) {
// // //     const userId = session.id;
// // //     return this.childrenService.updateChild(userId, +id, updateChildDto);
// // //   }
// // //
// // //   @Delete(':id')
// // //   @UseGuards(AuthGuard)
// // //   @Roles(Role.User)
// // //   @ApiOperation({ summary: 'Delete a child' })
// // //   @ApiOkResponse({ description: 'Child deleted successfully' })
// // //   @HttpCode(HttpStatus.NO_CONTENT)
// // //   @ApiParam({ name: 'id', description: 'Child ID' })
// // //   async deleteChild(
// // //     @SessionInfo() session: GetSessionInfoDto,
// // //     @Param('id') id: string,
// // //   ) {
// // //     const userId = session.id;
// // //     return this.childrenService.deleteChild(userId, +id);
// // //   }
// // //
// // //   @Post(':childId/vaccinations')
// // //   @UseGuards(AuthGuard, IsParentGuard)
// // //   @Roles(Role.User)
// // //   @ApiOperation({ summary: 'Create a vaccination record for a child' })
// // //   @ApiOkResponse({ description: 'Vaccination record created successfully' })
// // //   @HttpCode(HttpStatus.CREATED)
// // //   @ApiConsumes('application/json')
// // //   @ApiBody({
// // //     description: 'Data for creating a vaccination record',
// // //     type: CreateVaccinationDto,
// // //   })
// // //   async createVaccination(
// // //     @SessionInfo() session: GetSessionInfoDto,
// // //     @Param('childId') childId: string,
// // //     @Body() createVaccinationDto: CreateVaccinationDto,
// // //   ) {
// // //     const userId = session.id;
// // //     return this.childrenService.createVaccination(
// // //       userId,
// // //       +childId,
// // //       createVaccinationDto,
// // //     );
// // //   }
// // //
// // //   @Patch(':childId/vaccinations/:vaccinationId')
// // //   @UseGuards(AuthGuard, IsParentGuard)
// // //   @Roles(Role.User)
// // //   @ApiOperation({ summary: 'Update a vaccination record for a child' })
// // //   @ApiOkResponse({ description: 'Vaccination record updated successfully' })
// // //   @HttpCode(HttpStatus.OK)
// // //   @ApiConsumes('application/json')
// // //   @ApiBody({
// // //     description: 'Data for updating a vaccination record',
// // //     type: UpdateVaccinationDto,
// // //   })
// // //   async updateVaccination(
// // //     @SessionInfo() session: GetSessionInfoDto,
// // //     @Param('childId') childId: string,
// // //     @Param('vaccinationId') vaccinationId: string,
// // //     @Body() updateVaccinationDto: UpdateVaccinationDto,
// // //   ) {
// // //     const userId = session.id;
// // //     return this.childrenService.updateVaccination(
// // //       userId,
// // //       +childId,
// // //       +vaccinationId,
// // //       updateVaccinationDto,
// // //     );
// // //   }
// // // }
//
// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   HttpCode,
//   HttpStatus,
//   Param,
//   Patch,
//   Post,
//   UseGuards,
// } from '@nestjs/common';
// import {
//   ApiOkResponse,
//   ApiOperation,
//   ApiTags,
//   ApiParam,
//   ApiBody,
//   ApiConsumes,
// } from '@nestjs/swagger';
// import { ChildrenService } from './children.service';
// import { AuthGuard } from '../../../auth/guards/auth.guard';
// import { Roles } from '../../../auth/decorators/roles.decorator';
// import { Role } from '../../../auth/enums/role.enum';
// import { SessionInfo } from '../../../auth/decorators/session-info.decorator';
// import { GetSessionInfoDto } from '../../../auth/dto/sessioninfo';
// import { IsParentGuard } from '../../../common/guards/isParent.guard';
// import { CreateChildDto } from './dto/create-child.dto';
// import { UpdateChildDto } from './dto/update-child.dto';
// import {
//   CreateVaccinationDto,
//   UpdateVaccinationDto,
// } from './dto/child-vaccination.dto';
//
// @ApiTags('Children')
// @Controller('children')
// export class ChildrenController {
//   constructor(private readonly childrenService: ChildrenService) {}
//
//   @Get()
//   @UseGuards(AuthGuard)
//   @Roles(Role.User)
//   @ApiOperation({ summary: 'Get all user children' })
//   @ApiOkResponse({ description: 'Children fetched successfully' })
//   @HttpCode(HttpStatus.OK)
//   async getAllUserChildren(@SessionInfo() session: GetSessionInfoDto) {
//     return this.childrenService.getAllUserChildren(session.id);
//   }
//
//   @Get(':id')
//   @UseGuards(AuthGuard)
//   @Roles(Role.User)
//   @ApiOperation({ summary: 'Get user child by ID' })
//   @ApiOkResponse({ description: 'Child fetched successfully' })
//   @HttpCode(HttpStatus.OK)
//   @ApiParam({ name: 'id', description: 'Child ID' })
//   async getUserChildById(
//     @SessionInfo() session: GetSessionInfoDto,
//     @Param('id') id: string,
//   ) {
//     return this.childrenService.getUserChildById(session.id, +id);
//   }
//
//   @Post()
//   @UseGuards(AuthGuard)
//   @Roles(Role.User)
//   @ApiOperation({ summary: 'Create a new child' })
//   @ApiOkResponse({ description: 'Child created successfully' })
//   @HttpCode(HttpStatus.CREATED)
//   @ApiConsumes('application/json')
//   @ApiBody({ description: 'Data for creating a child', type: CreateChildDto })
//   async createChild(
//     @SessionInfo() session: GetSessionInfoDto,
//     @Body() createChildDto: CreateChildDto,
//   ) {
//     return this.childrenService.createChild(session.id, createChildDto);
//   }
//
//   @Patch(':id')
//   @UseGuards(AuthGuard)
//   @Roles(Role.User)
//   @ApiOperation({ summary: 'Update an existing child' })
//   @ApiOkResponse({ description: 'Child updated successfully' })
//   @HttpCode(HttpStatus.OK)
//   @ApiConsumes('application/json')
//   @ApiBody({ description: 'Data for updating a child', type: UpdateChildDto })
//   async updateChild(
//     @SessionInfo() session: GetSessionInfoDto,
//     @Param('id') id: string,
//     @Body() updateChildDto: UpdateChildDto,
//   ) {
//     return this.childrenService.updateChild(session.id, +id, updateChildDto);
//   }
//
//   @Delete(':id')
//   @UseGuards(AuthGuard)
//   @Roles(Role.User)
//   @ApiOperation({ summary: 'Delete a child' })
//   @ApiOkResponse({ description: 'Child deleted successfully' })
//   @HttpCode(HttpStatus.NO_CONTENT)
//   @ApiParam({ name: 'id', description: 'Child ID' })
//   async deleteChild(
//     @SessionInfo() session: GetSessionInfoDto,
//     @Param('id') id: string,
//   ) {
//     return this.childrenService.deleteChild(session.id, +id);
//   }
//
//   @Post(':childId/vaccinations')
//   @UseGuards(AuthGuard, IsParentGuard)
//   @Roles(Role.User)
//   @ApiOperation({ summary: 'Create a vaccination record for a child' })
//   @ApiOkResponse({ description: 'Vaccination record created successfully' })
//   @HttpCode(HttpStatus.CREATED)
//   @ApiConsumes('application/json')
//   @ApiBody({
//     description: 'Data for creating a vaccination record',
//     type: CreateVaccinationDto,
//   })
//   async createVaccination(
//     @SessionInfo() session: GetSessionInfoDto,
//     @Param('childId') childId: string,
//     @Body() createVaccinationDto: CreateVaccinationDto,
//   ) {
//     return this.childrenService.createVaccination(
//       session.id,
//       +childId,
//       createVaccinationDto,
//     );
//   }
//
//   @Patch(':childId/vaccinations/:vaccinationId')
//   @UseGuards(AuthGuard, IsParentGuard)
//   @Roles(Role.User)
//   @ApiOperation({ summary: 'Update a vaccination record for a child' })
//   @ApiOkResponse({ description: 'Vaccination record updated successfully' })
//   @HttpCode(HttpStatus.OK)
//   @ApiConsumes('application/json')
//   @ApiBody({
//     description: 'Data for updating a vaccination record',
//     type: UpdateVaccinationDto,
//   })
//   async updateVaccination(
//     @SessionInfo() session: GetSessionInfoDto,
//     @Param('childId') childId: string,
//     @Param('vaccinationId') vaccinationId: string,
//     @Body() updateVaccinationDto: UpdateVaccinationDto,
//   ) {
//     return this.childrenService.updateVaccination(
//       session.id,
//       +childId,
//       +vaccinationId,
//       updateVaccinationDto,
//     );
//   }
//
//   @Post(':childId/create-vaccination-calendar')
//   @UseGuards(AuthGuard, IsParentGuard)
//   @Roles(Role.User)
//   @ApiOperation({ summary: 'Create vaccination calendar for a child' })
//   @ApiOkResponse({ description: 'Vaccination calendar created successfully' })
//   @HttpCode(HttpStatus.CREATED)
//   @ApiParam({ name: 'childId', description: 'Child ID' })
//   async createVaccinationCalendar(
//     @SessionInfo() session: GetSessionInfoDto,
//     @Param('childId') childId: string,
//   ) {
//     return this.childrenService.createVaccinationCalendar(session.id, +childId);
//   }
// }

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
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

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.User)
  @ApiOperation({ summary: 'Delete a child' })
  @ApiOkResponse({ description: 'Child deleted successfully' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'id', description: 'Child ID' })
  async deleteChild(
    @SessionInfo() session: GetSessionInfoDto,
    @Param('id') id: string,
  ) {
    return this.childrenService.deleteChild(session.id, +id);
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
