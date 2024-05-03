import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  CopyObjectCommand,
  ListObjectsCommand,
  DeleteBucketCommand,
} from '@aws-sdk/client-s3';
import { Readable } from 'stream';

@Injectable()
export class S3Service {
  private readonly s3: S3Client;
  private readonly bucketName: string;
  constructor(private configService: ConfigService) {
    this.s3 = new S3Client({
      region: this.configService.get<string>('S3_REGION')!,
      endpoint: this.configService.get<string>('S3_ENDPOINT')!,
      credentials: {
        accessKeyId: this.configService.get<string>('S3_ACCESS_ID')!,
        secretAccessKey: this.configService.get<string>('S3_SECRET_KEY')!,
      },
    });
    this.bucketName = this.configService.get<string>('S3_BUCKET_NAME')!;
  }

  async uploadPublicFile(
    dataBuffer: Buffer,
    filename: string,
  ): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Body: dataBuffer,
      Key: filename,
      ACL: 'public-read',
    });
    await this.s3.send(command);
    return `${this.configService.get<string>('S3_ENDPOINT')}/${
      this.bucketName
    }/${filename}`;
  }

  async deletePublicFile(fileKey: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: fileKey,
    });
    await this.s3.send(command);
  }

  async listObjects(): Promise<string[]> {
    const command = new ListObjectsCommand({
      Bucket: this.bucketName,
    });
    const response = await this.s3.send(command);
    return (
      response.Contents?.map((item) => item.Key!).filter(
        (key): key is string => !!key,
      ) || []
    );
  }

  async getObject(key: string): Promise<Buffer> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });
    const { Body } = await this.s3.send(command);
    if (Body instanceof Readable) {
      return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        Body.on('data', (chunk) => chunks.push(chunk));
        Body.on('end', () => resolve(Buffer.concat(chunks)));
        Body.on('error', reject);
      });
    } else {
      throw new Error('Expected a stream but did not receive one.');
    }
  }

  async copyObject(sourceKey: string, destinationKey: string): Promise<void> {
    const command = new CopyObjectCommand({
      Bucket: this.bucketName,
      CopySource: `${this.bucketName}/${sourceKey}`,
      Key: destinationKey,
    });
    await this.s3.send(command);
  }

  async deleteObject(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });
    await this.s3.send(command);
  }

  async deleteBucket(): Promise<void> {
    const command = new DeleteBucketCommand({
      Bucket: this.bucketName,
    });
    await this.s3.send(command);
  }
}
