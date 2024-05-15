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
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { Publication } from '@prisma/client';
import { PublicationService } from './publication.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePublicationBodyDto } from './dto/createPublicationDto';
import { EditPublicationBodyDto } from './dto/editPublicationDto';
import { SetPublicationStatusBodyDto } from './dto/setPublicationStatusDto';
import { SearchPublicationBodyDto } from './dto/searchPublicationDto';
import { PaginationQueryDto } from './dto/pagginationDto';

@Controller('publication')
@ApiTags('Publication')
@UseGuards(AuthGuard, RoleGuard)
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve a list of publications with pagination' })
  @ApiOkResponse({ description: 'Publications retrieved successfully' })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number of the pagination',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page',
  })
  async getAllPublications(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.publicationService.getAllPublications(paginationQueryDto);
  }

  @Get('/count')
  @ApiOperation({ summary: 'Count total number of publications' })
  @ApiOkResponse({
    description: 'Total number of publications counted successfully',
  })
  async countPublications() {
    return this.publicationService.countPublications();
  }

  @Get('get/:publicationId')
  @Roles(Role.User)
  @ApiOperation({ summary: 'Get publication by ID' })
  @ApiOkResponse({ description: 'Publication fetched successfully' })
  @HttpCode(HttpStatus.OK)
  async getPublicationById(@Param('publicationId') publicationId: string) {
    return this.publicationService.getPublicationById(Number(publicationId));
  }

  @Post('create')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create a new publication' })
  @ApiOkResponse({ description: 'Publication created successfully' })
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Data for creating a publication',
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

  @Patch('edit')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Edit a publication' })
  @ApiOkResponse({ description: 'Publication edited successfully' })
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Data for editing a publication',
    type: EditPublicationBodyDto,
  })
  @UseInterceptors(FileInterceptor('image'))
  async editPublication(
    @Body() editPublicationDto: EditPublicationBodyDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Publication> {
    const updatedData = { ...editPublicationDto, image };
    return this.publicationService.editPublication(updatedData);
  }

  @Patch('setStatus/:publicationId')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Set publication status' })
  @ApiOkResponse({ description: 'Publication status set successfully' })
  @HttpCode(HttpStatus.OK)
  async setPublicationStatus(
    @Param('publicationId') publicationId: string,
    @Body() setPublicationStatusDto: SetPublicationStatusBodyDto,
  ): Promise<Publication> {
    return this.publicationService.setPublicationStatus(
      setPublicationStatusDto,
    );
  }

  @Get('search')
  @Roles(Role.User)
  @ApiOperation({ summary: 'Search for publications' })
  @ApiOkResponse({ description: 'Publications fetched successfully' })
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
