import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('getAllUsers')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('getUserById/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(Number(id));
  }

  @Get('getUserByEmail/:email')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  getUserByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Get('getAllUserChild')
  @UseGuards(AuthGuard)
  @Roles(Role.User)
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async getAllUserChild() {
    return true;
  }

  @Get('getUserChildById/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.User)
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  getUserChildById(@Param('id') id: string) {
    return id;
  }

  @Patch('activateUser/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async activate(@Param('id') id: string) {
    await this.userService.setUserStatus(Number(id), true);
  }

  @Patch('deactivateUser/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async deactivateUser(@Param('id') id: string) {
    await this.userService.setUserStatus(Number(id), false);
  }
}
