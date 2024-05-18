import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { Vaccine } from '@prisma/client';
import { IVaccineService } from './interface';
import { EditVaccineDto } from './dto/editVaccine';
import { CreateVaccineDto } from './dto/createVaccine';
import { SearchVaccineDto } from './dto/seacrhVaccine';

@Injectable()
export class VaccineService implements IVaccineService {
  private readonly logger = new Logger(VaccineService.name);

  constructor(private readonly db: DbService) {}

  async getAllVaccine(): Promise<Vaccine[]> {
    try {
      const vaccines = await this.db.vaccine.findMany();
      this.logger.log('Fetched all vaccines');
      return vaccines;
    } catch (error) {
      this.logger.error('Error fetching all vaccines', error.stack);
      throw new Error('An error occurred while fetching all vaccines.');
    }
  }

  async getVaccineById(id: number): Promise<Vaccine> {
    try {
      const vaccine = await this.db.vaccine.findFirst({ where: { id: id } });
      if (!vaccine) {
        this.logger.warn(`Vaccine with ID ${id} not found`);
        throw new NotFoundException(`Vaccine with ID ${id} not found`);
      }
      this.logger.log(`Fetched vaccine with ID ${id}`);
      return vaccine;
    } catch (error) {
      this.logger.error(`Error fetching vaccine with ID ${id}`, error.stack);
      throw error;
    }
  }

  async createVaccine(createVaccineDto: CreateVaccineDto): Promise<Vaccine> {
    try {
      const { name, description, type, min_age, max_age } = createVaccineDto;
      const newVaccine = await this.db.vaccine.create({
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
      this.logger.log(`Created vaccine with name ${name}`);
      return newVaccine;
    } catch (error) {
      this.logger.error('Error creating vaccine', error.stack);
      throw new Error('An error occurred while creating the vaccine.');
    }
  }

  async updateVaccine(
    id: number,
    editVaccineDto: EditVaccineDto,
  ): Promise<Vaccine> {
    try {
      const updatedVaccine = await this.db.vaccine.update({
        where: { id },
        data: {
          ...editVaccineDto,
          edited_at: new Date(),
        },
      });
      this.logger.log(`Updated vaccine with ID ${id}`);
      return updatedVaccine;
    } catch (error) {
      this.logger.error(`Error updating vaccine with ID ${id}`, error.stack);
      throw new Error('An error occurred while updating the vaccine.');
    }
  }

  async searchVaccine(searchVaccineDto: SearchVaccineDto): Promise<Vaccine[]> {
    try {
      const { keyword, type } = searchVaccineDto;

      if ((!keyword || keyword.trim() === '') && !type) {
        this.logger.warn('No search criteria provided');
        return [];
      }

      const searchConditions: any = {};
      if (keyword) {
        const lowerKeyword = keyword.toLowerCase();
        searchConditions.OR = [
          { name: { contains: lowerKeyword } },
          { description: { contains: lowerKeyword } },
        ];
      }
      if (type) {
        searchConditions.type = type;
      }

      const vaccines = await this.db.vaccine.findMany({
        where: searchConditions,
      });
      this.logger.log(
        `Found ${vaccines.length} vaccines matching search criteria`,
      );
      return vaccines;
    } catch (error) {
      this.logger.error('Error searching for vaccines', error.stack);
      throw new Error('An error occurred while searching for vaccines.');
    }
  }
}
