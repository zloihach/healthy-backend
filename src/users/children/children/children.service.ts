// import {
//   Injectable,
//   Logger,
//   NotFoundException,
//   ConflictException,
// } from '@nestjs/common';
// import { DbService } from '../../../db/db.service';
// import { CreateChildDto } from './dto/create-child.dto';
// import { UpdateChildDto } from './dto/update-child.dto';
// import {
//   CreateVaccinationDto,
//   UpdateVaccinationDto,
// } from './dto/child-vaccination.dto';
// import { addMonths } from 'date-fns';
//
// @Injectable()
// export class ChildrenService {
//   private readonly logger = new Logger(ChildrenService.name);
//
//   constructor(private readonly db: DbService) {}
//
//   async getAllUserChildren(userId: number) {
//     const children = await this.db.child.findMany({
//       where: { user_id: userId },
//       include: {
//         ChildVaccine: {
//           include: {
//             vaccine: true,
//           },
//         },
//       },
//     });
//     if (!children.length) {
//       this.logger.warn(`No children found for user with ID ${userId}`);
//     }
//     return children;
//   }
//
//   async getUserChildById(userId: number, id: number) {
//     const child = await this.db.child.findFirst({
//       where: { id, user_id: userId },
//       include: {
//         ChildVaccine: true,
//       },
//     });
//     if (!child) {
//       throw new NotFoundException(`Child with ID ${id} not found`);
//     }
//     return child;
//   }
//
//   async createChild(userId: number, createChildDto: CreateChildDto) {
//     const child = await this.db.child.create({
//       data: {
//         ...createChildDto,
//         user_id: userId,
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//     });
//     this.logger.log(
//       `Child created with ID ${child.id} for user with ID ${userId}`,
//     );
//     await this.fillChildVaccinationTable(
//       child.id,
//       new Date(createChildDto.dob),
//     );
//     return child;
//   }
//
//   async updateChild(
//     userId: number,
//     id: number,
//     updateChildDto: UpdateChildDto,
//   ) {
//     const updatedChild = await this.db.child.updateMany({
//       where: { id, user_id: userId },
//       data: {
//         ...updateChildDto,
//         updated_at: new Date(),
//       },
//     });
//     if (!updatedChild.count) {
//       throw new NotFoundException(`Child with ID ${id} not found`);
//     }
//     return updatedChild;
//   }
//
//   async deleteChild(userId: number, id: number) {
//     const transaction = await this.db.$transaction(async (prisma) => {
//       await prisma.childVaccine.deleteMany({
//         where: { child_id: id },
//       });
//
//       const deletedChild = await prisma.child.delete({
//         where: { id, user_id: userId },
//       });
//
//       return deletedChild;
//     });
//
//     if (!transaction) {
//       throw new NotFoundException(`Child with ID ${id} not found`);
//     }
//
//     return transaction;
//   }
//
//   async createVaccination(
//     userId: number,
//     childId: number,
//     createVaccinationDto: CreateVaccinationDto,
//   ) {
//     const vaccine = await this.db.vaccine.findFirst({
//       where: { id: createVaccinationDto.vaccine_id },
//     });
//     if (!vaccine) {
//       throw new NotFoundException(
//         `Vaccine with ID ${createVaccinationDto.vaccine_id} not found`,
//       );
//     }
//
//     const existingVaccination = await this.db.childVaccine.findFirst({
//       where: { child_id: childId, vaccine_id: createVaccinationDto.vaccine_id },
//     });
//     if (existingVaccination) {
//       throw new ConflictException(
//         'This vaccination has already been recorded for this child',
//       );
//     }
//
//     const plannedVaccinationDate = this.calculatePlannedVaccinationDate(
//       new Date(createVaccinationDto.vaccination_date || new Date()),
//       vaccine.min_age,
//     );
//
//     const vaccination = await this.db.childVaccine.create({
//       data: {
//         ...createVaccinationDto,
//         child_id: childId,
//         vaccination_date: createVaccinationDto.vaccination_date,
//         planned_vaccination_date: plannedVaccinationDate,
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//     });
//     this.logger.log(
//       `Vaccination created with ID ${vaccination.id} for child with ID ${childId}`,
//     );
//     return vaccination;
//   }
//
//   async updateVaccination(
//     userId: number,
//     childId: number,
//     vaccinationId: number,
//     updateVaccinationDto: UpdateVaccinationDto,
//   ) {
//     if (updateVaccinationDto.vaccine_id) {
//       const vaccine = await this.db.vaccine.findFirst({
//         where: { id: updateVaccinationDto.vaccine_id },
//       });
//       if (!vaccine) {
//         throw new NotFoundException(
//           `Vaccine with ID ${updateVaccinationDto.vaccine_id} not found`,
//         );
//       }
//     }
//
//     const updatedVaccination = await this.db.childVaccine.updateMany({
//       where: { id: vaccinationId, child_id: childId },
//       data: {
//         ...updateVaccinationDto,
//         updated_at: new Date(),
//       },
//     });
//     if (!updatedVaccination.count) {
//       throw new NotFoundException(
//         `Vaccination with ID ${vaccinationId} not found`,
//       );
//     }
//     return updatedVaccination;
//   }
//
//   async isParentOfChild(userId: number, childId: number): Promise<boolean> {
//     const child = await this.db.child.findFirst({
//       where: {
//         id: childId,
//         user_id: userId,
//       },
//     });
//     return !!child;
//   }
//
//   private async fillChildVaccinationTable(
//     childId: number,
//     dob: Date,
//   ): Promise<void> {
//     const vaccines = await this.db.vaccine.findMany();
//     for (const vaccine of vaccines) {
//       const plannedVaccinationDate = this.calculatePlannedVaccinationDate(
//         dob,
//         vaccine.min_age,
//       );
//       const isVaccinated = this.calculateAgeInMonths(dob) >= vaccine.min_age;
//
//       await this.db.childVaccine.create({
//         data: {
//           child: { connect: { id: childId } },
//           vaccine: { connect: { id: vaccine.id } },
//           is_vaccinated: isVaccinated,
//           vaccination_date: isVaccinated ? plannedVaccinationDate : null,
//           planned_vaccination_date: plannedVaccinationDate,
//           created_at: new Date(),
//           updated_at: new Date(),
//         },
//       });
//     }
//   }
//
//   async createVaccinationCalendar(
//     userId: number,
//     childId: number,
//   ): Promise<number> {
//     const child = await this.db.child.findFirst({
//       where: { id: childId, user_id: userId },
//     });
//     if (!child) {
//       throw new NotFoundException(`Child with ID ${childId} not found`);
//     }
//
//     const vaccines = await this.db.vaccine.findMany();
//     const childAgeInMonths = this.calculateAgeInMonths(child.dob);
//
//     for (const vaccine of vaccines) {
//       if (
//         childAgeInMonths >= vaccine.min_age &&
//         childAgeInMonths <= vaccine.max_age
//       ) {
//         const existingVaccination = await this.db.childVaccine.findFirst({
//           where: { child_id: childId, vaccine_id: vaccine.id },
//         });
//
//         if (!existingVaccination) {
//           await this.db.childVaccine.create({
//             data: {
//               child: { connect: { id: childId } },
//               vaccine: { connect: { id: vaccine.id } },
//               planned_vaccination_date: this.calculatePlannedVaccinationDate(
//                 child.dob,
//                 vaccine.min_age,
//               ),
//               is_vaccinated: true,
//               vaccination_date: this.calculatePlannedVaccinationDate(
//                 child.dob,
//                 vaccine.min_age,
//               ),
//               created_at: new Date(),
//               updated_at: new Date(),
//             },
//           });
//         } else if (!existingVaccination.is_vaccinated) {
//           await this.db.childVaccine.update({
//             where: { id: existingVaccination.id },
//             data: {
//               is_vaccinated: true,
//               vaccination_date: this.calculatePlannedVaccinationDate(
//                 child.dob,
//                 vaccine.min_age,
//               ),
//               updated_at: new Date(),
//             },
//           });
//         }
//       }
//     }
//
//     return childId;
//   }
//
//   private calculateAgeInMonths(birthdate: Date): number {
//     const today = new Date();
//     const birthdateObj = new Date(birthdate);
//     const ageInMilliseconds = today.getTime() - birthdateObj.getTime();
//     const ageInMonths = ageInMilliseconds / (1000 * 60 * 60 * 24 * 30);
//     return Math.floor(ageInMonths);
//   }
//
//   private calculatePlannedVaccinationDate(
//     dob: Date,
//     minAgeInMonths: number,
//   ): Date {
//     return addMonths(dob, minAgeInMonths);
//   }
// }

