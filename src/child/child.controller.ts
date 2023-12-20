import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ChildService } from './child.service';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('child')
@ApiTags('Child')
export class ChildController {
  constructor(private readonly childService: ChildService) {}

  @Get('getAllChild')
  @UseGuards(AuthGuard)
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async getAllChild() {
    return true;
  }
}
