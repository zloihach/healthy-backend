import { Injectable } from '@nestjs/common';
import { S3Service } from '../s3/s3.service';

@Injectable()
export class FileService {
  constructor(private readonly s3Service: S3Service) {}

  async uploadFile(dataBuffer: Buffer, filename: string): Promise<string> {
    try {
      const uploadResult = await this.s3Service.uploadPublicFile(
        dataBuffer,
        filename,
      );
      return uploadResult.Location;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  async deleteFile(fileKey: string): Promise<void> {
    try {
      await this.s3Service.deleteFile(fileKey);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }
}
