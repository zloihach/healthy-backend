import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { S3Service } from '../s3/s3.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [FileService, S3Service],
  exports: [FileService],
  imports: [ConfigModule],
})
export class FileModule {}
