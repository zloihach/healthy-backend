import { Vaccine } from '@prisma/client';
import { CreateVaccineDto } from '../dto/create-vaccine.dto';
import { EditVaccineDto } from '../dto/edit-vaccine.dto';
import { SearchVaccineDto } from '../dto/search-vaccine.dto';

export interface IVaccineService {
  getAllVaccine(): Promise<Vaccine[]>;
  getVaccineById(id: number): Promise<Vaccine>;
  createVaccine(createVaccineDto: CreateVaccineDto): Promise<Vaccine>;
  updateVaccine(id: number, editVaccineDto: EditVaccineDto): Promise<Vaccine>;
  searchVaccine(searchVaccineDto: SearchVaccineDto): Promise<Vaccine[]>;
}
