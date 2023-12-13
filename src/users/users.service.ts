import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { SignUpBodyDto } from '../auth/dto/signup';

@Injectable()
export class UsersService {
  constructor(private db: DbService) {}

  findByEmail(email: string) {
    return this.db.user.findFirst({ where: { email } });
  }
  getUserById(id: number) {
    return this.db.user.findFirst({ where: { id } });
  }
  async setAge(dob: Date) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  }

  async activateUser(id: number) {
    return this.db.user.update({
      where: { id },
      data: { is_active: true },
    });
  }
  async create(signUpBodyDto: SignUpBodyDto, salt: string, hash: string) {
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
        age: await this.setAge(signUpBodyDto.dob),
        is_active: false,
        role: 'USER',
        created_at: new Date(),
        is_confirmed_email: true,
        notification_period: 7,
        edited_at: new Date(),
      },
    });
    await this.activateUser(newUser.id);
    return newUser;
  }

  async getAllUsers() {
    return this.db.user.findMany();
  }

  async deactivateUser(id: number) {
    return this.db.user.update({
      where: { id },
      data: { is_active: false },
    });
  }
}
