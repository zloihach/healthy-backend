import { Injectable, Inject, forwardRef, Logger } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { SignUpBodyDto } from '../auth/dto/signup';
import { User } from '@prisma/client';
import { VaccinationService } from '../vaccination/vaccination.service';
import { IUserService } from './interfaces';

@Injectable()
export class UsersService implements IUserService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly db: DbService,
    @Inject(forwardRef(() => VaccinationService))
    private readonly vaccinationService: VaccinationService,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.db.user.findFirst({ where: { email } });
    } catch (error) {
      this.logger.error(`Failed to find user by email: ${email}`, error.stack);
      throw error;
    }
  }

  async getUserById(id: number): Promise<User | null> {
    try {
      return await this.db.user.findFirst({ where: { id } });
    } catch (error) {
      this.logger.error(`Failed to get user by ID: ${id}`, error.stack);
      throw error;
    }
  }

  async activateUser(id: number): Promise<User> {
    try {
      return await this.db.user.update({
        where: { id },
        data: { is_active: true },
      });
    } catch (error) {
      this.logger.error(`Failed to activate user with ID: ${id}`, error.stack);
      throw error;
    }
  }

  async create(
    signUpBodyDto: SignUpBodyDto,
    salt: string,
    hash: string,
  ): Promise<User> {
    try {
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
      return newUser;
    } catch (error) {
      this.logger.error('Failed to create user', error.stack);
      throw error;
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.db.user.findMany();
    } catch (error) {
      this.logger.error('Failed to get all users', error.stack);
      throw error;
    }
  }

  async setUserStatus(id: number, status: boolean): Promise<User> {
    try {
      return await this.db.user.update({
        where: { id },
        data: { is_active: status },
      });
    } catch (error) {
      this.logger.error(`Failed to set user status for ID: ${id}`, error.stack);
      throw error;
    }
  }

  async updateUser(id: number, updateUserDto: any): Promise<User> {
    try {
      return await this.db.user.update({
        where: { id },
        data: { ...updateUserDto, edited_at: new Date() },
      });
    } catch (error) {
      this.logger.error(`Failed to update user with ID: ${id}`, error.stack);
      throw error;
    }
  }

  async checkEmail(email: string): Promise<boolean> {
    try {
      const user = await this.db.user.findFirst({ where: { email } });
      return !!user;
    } catch (error) {
      this.logger.error(`Failed to check email: ${email}`, error.stack);
      throw error;
    }
  }
}
