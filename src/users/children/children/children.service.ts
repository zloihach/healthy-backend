import { Injectable } from '@nestjs/common';
import { DbService } from '../../../db/db.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';

@Injectable()
export class ChildrenService {
  constructor(private readonly db: DbService) {}

  async getAllUserChildren() {
    return this.db.child.findMany();
  }

  async getUserChildById(id: number) {
    return this.db.child.findUnique({ where: { id } });
  }

  async createChild(createChildDto: CreateChildDto) {
    return this.db.child.create({ data: createChildDto });
  }

  async updateChild(id: number, updateChildDto: UpdateChildDto) {
    return this.db.child.update({
      where: { id },
      data: updateChildDto,
    });
  }

  async deleteChild(id: number) {
    return this.db.child.delete({ where: { id } });
  }
}
