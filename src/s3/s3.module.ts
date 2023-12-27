import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { S3Controller } from './s3.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [S3Service],
  exports: [S3Service],
  controllers: [S3Controller],
  imports: [ConfigModule],
})
export class S3Module {}
