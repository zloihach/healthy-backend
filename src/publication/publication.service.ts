import { Injectable, NotFoundException } from '@nestjs/common';
import { Publication } from '@prisma/client';
import { CreatePublicationBodyDto } from './dto/createPublicationDto';
import { EditPublicationBodyDto } from './dto/editPublicationDto';
import { SetPublicationStatusBodyDto } from './dto/setPublicationStatusDto';
import { IPublicationService } from './interface';
import { DbService } from '../db/db.service';
import { SearchPublicationBodyDto } from './dto/searchPublicationDto';
import { FileService } from '../files/file.service';

@Injectable()
export class PublicationService implements IPublicationService {
  constructor(
    private readonly db: DbService,
    private readonly fileService: FileService,
  ) {}

  async createPublication(
    createPublicationBodyDto: CreatePublicationBodyDto,
  ): Promise<Publication> {
    const { image, ...publicationData } = createPublicationBodyDto;
    const imageUrl: string | null = image
      ? await this.uploadImage(image)
      : null;

    return this.db.publication.create({
      data: {
        ...publicationData,
        image_url: imageUrl,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
  }

  async editPublication(
    editPublicationDto: EditPublicationBodyDto,
  ): Promise<Publication> {
    const { id, image, ...publicationData } = editPublicationDto;
    await this.findPublicationById(id);

    const imageUrl: string | null = image
      ? await this.uploadImage(image)
      : null;

    return this.db.publication.update({
      where: { id },
      data: {
        ...publicationData,
        image_url: imageUrl,
        updated_at: new Date(),
      },
    });
  }

  async setPublicationStatus(
    setPublicationStatusDto: SetPublicationStatusBodyDto,
  ): Promise<Publication> {
    const { id, is_active } = setPublicationStatusDto;
    await this.findPublicationById(id);
    return this.db.publication.update({
      where: { id },
      data: {
        is_active,
        updated_at: new Date(),
      },
    });
  }

  async getAllPublications(): Promise<Publication[]> {
    return this.db.publication.findMany();
  }

  async getPublicationById(id: number): Promise<Publication> {
    return this.findPublicationById(id);
  }

  async searchPublication(
    searchPublicationDto: SearchPublicationBodyDto,
  ): Promise<Publication[]> {
    const { keyword, isActive } = searchPublicationDto;

    const whereClause: any = {};

    if (keyword !== undefined) {
      whereClause.full_title = {
        contains: keyword,
      };
    }

    if (isActive !== undefined) {
      whereClause.is_active = isActive;
    }

    return this.db.publication.findMany({
      where: whereClause,
    });
  }

  private async uploadImage(image: {
    buffer: Buffer;
    originalname: string;
  }): Promise<string> {
    const uploadedImageUrl = await this.fileService.uploadFile(
      image.buffer,
      image.originalname,
    );
    return uploadedImageUrl;
  }

  private async findPublicationById(id: number): Promise<Publication> {
    const publication = await this.db.publication.findUnique({
      where: { id },
    });
    if (!publication) {
      throw new NotFoundException(`Publication with ID ${id} not found`);
    }
    return publication;
  }
}
