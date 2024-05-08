// src/publication/interface/ipublication.service.ts

import { Publication } from '@prisma/client';
import { CreatePublicationBodyDto } from '../dto/createPublicationDto';
import { EditPublicationBodyDto } from '../dto/editPublicationDto';
import { SetPublicationStatusBodyDto } from '../dto/setPublicationStatusDto';
import { SearchPublicationBodyDto } from '../dto/searchPublicationDto';
import { PaginationQueryDto } from '../dto/pagginationDto';

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
