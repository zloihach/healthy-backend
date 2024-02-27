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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { CreatePublicationBodyDto } from './dto/createPublicationDto';
import { EditPublicationBodyDto } from './dto/editPublicationDto';
import { Publication } from '@prisma/client';
import { SetPublicationStatusBodyDto } from './dto/setPublicationStatusDto';
import { SearchPublicationBodyDto } from './dto/searchPublicationDto';
import { PublicationService } from './publication.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('publication')
@ApiTags('Publication')
@UseGuards(AuthGuard, RoleGuard)
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Get('getAllPublications')
  @Roles(Role.User)
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async getAllPublications() {
    return this.publicationService.getAllPublications();
  }

  @Get('getPublicationById/:publicationId')
  @Roles(Role.User)
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async getPublicationById(@Param('publicationId') publicationId: string) {
    return this.publicationService.getPublicationById(Number(publicationId));
  }

  @Post('createPublication')
  @Roles(Role.Admin)
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Данные для создания публикации',
    type: CreatePublicationBodyDto,
  })
  @UseInterceptors(FileInterceptor('image'))
  async createPublication(
    @Body() createPublicationDto: CreatePublicationBodyDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const publicationData = { ...createPublicationDto, image };
    return this.publicationService.createPublication(publicationData);
  }

  @Patch('editPublication/:publicationId')
  @Roles(Role.Admin)
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async editPublication(
    @Body() editPublicationDto: EditPublicationBodyDto,
  ): Promise<Publication> {
    return this.publicationService.editPublication(editPublicationDto);
  }

  @Patch('setPublicationStatus/:publicationId')
  @Roles(Role.Admin)
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async setPublicationStatus(
    @Body() setPublicationStatusDto: SetPublicationStatusBodyDto,
  ): Promise<Publication> {
    return this.publicationService.setPublicationStatus(
      setPublicationStatusDto,
    );
  }

  @Get('searchPublication')
  @Roles(Role.User)
  @ApiOkResponse()
  @ApiQuery({
    name: 'keyword',
    description: 'Keyword for publication search',
    required: false,
  })
  @ApiQuery({
    name: 'isActive',
    description: 'Filter by publication status',
    required: false,
    schema: {
      default: true,
    },
  })
  @HttpCode(HttpStatus.OK)
  async searchPublication(
    @Query() searchPublicationDto: SearchPublicationBodyDto,
  ) {
    return this.publicationService.searchPublication(searchPublicationDto);
  }
}
