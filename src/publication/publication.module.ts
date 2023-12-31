import { Module } from '@nestjs/common';
import { PublicationController } from './publication.controller';
import { PublicationService } from './publication.service';
import { DbModule } from '../db/db.module';
import { AccessControlService } from '../auth/shared/access-control.service';
import { S3Module } from '../s3/s3.module';
import { FilesModule } from '../files/files.module';

@Module({
  controllers: [PublicationController],
  exports: [PublicationService],
  imports: [DbModule, S3Module, FilesModule],
  providers: [PublicationService, AccessControlService],
})
export class PublicationModule {}
