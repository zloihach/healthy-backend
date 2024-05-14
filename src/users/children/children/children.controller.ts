import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ChildrenService } from './children.service';
import { AuthGuard } from '../../../auth/guards/auth.guard';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { Role } from '../../../auth/enums/role.enum';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('children')
@ApiTags('Children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Get('child')
  @UseGuards(AuthGuard)
  @Roles(Role.User)
  @ApiOperation({ summary: 'Get all user children' })
  @ApiOkResponse({ description: 'Children fetched successfully' })
  @HttpCode(HttpStatus.OK)
  async getAllUserChildren() {
    return true;
  }

  @Get('child/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.User)
  @ApiOperation({ summary: 'Get user child by ID' })
  @ApiOkResponse({ description: 'Child fetched successfully' })
  @HttpCode(HttpStatus.OK)
  async getUserChildById(@Param('id') id: string) {
    return id;
  }
}
