import { Readable } from 'stream';
import { S3 } from 'aws-sdk';
import { S3FileDto } from '../dto/fileDto';

export interface IS3Service {
  createBucket(): Promise<void>;
  uploadFile(fileStream: Readable, key: string): Promise<S3FileDto>;
  listObjects(): Promise<S3.Types.ListObjectsOutput>;
  getObject(key: string): Promise<Buffer>;
  copyObject(sourceKey: string, destinationKey: string): Promise<void>;
  deleteObject(key: string): Promise<void>;
  deleteBucket(): Promise<void>;
}
