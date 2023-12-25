// publication/interface.ts
import { Publication } from '@prisma/client';
import { SearchPublicationBodyDto } from '../dto/searchPublicationDto';
import { CreatePublicationBodyDto } from '../dto/createPublicationDto';
import { EditPublicationBodyDto } from '../dto/editPublicationDto';
import { SetPublicationStatusBodyDto } from '../dto/setPublicationStatusDto';

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
  getAllPublications(): Promise<Publication[]>;
  getPublicationById(id: number): Promise<Publication>;
  searchPublication(
    searchPublicationDto: SearchPublicationBodyDto,
  ): Promise<Publication[]>;
}
