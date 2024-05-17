import { Injectable, NotFoundException } from '@nestjs/common';
import { Publication } from '@prisma/client';
import { CreatePublicationBodyDto } from './dto/createPublicationDto';
import { EditPublicationBodyDto } from './dto/editPublicationDto';
import { SetPublicationStatusBodyDto } from './dto/setPublicationStatusDto';
import { IPublicationService } from './interface';
import { DbService } from '../db/db.service';
import { SearchPublicationBodyDto } from './dto/searchPublicationDto';
import { FileService } from '../files/file.service';
import { PaginationQueryDto } from './dto/pagginationDto';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class PublicationService implements IPublicationService {
  constructor(
    private readonly db: DbService,
    private readonly fileService: FileService,
    private readonly redisService: RedisService,
  ) {}

  private readonly cacheKeyPrefix = 'publication:';

  async createPublication(
    createPublicationBodyDto: CreatePublicationBodyDto,
  ): Promise<Publication> {
    const { image, ...publicationData } = createPublicationBodyDto;
    const imageUrl: string | null = image ? await this.uploadImage(image) : null;

    const publication = await this.db.publication.create({
      data: {
        ...publicationData,
        image_url: imageUrl,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    await this.redisService.delete(this.cacheKeyPrefix + 'all:*');
    return publication;
  }

  async editPublication(
    editPublicationDto: EditPublicationBodyDto,
  ): Promise<Publication> {
    const { id, image, ...publicationData } = editPublicationDto;
    await this.findPublicationById(id);

    const imageUrl: string | null = image ? await this.uploadImage(image) : null;

    const updatedPublication = await this.db.publication.update({
      where: { id },
      data: {
        ...publicationData,
        image_url: imageUrl,
        updated_at: new Date(),
      },
    });

    await this.redisService.insert(
      this.cacheKeyPrefix + updatedPublication.id,
      JSON.stringify(updatedPublication),
    );
    await this.redisService.delete(this.cacheKeyPrefix + 'all:*');

    return updatedPublication;
  }

  async setPublicationStatus(
    setPublicationStatusDto: SetPublicationStatusBodyDto,
  ): Promise<Publication> {
    const { id, is_active } = setPublicationStatusDto;
    await this.findPublicationById(id);

    const updatedPublication = await this.db.publication.update({
      where: { id },
      data: {
        is_active,
        updated_at: new Date(),
      },
    });

    await this.redisService.insert(
      this.cacheKeyPrefix + updatedPublication.id,
      JSON.stringify(updatedPublication),
    );
    await this.redisService.delete(this.cacheKeyPrefix + 'all:*');

    return updatedPublication;
  }

  async getAllPublications({
                             page,
                             limit,
                           }: PaginationQueryDto): Promise<Publication[]> {
    const cacheKey = `${this.cacheKeyPrefix}all:${page}:${limit}`;
    const cachedPublications = await this.redisService.get(cacheKey);

    if (cachedPublications) {
      return JSON.parse(cachedPublications);
    }

    const publications = await this.db.publication.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    await this.redisService.insert(cacheKey, JSON.stringify(publications));
    return publications;
  }

  async getPublicationById(id: number): Promise<Publication> {
    const cacheKey = this.cacheKeyPrefix + id;
    const cachedPublication = await this.redisService.get(cacheKey);

    if (cachedPublication) {
      return JSON.parse(cachedPublication);
    }

    const publication = await this.findPublicationById(id);

    await this.redisService.insert(cacheKey, JSON.stringify(publication));
    return publication;
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

    const cacheKey = `${this.cacheKeyPrefix}search:${JSON.stringify(whereClause)}`;
    const cachedPublications = await this.redisService.get(cacheKey);

    if (cachedPublications) {
      return JSON.parse(cachedPublications);
    }

    const publications = await this.db.publication.findMany({
      where: whereClause,
    });

    await this.redisService.insert(cacheKey, JSON.stringify(publications));
    return publications;
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

  async countPublications(): Promise<number> {
    const cacheKey = `${this.cacheKeyPrefix}count`;
    const cachedCount = await this.redisService.get(cacheKey);

    if (cachedCount) {
      return parseInt(cachedCount, 10);
    }

    const count = await this.db.publication.count();
    await this.redisService.insert(cacheKey, count.toString());
    return count;
  }
}
