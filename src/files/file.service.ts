import { Injectable } from '@nestjs/common';
import { S3Service } from '../s3/s3.service';
import { v4 as uuidv4 } from 'uuid';



@Injectable()
export class FileService {
  constructor(private readonly s3Service: S3Service) {}

  async uploadFile(dataBuffer: Buffer, filename: string): Promise<string> {
    try {
      const newName = this.generateNewFileName(filename);
      return await this.s3Service.uploadPublicFile(
        dataBuffer,
        newName,
      );
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  async deleteFile(fileKey: string): Promise<void> {
    try {
      await this.s3Service.deletePublicFile(fileKey);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

  private generateNewFileName(filename: string): string {
    const uniqueId = uuidv4();
    const fileExtension = filename.split('.').pop();
    return `${uniqueId}.${fileExtension}`;
  }
}
