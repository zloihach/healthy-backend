import { Injectable, NotFoundException } from '@nestjs/common';
import { Publication } from '@prisma/client';
import { CreatePublicationBodyDto } from './dto/createPublicationDto';
import { EditPublicationBodyDto } from './dto/editPublicationDto';
import { SetPublicationStatusBodyDto } from './dto/setPublicationStatusDto';
import { IPublicationService } from './interface';
import { DbService } from '../db/db.service';
import { SearchPublicationBodyDto } from './dto/searchPublicationDto';
import { S3Service } from '../s3/s3.service';

@Injectable()
export class PublicationService implements IPublicationService {
  constructor(
    private readonly db: DbService,
    private readonly s3Service: S3Service,
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
    const { id, ...publicationData } = editPublicationDto;
    await this.findPublicationById(id);
    return this.db.publication.update({
      where: { id },
      data: {
        ...publicationData,
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
    return this.db.publication.findMany({
      where: {
        full_title: {
          contains: keyword,
        },
        is_active: isActive,
      },
    });
  }

  private async uploadImage(image: {
    buffer: Buffer;
    originalname: string;
  }): Promise<string> {
    const uploadedImage = await this.s3Service.uploadPublicFile(
      image.buffer,
      image.originalname,
    );
    return uploadedImage.Location;
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
