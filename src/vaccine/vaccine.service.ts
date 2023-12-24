import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { CreateVaccineDto } from './dto/createVaccine';
import { EditVaccineDto } from './dto/editVaccine';
import { Vaccine } from '@prisma/client';
import { SearchVaccineDto } from './dto/seacrhVaccine';
import { IVaccineService } from './interface';

@Injectable()
export class VaccineService implements IVaccineService {
  constructor(private readonly db: DbService) {}

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
    const { name, description, type, min_age, max_age } = createVaccineDto;

    return this.db.vaccine.create({
      data: {
        name,
        description,
        type,
        min_age,
        max_age,
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
        ...editVaccineDto,
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
}
