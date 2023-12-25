import { Publication } from '@prisma/client';
import { CreatePublicationBodyDto } from '../dto/createPublicationDto';
import { EditPublicationBodyDto } from '../dto/editPublicationDto';
import { SetPublicationStatusBodyDto } from '../dto/setPublicationStatusDto';

export interface IPublicationService {
  createPublication(
    createPublicationBodyDto: CreatePublicationBodyDto,
  ): Promise<Publication>;

  editPublication(
    editPublicationBodyDto: EditPublicationBodyDto,
  ): Promise<Publication>;

  setPublicationStatus(
    setPublicationStatusBodyDto: SetPublicationStatusBodyDto,
  ): Promise<Publication>;
}
