import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { CreateVaccineDto } from './dto/createVaccine';
import { EditVaccineDto } from './dto/editVaccine';
import { Vaccine } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { SearchVaccineDto } from './dto/seacrhVaccine';
import { CreateVaccinationDto } from './dto/createVaccination';

@Injectable()
export class VaccineService {
  constructor(
    private readonly db: DbService,
    private readonly userService: UsersService,
  ) {}

  async getAllVaccine(): Promise<Vaccine[]> {
    return this.db.vaccine.findMany();
  }

  async getVaccineById(id: number): Promise<Vaccine> {
    const vaccine = await this.db.vaccine.findFirst({
      where: { id },
    });

    if (!vaccine) {
      throw new NotFoundException(`Vaccine with ID ${id} not found`);
    }

    return vaccine;
  }

  async createVaccine(createVaccineDto: CreateVaccineDto): Promise<Vaccine> {
    return this.db.vaccine.create({
      data: {
        name: createVaccineDto.name,
        description: createVaccineDto.description,
        type: createVaccineDto.type,
        min_age: createVaccineDto.min_age,
        max_age: createVaccineDto.max_age,
        created_at: new Date(),
        edited_at: new Date(),
      },
    });
  }

  async updateVaccine(
    id: number,
    editVaccineDto: EditVaccineDto,
  ): Promise<Vaccine> {
    return this.db.vaccine.update({
      where: { id },
      data: {
        name: editVaccineDto.name,
        description: editVaccineDto.description,
        type: editVaccineDto.type,
        min_age: editVaccineDto.min_age,
        max_age: editVaccineDto.max_age,
        edited_at: new Date(),
      },
    });
  }

  async searchVaccine(searchVaccineDto: SearchVaccineDto): Promise<Vaccine[]> {
    try {
      const { keyword } = searchVaccineDto;

      if (!keyword || keyword.trim() === '') {
        return [];
      }

      const lowerKeyword = keyword.toLowerCase();

      return this.db.vaccine.findMany({
        where: {
          OR: [
            { name: { contains: lowerKeyword } },
            { description: { contains: lowerKeyword } },
          ],
        },
      });
    } catch (error) {
      console.error('Error searching for vaccines:', error);
      throw new Error('An error occurred while searching for vaccines.');
    }
  }

  async createVaccination(createVaccinationDto: CreateVaccinationDto) {
    const {
      userId,
      vaccineId,
      medicalCenter,
      dose,
      serialNumber,
      vaccinationDate,
      commentary,
      isVaccinated,
    } = createVaccinationDto;

    const user = await this.userService.getUserById(userId);
    const vaccine = await this.getVaccineById(vaccineId);
    console.log(user, vaccine);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    if (!vaccine) {
      throw new NotFoundException(`Vaccine with ID ${vaccineId} not found`);
    }

    return this.db.userVaccine.create({
      data: {
        user_id: userId,
        vaccine_id: vaccineId,
        medical_center: medicalCenter,
        dose: dose,
        serial_number: serialNumber,
        vaccination_date: vaccinationDate,
        commentary: commentary,
        is_vaccinated: isVaccinated,
        created_at: new Date(),
        update_at: new Date(),
      },
    });
  }
}
