import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ManagedUpload } from 'aws-sdk/lib/s3/managed_upload';
import { Readable } from 'stream';
import { S3FileDto } from './dto/fileDto';

@Injectable()
export class S3Service {
  private s3 = new S3();
  private readonly bucketName = 'your-s3-bucket-name'; // <--- заменить
  private readonly region = 'ru-1'; // <--- заменить

  async createBucket(): Promise<void> {
    const params: S3.Types.CreateBucketRequest = {
      Bucket: this.bucketName,
    };
    await this.s3.createBucket(params).promise();
  }

  async uploadFile(fileStream: Readable, key: string): Promise<S3FileDto> {
    const uploadParams: S3.Types.PutObjectRequest = {
      Bucket: this.bucketName,
      Key: key,
      Body: fileStream,
      ACL: 'public-read',
    };

    const data: ManagedUpload.SendData = await this.s3
      .upload(uploadParams)
      .promise();

    return {
      key: key,
      url: data.Location,
    };
  }

  async listObjects(): Promise<S3.Types.ListObjectsOutput> {
    const params: S3.Types.ListObjectsRequest = {
      Bucket: this.bucketName,
    };
    return this.s3.listObjects(params).promise();
  }

  async getObject(key: string): Promise<Buffer> {
    const params: S3.Types.GetObjectRequest = {
      Bucket: this.bucketName,
      Key: key,
    };
    const data = await this.s3.getObject(params).promise();
    return data.Body as Buffer;
  }

  async copyObject(sourceKey: string, destinationKey: string): Promise<void> {
    const params: S3.Types.CopyObjectRequest = {
      Bucket: this.bucketName,
      CopySource: `${this.bucketName}/${sourceKey}`,
      Key: destinationKey,
    };
    await this.s3.copyObject(params).promise();
  }

  async deleteObject(key: string): Promise<void> {
    const params: S3.Types.DeleteObjectRequest = {
      Bucket: this.bucketName,
      Key: key,
    };
    await this.s3.deleteObject(params).promise();
  }

  async deleteBucket(): Promise<void> {
    const params: S3.Types.DeleteBucketRequest = {
      Bucket: this.bucketName,
    };
    await this.s3.deleteBucket(params).promise();
  }
}
