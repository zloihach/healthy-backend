// publication/publication.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Publication } from '@prisma/client';
import { CreatePublicationBodyDto } from './dto/createPublicationDto';
import { EditPublicationBodyDto } from './dto/editPublicationDto';
import { SetPublicationStatusBodyDto } from './dto/setPublicationStatusDto';
import { IPublicationService } from './interface';
import { DbService } from '../db/db.service';
import { SearchPublicationBodyDto } from './dto/searchPublicationDto';

@Injectable()
export class PublicationService implements IPublicationService {
  constructor(private readonly db: DbService) {}

  async createPublication(
    createPublicationBodyDto: CreatePublicationBodyDto,
  ): Promise<Publication> {
    const { full_title, short_title, text, is_active } =
      createPublicationBodyDto;
    return this.db.publication.create({
      data: {
        full_title,
        short_title,
        text,
        is_active,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
  }

  async editPublication(
    editPublicationDto: EditPublicationBodyDto,
  ): Promise<Publication> {
    const { id, full_title, short_title, text } = editPublicationDto;
    const existingPublication = await this.db.publication.findUnique({
      where: { id },
    });

    if (!existingPublication) {
      throw new NotFoundException(`Publication with ID ${id} not found`);
    }

    return this.db.publication.update({
      where: { id },
      data: {
        full_title: full_title || existingPublication.full_title,
        short_title: short_title || existingPublication.short_title,
        text: text || existingPublication.text,
        updated_at: new Date(),
      },
    });
  }

  async setPublicationStatus(
    setPublicationStatusDto: SetPublicationStatusBodyDto,
  ): Promise<Publication> {
    const { id, is_active } = setPublicationStatusDto;
    const existingPublication = await this.db.publication.findUnique({
      where: { id },
    });

    if (!existingPublication) {
      throw new NotFoundException(`Publication with ID ${id} not found`);
    }

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
    const publication = await this.db.publication.findUnique({
      where: { id },
    });

    if (!publication) {
      throw new NotFoundException(`Publication with ID ${id} not found`);
    }

    return publication;
  }

  async searchPublication(
    searchPublicationDto: SearchPublicationBodyDto,
  ): Promise<Publication[]> {
    const { keyword, isActive } = searchPublicationDto;
    // Implement search logic based on the provided criteria
    // You may need to customize this based on your database schema and requirements
    const publications = await this.db.publication.findMany({
      where: {
        full_title: {
          contains: keyword,
        },
        is_active: isActive,
      },
    });

    return publications;
  }
}
