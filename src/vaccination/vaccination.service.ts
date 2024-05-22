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
import { CreateVaccinationDto } from '../vaccine/dto/create-vaccination.dto';
import { addMonths, formatISO } from 'date-fns';
import { IVaccinationService } from './interfaces';
import { UpdateVaccinationBodyDto } from './dto/update-vaccination-body.dto';
import { SetVaccinationStatusBodyDto } from './dto/set-vaccination-status.dto';

@Injectable()
export class VaccinationService implements IVaccinationService {
  constructor(
    private readonly db: DbService,
    private readonly vaccineService: VaccineService,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  async createVaccination(createVaccinationDto: CreateVaccinationDto) {
    const { userId, vaccineId, vaccination_date, ...vaccinationData } =
      createVaccinationDto;

    const user = await this.userService.getUserById(userId);
    const vaccine = await this.vaccineService.getVaccineById(vaccineId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    if (!vaccine) {
      throw new NotFoundException(`Vaccine with ID ${vaccineId} not found`);
    }

    const plannedVaccinationDate = this.calculatePlannedVaccinationDate(
      user.dob,
      vaccine.min_age,
    );

    return this.db.userVaccine.create({
      data: {
        user: { connect: { id: user.id } },
        vaccine: { connect: { id: vaccine.id } },
        vaccination_date,
        planned_vaccination_date: plannedVaccinationDate,
        ...vaccinationData,
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
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const vaccines = await this.vaccineService.getAllVaccine();
    for (const vaccine of vaccines) {
      const plannedVaccinationDate = this.calculatePlannedVaccinationDate(
        user.dob,
        vaccine.min_age,
      );

      await this.db.userVaccine.create({
        data: {
          user: { connect: { id: user.id } },
          vaccine: { connect: { id: vaccine.id } },
          is_vaccinated: false,
          vaccination_date: null,
          planned_vaccination_date: plannedVaccinationDate,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });
    }
  }

  // async createVaccinationCalendar(userId: number): Promise<number> {
  //   const user = await this.userService.getUserById(userId);
  //   if (!user) {
  //     throw new NotFoundException(`User with ID ${userId} not found`);
  //   }
  //
  //   const vaccines = await this.db.vaccine.findMany();
  //   const userAgeInMonths = this.calculateAgeInMonths(user.dob);
  //
  //   for (const vaccine of vaccines) {
  //     if (
  //       userAgeInMonths >= vaccine.min_age &&
  //       userAgeInMonths <= vaccine.max_age
  //     ) {
  //       const existingVaccination = await this.db.userVaccine.findFirst({
  //         where: { user_id: user.id, vaccine_id: vaccine.id },
  //       });
  //
  //       const plannedVaccinationDate = this.calculatePlannedVaccinationDate(
  //         user.dob,
  //         vaccine.min_age,
  //       );
  //
  //       if (!existingVaccination) {
  //         await this.db.userVaccine.create({
  //           data: {
  //             user: { connect: { id: user.id } },
  //             vaccine: { connect: { id: vaccine.id } },
  //             planned_vaccination_date: plannedVaccinationDate,
  //             is_vaccinated: plannedVaccinationDate <= new Date(),
  //             vaccination_date:
  //               plannedVaccinationDate <= new Date()
  //                 ? plannedVaccinationDate
  //                 : null,
  //             created_at: new Date(),
  //             updated_at: new Date(),
  //           },
  //         });
  //       } else if (!existingVaccination.is_vaccinated) {
  //         const newVaccinationDate =
  //           plannedVaccinationDate <= new Date()
  //             ? plannedVaccinationDate
  //             : null;
  //         await this.db.userVaccine.update({
  //           where: { id: existingVaccination.id },
  //           data: {
  //             is_vaccinated: newVaccinationDate !== null,
  //             vaccination_date: newVaccinationDate,
  //             updated_at: new Date(),
  //           },
  //         });
  //       }
  //     }
  //   }
  //   return userId;
  // }

  async updateVaccination(
    updateVaccinationBodyDto: UpdateVaccinationBodyDto,
  ): Promise<UserVaccine> {
    const { vaccination_id, is_vaccinated } = updateVaccinationBodyDto;
    const calcVaccinationDate = this.formatDate(
      updateVaccinationBodyDto.vaccination_date,
    );
    return this.db.userVaccine.update({
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
  }

  async getAllVaccinationsForCurrentUser(userId: number) {
    return this.db.userVaccine.findMany({
      where: { user_id: userId },
      include: { vaccine: true },
    });
  }

  private formatDate(vaccinationDate: Date | undefined | null): string | null {
    return vaccinationDate ? formatISO(new Date(vaccinationDate)) : null;
  }

  async createVaccinationCalendar(userId: number): Promise<UserVaccine[]> {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    console.log(
      `User found: ${user.firstname} ${user.lastname}, DOB: ${user.dob}`,
    );

    const vaccines = await this.db.vaccine.findMany({
      where: { type: 'CALENDAR' },
    });

    console.log(`Vaccines found: ${vaccines.length}`);

    const userAgeInMonths = this.calculateAgeInMonths(user.dob);
    console.log(`User age in months: ${userAgeInMonths}`);

    const processedVaccinations: UserVaccine[] = [];

    for (const vaccine of vaccines) {
      const plannedVaccinationDate = this.calculatePlannedVaccinationDate(
        user.dob,
        vaccine.min_age,
      );
      const isVaccinated = plannedVaccinationDate <= new Date();

      console.log(
        `Checking vaccine ${vaccine.name}, min_age: ${vaccine.min_age}, plannedVaccinationDate: ${plannedVaccinationDate}, isVaccinated: ${isVaccinated}`,
      );

      const existingVaccination = await this.db.userVaccine.findFirst({
        where: { user_id: user.id, vaccine_id: vaccine.id },
      });

      if (!existingVaccination) {
        console.log(
          `Creating new vaccination for user ${user.id} and vaccine ${vaccine.id}`,
        );
        const newVaccination = await this.db.userVaccine.create({
          data: {
            user: { connect: { id: user.id } },
            vaccine: { connect: { id: vaccine.id } },
            planned_vaccination_date: plannedVaccinationDate,
            is_vaccinated: isVaccinated,
            vaccination_date: isVaccinated ? plannedVaccinationDate : null,
            created_at: new Date(),
            updated_at: new Date(),
          },
        });
        processedVaccinations.push(newVaccination);
      } else {
        console.log(
          `Updating existing vaccination for user ${user.id} and vaccine ${vaccine.id}`,
        );
        const updatedVaccination = await this.db.userVaccine.update({
          where: { id: existingVaccination.id },
          data: {
            is_vaccinated: isVaccinated,
            vaccination_date: isVaccinated ? plannedVaccinationDate : null,
            updated_at: new Date(),
          },
        });
        processedVaccinations.push(updatedVaccination);
      }
    }

    console.log(`Processed vaccinations: ${processedVaccinations.length}`);
    return processedVaccinations;
  }

  private calculateAgeInMonths(birthdate: Date): number {
    const today = new Date();
    const ageInMilliseconds = today.getTime() - new Date(birthdate).getTime();
    const ageInMonths = ageInMilliseconds / (1000 * 60 * 60 * 24 * 30);
    return Math.floor(ageInMonths);
  }

  private calculatePlannedVaccinationDate(
    dob: Date,
    minAgeInMonths: number,
  ): Date {
    return addMonths(new Date(dob), minAgeInMonths);
  }
}
