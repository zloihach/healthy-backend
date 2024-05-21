import { CreateVaccinationDto } from '../../vaccine/dto/create-vaccination.dto';
import { UserVaccine } from '@prisma/client';
import { UpdateVaccinationBodyDto } from '../dto/update-vaccination-body.dto';
import { SetVaccinationStatusBodyDto } from '../dto/set-vaccination-status.dto';

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
