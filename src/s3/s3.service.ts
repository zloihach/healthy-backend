import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { IS3Service } from './interface';

@Injectable()
export class S3Service implements IS3Service {
  private readonly s3: S3;
  private readonly bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.bucketName = this.configService.get('S3_BUCKET_NAME').toString();
    this.s3 = new S3({
      accessKeyId: this.configService.get('S3_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('S3_SECRET_ACCESS_KEY'),
      endpoint: this.configService.get('S3_ENDPOINT'),
    });
  }

  // private readonly s3: S3;
  // private readonly bucketName: string;
  //
  // constructor(
  //   private configService: ConfigService,
  //   private readonly accessKeyId: string,
  //   private readonly secretAccessKey: string,
  //   private readonly endpoint: string,
  // ) {
  //   this.bucketName = this.configService.get('S3_BUCKET_NAME').toString();
  //   this.s3 = new S3({
  //     accessKeyId: this.accessKeyId,
  //     secretAccessKey: this.secretAccessKey,
  //     endpoint: this.endpoint,
  //   });
  // }

  async uploadPublicFile(
    dataBuffer: Buffer,
    filename: string,
  ): Promise<S3.ManagedUpload.SendData> {
    try {
      return await this.s3
        .upload({
          Bucket: this.bucketName,
          Body: dataBuffer,
          Key: `${filename}`,
          ACL: 'public-read',
          ContentDisposition: 'inline',
        })
        .promise();
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      throw error;
    }
  }

  async deletePublicFile(fileKey: string): Promise<S3.DeleteObjectOutput> {
    try {
      return await this.s3
        .deleteObject({
          Bucket: this.bucketName,
          Key: fileKey,
        })
        .promise();
    } catch (error) {
      console.error('Error deleting file from S3:', error);
      throw error;
    }
  }

  async listObjects(): Promise<S3.ListObjectsV2Output> {
    try {
      return await this.s3
        .listObjectsV2({
          Bucket: this.bucketName,
        })
        .promise();
    } catch (error) {
      console.error('Error listing objects in S3:', error);
      throw error;
    }
  }

  async getObject(key: string): Promise<S3.GetObjectOutput> {
    try {
      return await this.s3
        .getObject({
          Bucket: this.bucketName,
          Key: key,
        })
        .promise();
    } catch (error) {
      console.error('Error getting object from S3:', error);
      throw error;
    }
  }

  async copyObject(sourceKey: string, destinationKey: string): Promise<void> {
    try {
      await this.s3
        .copyObject({
          Bucket: this.bucketName,
          CopySource: `${this.bucketName}/${sourceKey}`,
          Key: destinationKey,
        })
        .promise();
    } catch (error) {
      console.error('Error copying object in S3:', error);
      throw error;
    }
  }

  async deleteObject(key: string): Promise<void> {
    try {
      await this.s3
        .deleteObject({
          Bucket: this.bucketName,
          Key: key,
        })
        .promise();
    } catch (error) {
      console.error('Error deleting object from S3:', error);
      throw error;
    }
  }

  async deleteBucket(): Promise<void> {
    try {
      await this.s3
        .deleteBucket({
          Bucket: this.bucketName,
        })
        .promise();
    } catch (error) {
      console.error('Error deleting bucket in S3:', error);
      throw error;
    }
  }
}
