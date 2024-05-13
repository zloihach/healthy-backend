import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ description: 'List of users fetched successfully' })
  @HttpCode(HttpStatus.OK)
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiOkResponse({ description: 'User fetched successfully' })
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(Number(id));
  }

  @Get('/:email')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Get user by email' })
  @ApiOkResponse({ description: 'User fetched successfully' })
  @HttpCode(HttpStatus.OK)
  async getUserByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Patch(':id/activate')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Activate user' })
  @ApiOkResponse({ description: 'User activated successfully' })
  @HttpCode(HttpStatus.OK)
  async activate(@Param('id') id: string) {
    await this.userService.setUserStatus(Number(id), true);
  }

  @Patch(':id/deactivate')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Deactivate user' })
  @ApiOkResponse({ description: 'User deactivated successfully' })
  @HttpCode(HttpStatus.OK)
  async deactivateUser(@Param('id') id: string) {
    await this.userService.setUserStatus(Number(id), false);
  }

  @Get('check-email/:email')
  @ApiOperation({ summary: 'Check user email' })
  @ApiOkResponse({ description: 'Check email successfully' })
  @HttpCode(HttpStatus.OK)
  async checkEmail(@Param('email') email: string) {
    return await this.userService.checkEmail(email);
  }
}
