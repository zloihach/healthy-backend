// src/publication/interface/ipublication.service.ts

import { Publication } from '@prisma/client';
import { CreatePublicationBodyDto } from '../dto/create-publication.dto';
import { EditPublicationBodyDto } from '../dto/edit-publication.dto';
import { SetPublicationStatusBodyDto } from '../dto/set-publication-status.dto';
import { SearchPublicationBodyDto } from '../dto/search-publication.dto';
import { PaginationQueryDto } from '../dto/paggination.dto';

export interface IPublicationService {
  createPublication(
    createPublicationBodyDto: CreatePublicationBodyDto,
  ): Promise<Publication>;

  editPublication(
    editPublicationDto: EditPublicationBodyDto,
  ): Promise<Publication>;

  setPublicationStatus(
    setPublicationStatusDto: SetPublicationStatusBodyDto,
  ): Promise<Publication>;

  getAllPublications(paginationDto: PaginationQueryDto): Promise<Publication[]>;

  getPublicationById(id: number): Promise<Publication>;

  searchPublication(
    searchPublicationDto: SearchPublicationBodyDto,
    paginationDto: PaginationQueryDto,
  ): Promise<Publication[]>;
}
