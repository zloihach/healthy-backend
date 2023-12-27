import { S3 } from 'aws-sdk';

export interface IS3Service {
  uploadPublicFile(
    dataBuffer: Buffer,
    filename: string,
  ): Promise<S3.ManagedUpload.SendData>;

  deletePublicFile(fileKey: string): Promise<S3.DeleteObjectOutput>;

  listObjects(): Promise<S3.ListObjectsV2Output>;

  getObject(key: string): Promise<S3.GetObjectOutput>;

  copyObject(sourceKey: string, destinationKey: string): Promise<void>;

  deleteObject(key: string): Promise<void>;

  deleteBucket(): Promise<void>;
}