import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { DbService } from '../../../db/db.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import {
  CreateVaccinationDto,
  UpdateVaccinationDto,
} from './dto/child-vaccination.dto';
import { addMonths } from 'date-fns';

@Injectable()
export class ChildrenService {
  private readonly logger = new Logger(ChildrenService.name);

  constructor(private readonly db: DbService) {}

  async getAllUserChildren(userId: number) {
    const children = await this.db.child.findMany({
      where: { user_id: userId },
      include: {
        ChildVaccine: {
          include: {
            vaccine: true,
          },
        },
      },
    });
    if (!children.length) {
      this.logger.warn(`No children found for user with ID ${userId}`);
    }
    return children;
  }

  async getUserChildById(userId: number, id: number) {
    const child = await this.db.child.findFirst({
      where: { id, user_id: userId },
      include: {
        ChildVaccine: true,
      },
    });
    if (!child) {
      throw new NotFoundException(`Child with ID ${id} not found`);
    }
    return child;
  }

  async createChild(userId: number, createChildDto: CreateChildDto) {
    const child = await this.db.child.create({
      data: {
        ...createChildDto,
        user_id: userId,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
    this.logger.log(
      `Child created with ID ${child.id} for user with ID ${userId}`,
    );
    await this.fillChildVaccinationTable(
      child.id,
      new Date(createChildDto.dob),
    );
    return child;
  }

  async updateChild(
    userId: number,
    id: number,
    updateChildDto: UpdateChildDto,
  ) {
    const updatedChild = await this.db.child.updateMany({
      where: { id, user_id: userId },
      data: {
        ...updateChildDto,
        updated_at: new Date(),
      },
    });
    if (!updatedChild.count) {
      throw new NotFoundException(`Child with ID ${id} not found`);
    }
    return updatedChild;
  }

  async deleteChild(id: number) {
    const transaction = await this.db.$transaction(async (prisma) => {
      await prisma.childVaccine.deleteMany({
        where: { child_id: id },
      });

      return prisma.child.delete({
        where: { id },
      });
    });

    if (!transaction) {
      throw new NotFoundException(`Child with ID ${id} not found`);
    }

    return transaction;
  }

  async createVaccination(
    userId: number,
    childId: number,
    createVaccinationDto: CreateVaccinationDto,
  ) {
    const vaccine = await this.db.vaccine.findFirst({
      where: { id: createVaccinationDto.vaccine_id },
    });
    if (!vaccine) {
      throw new NotFoundException(
        `Vaccine with ID ${createVaccinationDto.vaccine_id} not found`,
      );
    }

    const existingVaccination = await this.db.childVaccine.findFirst({
      where: { child_id: childId, vaccine_id: createVaccinationDto.vaccine_id },
    });
    if (existingVaccination) {
      throw new ConflictException(
        'This vaccination has already been recorded for this child',
      );
    }

    const plannedVaccinationDate = this.calculatePlannedVaccinationDate(
      new Date(createVaccinationDto.vaccination_date || new Date()),
      vaccine.min_age,
    );

    const vaccination = await this.db.childVaccine.create({
      data: {
        ...createVaccinationDto,
        child_id: childId,
        vaccination_date: createVaccinationDto.vaccination_date,
        planned_vaccination_date: plannedVaccinationDate,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
    this.logger.log(
      `Vaccination created with ID ${vaccination.id} for child with ID ${childId}`,
    );
    return vaccination;
  }

  async updateVaccination(
    userId: number,
    childId: number,
    vaccinationId: number,
    updateVaccinationDto: UpdateVaccinationDto,
  ) {
    if (updateVaccinationDto.vaccine_id) {
      const vaccine = await this.db.vaccine.findFirst({
        where: { id: updateVaccinationDto.vaccine_id },
      });
      if (!vaccine) {
        throw new NotFoundException(
          `Vaccine with ID ${updateVaccinationDto.vaccine_id} not found`,
        );
      }
    }

    const updatedVaccination = await this.db.childVaccine.updateMany({
      where: { id: vaccinationId, child_id: childId },
      data: {
        ...updateVaccinationDto,
        updated_at: new Date(),
      },
    });
    if (!updatedVaccination.count) {
      throw new NotFoundException(
        `Vaccination with ID ${vaccinationId} not found`,
      );
    }
    return updatedVaccination;
  }

  async isParentOfChild(userId: number, childId: number): Promise<boolean> {
    const child = await this.db.child.findFirst({
      where: {
        id: childId,
        user_id: userId,
      },
    });
    return !!child;
  }

  private async fillChildVaccinationTable(
    childId: number,
    dob: Date,
  ): Promise<void> {
    const vaccines = await this.db.vaccine.findMany();
    for (const vaccine of vaccines) {
      const plannedVaccinationDate = this.calculatePlannedVaccinationDate(
        dob,
        vaccine.min_age,
      );
      const isVaccinated = this.calculateAgeInMonths(dob) >= vaccine.min_age;

      await this.db.childVaccine.create({
        data: {
          child: { connect: { id: childId } },
          vaccine: { connect: { id: vaccine.id } },
          is_vaccinated: isVaccinated,
          vaccination_date: isVaccinated ? plannedVaccinationDate : null,
          planned_vaccination_date: plannedVaccinationDate,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });
    }
  }

  async createVaccinationCalendar(
    userId: number,
    childId: number,
  ): Promise<number> {
    const child = await this.db.child.findFirst({
      where: { id: childId, user_id: userId },
    });
    if (!child) {
      throw new NotFoundException(`Child with ID ${childId} not found`);
    }

    const vaccines = await this.db.vaccine.findMany();
    const childAgeInMonths = this.calculateAgeInMonths(child.dob);

    for (const vaccine of vaccines) {
      if (
        childAgeInMonths >= vaccine.min_age &&
        childAgeInMonths <= vaccine.max_age
      ) {
        const existingVaccination = await this.db.childVaccine.findFirst({
          where: { child_id: childId, vaccine_id: vaccine.id },
        });

        if (!existingVaccination) {
          await this.db.childVaccine.create({
            data: {
              child: { connect: { id: childId } },
              vaccine: { connect: { id: vaccine.id } },
              planned_vaccination_date: this.calculatePlannedVaccinationDate(
                child.dob,
                vaccine.min_age,
              ),
              is_vaccinated: true,
              vaccination_date: this.calculatePlannedVaccinationDate(
                child.dob,
                vaccine.min_age,
              ),
              created_at: new Date(),
              updated_at: new Date(),
            },
          });
        } else if (!existingVaccination.is_vaccinated) {
          await this.db.childVaccine.update({
            where: { id: existingVaccination.id },
            data: {
              is_vaccinated: true,
              vaccination_date: this.calculatePlannedVaccinationDate(
                child.dob,
                vaccine.min_age,
              ),
              updated_at: new Date(),
            },
          });
        }
      }
    }

    return childId;
  }

  private calculateAgeInMonths(birthdate: Date): number {
    const today = new Date();
    const birthdateObj = new Date(birthdate);
    const ageInMilliseconds = today.getTime() - birthdateObj.getTime();
    const ageInMonths = ageInMilliseconds / (1000 * 60 * 60 * 24 * 30);
    return Math.floor(ageInMonths);
  }

  private calculatePlannedVaccinationDate(
    dob: Date,
    minAgeInMonths: number,
  ): Date {
    return addMonths(dob, minAgeInMonths);
  }
}
