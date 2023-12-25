import { CreateVaccinationDto } from '../../vaccine/dto/createVaccination';
import { UserVaccine } from '@prisma/client';
import { UpdateVaccinationBodyDto } from '../dto';

export interface IVaccinationService {
  createVaccination(
    createVaccinationDto: CreateVaccinationDto,
  ): Promise<UserVaccine>;
  getUserVaccinations(userId: number): Promise<UserVaccine[]>;
  createVaccinationCalendar(id: number): Promise<number>;
  setVaccinationStatus(id: number, isVaccinated: boolean): Promise<UserVaccine>;
  fillUserVaccinationTable(userId: number): Promise<void>;
  updateVaccination(
    updateVaccinationBodyDto: UpdateVaccinationBodyDto,
  ): Promise<UserVaccine>;
}
