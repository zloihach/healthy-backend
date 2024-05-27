import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { SessionInfo } from '../auth/decorators/session-info.decorator';
import { GetSessionInfoDto } from '../auth/dto/sessioninfo';
import { GetCurrentUserDto } from './dto/get-current-user.dto';
import { DbService } from '../db/db.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  private readonly db: DbService;

  constructor(private readonly userService: UsersService) {}

  @Get('')
  @UseGuards(AuthGuard, RoleGuard)
  // @Roles(Role.Admin)
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ description: 'List of users fetched successfully' })
  @HttpCode(HttpStatus.OK)
  async getAllUsers() {
    try {
      return await this.userService.getAllUsers();
    } catch (error) {
      this.logger.error('Failed to get all users', error.stack);
      throw error;
    }
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiOkResponse({ description: 'User fetched successfully' })
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('id') id: string) {
    try {
      const user = await this.userService.getUserById(Number(id));
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      this.logger.error(`Failed to get user by ID: ${id}`, error.stack);
      throw error;
    }
  }

  @Get('/:email')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Get user by email' })
  @ApiOkResponse({ description: 'User fetched successfully' })
  @HttpCode(HttpStatus.OK)
  async getUserByEmail(@Param('email') email: string) {
    try {
      return await this.userService.findByEmail(email);
    } catch (error) {
      this.logger.error(`Failed to get user by email: ${email}`, error.stack);
      throw error;
    }
  }

  @Patch(':id/activate')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Activate user' })
  @ApiOkResponse({ description: 'User activated successfully' })
  @HttpCode(HttpStatus.OK)
  async activate(@Param('id') id: string) {
    try {
      await this.userService.setUserStatus(Number(id), true);
    } catch (error) {
      this.logger.error(`Failed to activate user with ID: ${id}`, error.stack);
      throw error;
    }
  }

  @Patch(':id/deactivate')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Deactivate user' })
  @ApiOkResponse({ description: 'User deactivated successfully' })
  @HttpCode(HttpStatus.OK)
  async deactivateUser(@Param('id') id: string) {
    try {
      await this.userService.setUserStatus(Number(id), false);
    } catch (error) {
      this.logger.error(
        `Failed to deactivate user with ID: ${id}`,
        error.stack,
      );
      throw error;
    }
  }

  @Get('check-email/:email')
  @ApiOperation({ summary: 'Check user email' })
  @ApiOkResponse({ description: 'Check email successfully' })
  @HttpCode(HttpStatus.OK)
  async checkEmail(@Param('email') email: string) {
    try {
      return await this.userService.checkEmail(email);
    } catch (error) {
      this.logger.error(`Failed to check email: ${email}`, error.stack);
      throw error;
    }
  }
}
