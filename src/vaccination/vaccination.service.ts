import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DbService } from '../db/db.service';
import { UsersService } from '../users/users.service';
import { VaccineService } from '../vaccine/vaccine.service';
import { UserVaccine } from '@prisma/client';
import { CreateVaccinationDto } from '../vaccine/dto/createVaccination';
import { formatISO } from 'date-fns';
import { IVaccinationService } from './interfaces';
import { UpdateVaccinationBodyDto } from './dto/updateVaccinationBody';
import { SetVaccinationStatusBodyDto } from './dto/setVaccinationStatus';

@Injectable()
export class VaccinationService implements IVaccinationService {
  constructor(
    private readonly db: DbService,
    private readonly vaccineService: VaccineService,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  async createVaccination(createVaccinationDto: CreateVaccinationDto) {
    const { userId, vaccineId, ...vaccinationData } = createVaccinationDto;

    const user = await this.userService.getUserById(userId);
    const vaccine = await this.vaccineService.getVaccineById(vaccineId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    if (!vaccine) {
      throw new NotFoundException(`Vaccine with ID ${vaccineId} not found`);
    }

    const formattedVaccinationDate = this.formatDate(
      vaccinationData.vaccination_date,
    );

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

  async changeVaccinationStatus(
    setVaccinationStatusBodyDto: SetVaccinationStatusBodyDto,
  ): Promise<UserVaccine> {
    const { id, isVaccinated } = setVaccinationStatusBodyDto;

    return this.db.userVaccine.update({
      where: { id },
      data: {
        is_vaccinated: isVaccinated,
        updated_at: new Date(),
      },
    });
  }
  async fillUserVaccinationTable(userId: number): Promise<void> {
    try {
      const user = await this.userService.getUserById(userId);

      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      const vaccines = await this.vaccineService.getAllVaccine();
      for (const vaccine of vaccines) {
        const existingUserVaccine = await this.db.userVaccine.findFirst({
          where: {
            user_id: user.id,
            vaccine_id: vaccine.id,
          },
        });

        if (!existingUserVaccine) {
          await this.db.userVaccine.create({
            data: {
              user: {
                connect: { id: user.id },
              },
              vaccine: {
                connect: { id: vaccine.id },
              },
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

  async createVaccinationCalendar(id: number): Promise<number> {
    try {
      const currentUser = await this.userService.getUserById(id);

      if (!currentUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      const userAgeInMonths = this.calculateAgeInMonths(currentUser.dob);

      const userVaccines = await this.db.userVaccine.findMany({
        where: {
          user_id: currentUser.id,
        },
      });

      for (const userVaccine of userVaccines) {
        const vaccine = await this.vaccineService.getVaccineById(
          userVaccine.vaccine_id,
        );

        if (
          userAgeInMonths >= vaccine.min_age &&
          userAgeInMonths <= vaccine.max_age &&
          !userVaccine.is_vaccinated
        ) {
          await this.db.userVaccine.update({
            where: { id: userVaccine.id },
            data: {
              is_vaccinated: true,
              updated_at: new Date(),
            },
          });
        }
      }

      return id;
    } catch (error) {
      console.error('Error creating vaccination calendar:', error);
      throw new Error(
        'An error occurred while creating the vaccination calendar.',
      );
    }
  }

  async updateVaccination(
    updateVaccinationBodyDto: UpdateVaccinationBodyDto,
  ): Promise<UserVaccine> {
    try {
      const { vaccination_id, is_vaccinated } = updateVaccinationBodyDto;
      const calcVaccinationDate = this.formatDate(
        updateVaccinationBodyDto.vaccination_date,
      );
      return await this.db.userVaccine.update({
        where: { id: vaccination_id },
        data: {
          is_vaccinated,
          updated_at: new Date(),
          medical_center: updateVaccinationBodyDto.medical_center,
          dose: updateVaccinationBodyDto.dose,
          serial_number: updateVaccinationBodyDto.serial_number,
          vaccination_date: calcVaccinationDate,
          commentary: updateVaccinationBodyDto.commentary,
        },
      });
    } catch (error) {
      console.error('Error updating vaccination:', error);
      throw new Error(
        'An error occurred while updating the vaccination record.',
      );
    }
  }

  async getAllVaccinationsForCurrentUser(
    userId: number,
  ): Promise<UserVaccine[]> {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return this.db.userVaccine.findMany({
      where: { user_id: user.id },
      include: {
        vaccine: {
          select: {
            name: true,
            type: true,
          },
        },
      },
    });
  }

  private calculateAgeInMonths(birthdate: Date): number {
    const today = new Date();
    const birthdateObj = new Date(birthdate);
    const ageInMilliseconds = today.getTime() - birthdateObj.getTime();
    const ageInMonths = ageInMilliseconds / (1000 * 60 * 60 * 24 * 30);
    const roundedAgeInMonths = Math.floor(ageInMonths);
    return roundedAgeInMonths;
  }

  private formatDate(vaccinationDate: Date | undefined | null): string | null {
    return vaccinationDate ? formatISO(new Date(vaccinationDate)) : null;
  }
}
