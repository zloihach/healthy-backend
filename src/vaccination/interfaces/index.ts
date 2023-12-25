import { CreateVaccinationDto } from '../../vaccine/dto/createVaccination';
import { UserVaccine } from '@prisma/client';
import { UpdateVaccinationBodyDto } from '../dto/updateVaccinationBody';
import { SetVaccinationStatusBodyDto } from '../dto/setVaccinationStatus';

export interface IVaccinationService {
  createVaccination(
    createVaccinationDto: CreateVaccinationDto,
  ): Promise<UserVaccine>;
  getUserVaccinations(userId: number): Promise<UserVaccine[]>;
  createVaccinationCalendar(id: number): Promise<number>;
  fillUserVaccinationTable(userId: number): Promise<void>;
  updateVaccination(
    updateVaccinationBodyDto: UpdateVaccinationBodyDto,
  ): Promise<UserVaccine>;
  changeVaccinationStatus(
    setVaccinationStatusBodyDto: SetVaccinationStatusBodyDto,
  ): Promise<UserVaccine>;
}
