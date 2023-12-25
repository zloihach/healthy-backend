import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { S3Module } from './s3/s3.module';

@Module({
  providers: [DbService],
  exports: [DbService],
  imports: [S3Module],
})
export class DbModule {}
