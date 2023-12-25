import { Module } from '@nestjs/common';
import { PublicationController } from './publication.controller';
import { PublicationService } from './publication.service';
import { DbModule } from '../db/db.module';
import { AccessControlService } from '../auth/shared/access-control.service';

@Module({
  controllers: [PublicationController],
  exports: [PublicationService],
  imports: [DbModule],
  providers: [PublicationService, AccessControlService],
})
export class PublicationModule {}
