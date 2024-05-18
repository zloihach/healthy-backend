import { Injectable, Logger } from '@nestjs/common';
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
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class S3Service {
  private readonly logger = new Logger(S3Service.name);
  private readonly s3: S3Client;
  private readonly bucketName: string;

  constructor(
    private configService: ConfigService,
    private redisService: RedisService,
  ) {
    const s3Config = this.configService.get('s3');
    this.s3 = new S3Client({
      region: s3Config.region,
      endpoint: s3Config.endpoint,
      credentials: {
        accessKeyId: s3Config.accessKeyId,
        secretAccessKey: s3Config.secretAccessKey,
      },
    });
    this.bucketName = s3Config.bucketName;
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

    const fileUrl = `${this.configService.get<string>('s3.endpoint')}/${
      this.bucketName
    }/${filename}`;
    this.logger.log(`Uploaded file to S3 with key ${filename}`);
    return fileUrl;
  }

  async deletePublicFile(fileKey: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: fileKey,
    });
    await this.s3.send(command);

    await this.redisService.delete(`s3:listObjects`);
    this.logger.log(`Redis: Cleared cache for key s3:listObjects`);
  }

  async listObjects(): Promise<string[]> {
    const cacheKey = 's3:listObjects';
    const cachedObjects = await this.redisService.get(cacheKey);

    if (cachedObjects) {
      this.logger.log(
        `Redis: Fetched listObjects from cache with key ${cacheKey}`,
      );
      return JSON.parse(cachedObjects);
    }

    const command = new ListObjectsCommand({
      Bucket: this.bucketName,
    });
    const response = await this.s3.send(command);
    const objectKeys =
      response.Contents?.map((item) => item.Key!).filter(
        (key): key is string => !!key,
      ) || [];

    await this.redisService.insert(cacheKey, JSON.stringify(objectKeys));
    this.logger.log(
      `Redis: Inserted listObjects into cache with key ${cacheKey}`,
    );
    return objectKeys;
  }

  async getObject(key: string): Promise<Buffer> {
    const cacheKey = `s3:getObject:${key}`;
    const cachedObject = await this.redisService.get(cacheKey);

    if (cachedObject) {
      this.logger.log(`Redis: Fetched object from cache with key ${cacheKey}`);
      return Buffer.from(cachedObject, 'base64');
    }

    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });
    const { Body } = await this.s3.send(command);
    if (Body instanceof Readable) {
      const chunks: Buffer[] = [];
      Body.on('data', (chunk) => chunks.push(chunk));
      await new Promise<void>((resolve, reject) => {
        Body.on('end', resolve);
        Body.on('error', reject);
      });

      const objectBuffer = Buffer.concat(chunks);
      await this.redisService.insert(cacheKey, objectBuffer.toString('base64'));
      this.logger.log(`Redis: Inserted object into cache with key ${cacheKey}`);
      return objectBuffer;
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

    await this.redisService.delete(`s3:listObjects`);
    this.logger.log(`Redis: Cleared cache for key s3:listObjects`);
  }

  async deleteObject(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });
    await this.s3.send(command);

    await this.redisService.delete(`s3:listObjects`);
    await this.redisService.delete(`s3:getObject:${key}`);
    this.logger.log(
      `Redis: Cleared cache for keys s3:listObjects and s3:getObject:${key}`,
    );
  }

  async deleteBucket(): Promise<void> {
    const command = new DeleteBucketCommand({
      Bucket: this.bucketName,
    });
    await this.s3.send(command);

    await this.redisService.delete(`s3:listObjects`);
    this.logger.log(`Redis: Cleared cache for key s3:listObjects`);
  }
}
