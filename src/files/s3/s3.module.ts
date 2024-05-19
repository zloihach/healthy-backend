import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '../../../redis/redis.module';

@Module({
  providers: [S3Service],
  exports: [S3Service],
  imports: [ConfigModule, RedisModule],
})
export class S3Module {}
