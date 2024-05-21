import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { DbService } from '../../../db/db.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import {
  CreateVaccinationDto,
  UpdateVaccinationDto,
} from './dto/child-vaccination.dto';

@Injectable()
export class ChildrenService {
  private readonly logger = new Logger(ChildrenService.name);

  constructor(private readonly db: DbService) {}

  async getAllUserChildren(userId: number) {
    this.logger.log(`Fetching all children for user with ID ${userId}`);
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
    this.logger.log(`Fetching child with ID ${id} for user with ID ${userId}`);
    const child = await this.db.child.findFirst({
      where: { id, user_id: userId },
      include: {
        ChildVaccine: true,
      },
    });
    if (!child) {
      this.logger.warn(
        `Child with ID ${id} not found for user with ID ${userId}`,
      );
      throw new NotFoundException(`Child with ID ${id} not found`);
    }
    return child;
  }

  async createChild(userId: number, createChildDto: CreateChildDto) {
    this.logger.log(`Creating child for user with ID ${userId}`);
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
    return child;
  }

  async updateChild(
    userId: number,
    id: number,
    updateChildDto: UpdateChildDto,
  ) {
    this.logger.log(`Updating child with ID ${id} for user with ID ${userId}`);
    const updatedChild = await this.db.child.updateMany({
      where: { id, user_id: userId },
      data: {
        ...updateChildDto,
        updated_at: new Date(),
      },
    });
    if (!updatedChild.count) {
      this.logger.warn(
        `Child with ID ${id} not found or not owned by user with ID ${userId}`,
      );
      throw new NotFoundException(`Child with ID ${id} not found`);
    }
    this.logger.log(`Child with ID ${id} updated for user with ID ${userId}`);
    return updatedChild;
  }

  async deleteChild(userId: number, id: number) {
    this.logger.log(`Deleting child with ID ${id} for user with ID ${userId}`);
    const deletedChild = await this.db.child.deleteMany({
      where: { id, user_id: userId },
    });
    if (!deletedChild.count) {
      this.logger.warn(
        `Child with ID ${id} not found or not owned by user with ID ${userId}`,
      );
      throw new NotFoundException(`Child with ID ${id} not found`);
    }
    this.logger.log(`Child with ID ${id} deleted for user with ID ${userId}`);
    return deletedChild;
  }

  async createVaccination(
    userId: number,
    childId: number,
    createVaccinationDto: CreateVaccinationDto,
  ) {
    this.logger.log(
      `Creating vaccination for child with ID ${childId} by user with ID ${userId}`,
    );

    const vaccine = await this.db.vaccine.findFirst({
      where: { id: createVaccinationDto.vaccine_id },
    });
    if (!vaccine) {
      this.logger.error(
        `Vaccine with ID ${createVaccinationDto.vaccine_id} not found`,
      );
      throw new NotFoundException(
        `Vaccine with ID ${createVaccinationDto.vaccine_id} not found`,
      );
    }

    const existingVaccination = await this.db.childVaccine.findFirst({
      where: { child_id: childId, vaccine_id: createVaccinationDto.vaccine_id },
    });
    if (existingVaccination) {
      this.logger.warn(
        `Vaccination already exists for child with ID ${childId} and vaccine ID ${createVaccinationDto.vaccine_id}`,
      );
      throw new ConflictException(
        'This vaccination has already been recorded for this child',
      );
    }

    const formattedVaccinationDate = this.formatDate(
      createVaccinationDto.vaccination_date,
    );

    const vaccination = await this.db.childVaccine.create({
      data: {
        ...createVaccinationDto,
        child_id: childId,
        vaccination_date: formattedVaccinationDate,
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
    this.logger.log(
      `Updating vaccination with ID ${vaccinationId} for child with ID ${childId} by user with ID ${userId}`,
    );

    if (updateVaccinationDto.vaccine_id) {
      const vaccine = await this.db.vaccine.findFirst({
        where: { id: updateVaccinationDto.vaccine_id },
      });
      if (!vaccine) {
        this.logger.error(
          `Vaccine with ID ${updateVaccinationDto.vaccine_id} not found`,
        );
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
      this.logger.warn(
        `Vaccination with ID ${vaccinationId} not found or not related to child with ID ${childId}`,
      );
      throw new NotFoundException(
        `Vaccination with ID ${vaccinationId} not found`,
      );
    }
    this.logger.log(
      `Vaccination with ID ${vaccinationId} updated for child with ID ${childId}`,
    );
    return updatedVaccination;
  }

  async isParentOfChild(userId: number, childId: number): Promise<boolean> {
    this.logger.log(
      `Checking if user with ID ${userId} is parent of child with ID ${childId}`,
    );
    const child = await this.db.child.findFirst({
      where: { id: childId, user_id: userId },
    });
    const isParent = !!child;
    if (!isParent) {
      this.logger.warn(
        `User with ID ${userId} is not parent of child with ID ${childId}`,
      );
    }
    return isParent;
  }

  private formatDate(date: string | undefined): string | null {
    if (!date) {
      return null;
    }
    return new Date(date).toISOString();
  }
}
