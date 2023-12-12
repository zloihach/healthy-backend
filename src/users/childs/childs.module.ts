import { Module } from '@nestjs/common';
import { ChildsService } from './childs.service';
import { ChildsController } from './childs.controller';

@Module({
  providers: [ChildsService],
  exports: [ChildsService],
  controllers: [ChildsController],
})
export class ChildsModule {}
