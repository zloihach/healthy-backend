import { Injectable } from '@nestjs/common';
import { DbService } from '../../../db/db.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';

@Injectable()
export class ChildrenService {
  constructor(private readonly db: DbService) {}

  async getAllUserChildren(userId: number) {
    return this.db.child.findMany({ where: { user_id: userId } });
  }

  async getUserChildById(userId: number, id: number) {
    return this.db.child.findFirst({ where: { id, user_id: userId } });
  }

  async createChild(userId: number, createChildDto: CreateChildDto) {
    return this.db.child.create({
      data: {
        ...createChildDto,
        user_id: userId,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
  }

  async updateChild(
    userId: number,
    id: number,
    updateChildDto: UpdateChildDto,
  ) {
    return this.db.child.updateMany({
      where: { id, user_id: userId },
      data: {
        ...updateChildDto,
        updated_at: new Date(),
      },
    });
  }

  async deleteChild(userId: number, id: number) {
    return this.db.child.deleteMany({ where: { id, user_id: userId } });
  }
}
