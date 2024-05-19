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
import { ChildrenService } from './children.service';
import { AuthGuard } from '../../../auth/guards/auth.guard';
import { Roles } from '../../../auth/decorators/roles.decorator';
import {
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { SessionInfo } from '../../../auth/decorators/session-info.decorator';
import { Role } from '../../../auth/enums/role.enum';
import { GetSessionInfoDto } from '../../../auth/dto/sessioninfo';

@Controller('children')
@ApiTags('Children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Get()
  @UseGuards(AuthGuard)
  @Roles(Role.User)
  @ApiOperation({ summary: 'Get all user children' })
  @ApiOkResponse({ description: 'Children fetched successfully' })
  @HttpCode(HttpStatus.OK)
  async getAllUserChildren(@SessionInfo() session: GetSessionInfoDto) {
    const userId = session.id;
    return this.childrenService.getAllUserChildren(userId);
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
    const userId = session.id;
    return this.childrenService.getUserChildById(userId, +id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @Roles(Role.User)
  @ApiOperation({ summary: 'Create a new child' })
  @ApiOkResponse({ description: 'Child created successfully' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateChildDto })
  @HttpCode(HttpStatus.CREATED)
  async createChild(
    @SessionInfo() session: GetSessionInfoDto,
    @Body() createChildDto: CreateChildDto,
  ) {
    const userId = session.id;
    return this.childrenService.createChild(userId, createChildDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.User)
  @ApiOperation({ summary: 'Update an existing child' })
  @ApiOkResponse({ description: 'Child updated successfully' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateChildDto })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', description: 'Child ID' })
  async updateChild(
    @SessionInfo() session: GetSessionInfoDto,
    @Param('id') id: string,
    @Body() updateChildDto: UpdateChildDto,
  ) {
    const userId = session.id;
    return this.childrenService.updateChild(userId, +id, updateChildDto);
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
    const userId = session.id;
    return this.childrenService.deleteChild(userId, +id);
  }
}
