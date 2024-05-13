import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { SignUpBodyDto } from '../auth/dto/signup';
import { User } from '@prisma/client';
import { VaccinationService } from '../vaccination/vaccination.service';

import { IUserService } from './interfaces';

@Injectable()
export class UsersService implements IUserService {
  constructor(
    private readonly db: DbService,
    @Inject(forwardRef(() => VaccinationService))
    private readonly vaccinationService: VaccinationService,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.db.user.findFirst({ where: { email } });
  }

  async getUserById(id: number): Promise<User | null> {
    return this.db.user.findFirst({
      where: { id: id }, // Ensure the id is correctly used here
    });
  }

  async activateUser(id: number): Promise<User> {
    return this.db.user.update({
      where: { id },
      data: { is_active: true },
    });
  }

  async create(
    signUpBodyDto: SignUpBodyDto,
    salt: string,
    hash: string,
  ): Promise<User> {
    const newUser = await this.db.user.create({
      data: {
        email: signUpBodyDto.email,
        hash,
        salt,
        firstname: signUpBodyDto.firstname,
        lastname: signUpBodyDto.lastname,
        midname: signUpBodyDto.midname,
        dob: signUpBodyDto.dob,
        sex: signUpBodyDto.sex,
        is_active: false,
        role: 'USER',
        created_at: new Date(),
        is_confirmed_email: true,
        notification_period: 7,
        edited_at: new Date(),
      },
    });
    await this.activateUser(newUser.id);
    await this.vaccinationService.fillUserVaccinationTable(newUser.id);
    await this.vaccinationService.createVaccinationCalendar(newUser.id);
    return newUser;
  }

  async getAllUsers(): Promise<User[]> {
    return this.db.user.findMany();
  }

  async setUserStatus(id: number, status: boolean): Promise<User> {
    return this.db.user.update({
      where: { id },
      data: { is_active: status },
    });
  }

  async updateUser(id: number, updateUserDto: any): Promise<User> {
    return this.db.user.update({
      where: { id },
      data: { ...updateUserDto, edited_at: new Date() },
    });
  }
}
