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
import { Role } from '../../../auth/enums/role.enum';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags, ApiParam } from '@nestjs/swagger';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';

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
  async getAllUserChildren() {
    return this.childrenService.getAllUserChildren();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.User)
  @ApiOperation({ summary: 'Get user child by ID' })
  @ApiOkResponse({ description: 'Child fetched successfully' })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', description: 'Child ID' })
  async getUserChildById(@Param('id') id: string) {
    return this.childrenService.getUserChildById(+id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @Roles(Role.User)
  @ApiOperation({ summary: 'Create a new child' })
  @ApiOkResponse({ description: 'Child created successfully' })
  @ApiBody({ type: CreateChildDto })
  @HttpCode(HttpStatus.CREATED)
  async createChild(@Body() createChildDto: CreateChildDto) {
    return this.childrenService.createChild(createChildDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.User)
  @ApiOperation({ summary: 'Update an existing child' })
  @ApiOkResponse({ description: 'Child updated successfully' })
  @ApiBody({ type: UpdateChildDto })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', description: 'Child ID' })
  async updateChild(
    @Param('id') id: string,
    @Body() updateChildDto: UpdateChildDto,
  ) {
    return this.childrenService.updateChild(+id, updateChildDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.User)
  @ApiOperation({ summary: 'Delete a child' })
  @ApiOkResponse({ description: 'Child deleted successfully' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'id', description: 'Child ID' })
  async deleteChild(@Param('id') id: string) {
    return this.childrenService.deleteChild(+id);
  }
}
