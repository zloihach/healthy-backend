import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { S3Service } from '../s3/s3.service';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '../../redis/redis.module';

@Module({
  providers: [FileService, S3Service],
  exports: [FileService],
  imports: [ConfigModule, RedisModule],
})
export class FileModule {}
