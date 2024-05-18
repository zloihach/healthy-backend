import { Injectable, Logger } from '@nestjs/common';
import { S3Service } from '../s3/s3.service';
import { v4 as uuidv4 } from 'uuid';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class FileService {
  private readonly logger = new Logger(FileService.name);

  constructor(
    private readonly s3Service: S3Service,
    private readonly redisService: RedisService,
  ) {}

  async uploadFile(dataBuffer: Buffer, filename: string): Promise<string> {
    try {
      const newName = this.generateNewFileName(filename);
      const fileUrl = await this.s3Service.uploadPublicFile(
        dataBuffer,
        newName,
      );

      await this.redisService.insert(`file:${newName}`, fileUrl);
      this.logger.log(
        `Redis: Inserted file URL into cache with key file:${newName}`,
      );

      return fileUrl;
    } catch (error) {
      this.logger.error('Error uploading file:', error);
      throw error;
    }
  }

  async deleteFile(fileKey: string): Promise<void> {
    try {
      await this.s3Service.deletePublicFile(fileKey);

      await this.redisService.delete(`file:${fileKey}`);
      this.logger.log(`Redis: Deleted cache for key file:${fileKey}`);
    } catch (error) {
      this.logger.error('Error deleting file:', error);
      throw error;
    }
  }

  private generateNewFileName(filename: string): string {
    const uniqueId = uuidv4();
    const fileExtension = filename.split('.').pop();
    return `${uniqueId}.${fileExtension}`;
  }
}
