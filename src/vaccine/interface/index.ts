import { Vaccine } from '@prisma/client';
import { CreateVaccineDto } from '../dto/createVaccine';
import { EditVaccineDto } from '../dto/editVaccine';
import { SearchVaccineDto } from '../dto/seacrhVaccine';

export interface IVaccineService {
  getAllVaccine(): Promise<Vaccine[]>;
  getVaccineById(id: number): Promise<Vaccine>;
  createVaccine(createVaccineDto: CreateVaccineDto): Promise<Vaccine>;
  updateVaccine(id: number, editVaccineDto: EditVaccineDto): Promise<Vaccine>;
  searchVaccine(searchVaccineDto: SearchVaccineDto): Promise<Vaccine[]>;
}
