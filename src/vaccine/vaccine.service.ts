import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { CreateVaccineDto } from './dto/createVaccine';
import { EditVaccineDto } from './dto/editVaccine';
import { UserVaccine, Vaccine } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { SearchVaccineDto } from './dto/seacrhVaccine';
import { CreateVaccinationDto } from './dto/createVaccination';
import { formatISO } from 'date-fns';

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

  async createVaccination(createVaccinationDto: CreateVaccinationDto) {
    const { userId, vaccineId, ...vaccinationData } = createVaccinationDto;

    const user = await this.userService.getUserById(userId);
    const vaccine = await this.getVaccineById(vaccineId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    if (!vaccine) {
      throw new NotFoundException(`Vaccine with ID ${vaccineId} not found`);
    }

    const formattedVaccinationDate = vaccinationData.vaccinationDate
      ? formatISO(new Date(vaccinationData.vaccinationDate))
      : null;

    return this.db.userVaccine.create({
      data: {
        user: { connect: { id: user.id } },
        vaccine: { connect: { id: vaccine.id } },
        ...vaccinationData,
        vaccination_date: formattedVaccinationDate,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
  }

  async getUserVaccinations(userId: number): Promise<UserVaccine[]> {
    return this.db.userVaccine.findMany({
      where: {
        user_id: userId,
        is_vaccinated: true,
      },
      include: {
        vaccine: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async createVaccinationCalendar(id: number) {
    return id;
  }
  async setVaccinationStatus(id: number, isVaccinated: boolean) {
    return this.db.userVaccine.update({
      where: { id },
      data: {
        is_vaccinated: isVaccinated,
        updated_at: new Date(),
      },
    });
  }
  async fillUserVaccineTable(userId: number): Promise<void> {
    console.log('fillUserVaccineTable');
    try {
      const user = await this.userService.getUserById(userId);

      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      const vaccines = await this.getAllVaccine();
      console.log('vaccines', vaccines);
      for (const vaccine of vaccines) {
        // Проверьте, не добавлена ли уже данная прививка пользователю
        const existingUserVaccine = await this.db.userVaccine.findFirst({
          where: {
            user_id: user.id,
            vaccine_id: vaccine.id,
          },
        });

        if (!existingUserVaccine) {
          // Создайте запись в таблице UserVaccine
          await this.db.userVaccine.create({
            data: {
              user: {
                connect: { id: user.id },
              },
              vaccine: {
                connect: { id: vaccine.id },
              },
              // medical_center: '...',
              // dose: '...',
              // serial_number: '...',
              // vaccination_date: '...',
              // commentary: '...',
              is_vaccinated: false,
              created_at: new Date(),
              updated_at: new Date(),
            },
          });
        }
      }
    } catch (error) {
      console.error('Error filling UserVaccine table:', error);
      throw new Error('An error occurred while filling UserVaccine table.');
    }
  }
}
