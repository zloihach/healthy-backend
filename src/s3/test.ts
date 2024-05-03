// import { Injectable } from '@nestjs/common';
// import { S3 } from 'aws-sdk';
// import { ConfigService } from '@nestjs/config';
// import { IS3Service } from './interface';
//
// @Injectable()
// export class S3Service implements IS3Service {
//   private readonly s3: S3;
//   private readonly bucketName: string;
//
//   constructor(private configService: ConfigService) {
//     this.bucketName = this.configService.get('S3_BUCKET_NAME').toString();
//     this.s3 = new S3({
//       accessKeyId: this.configService.get<string>('S3_ACCESS_ID'),
//       secretAccessKey: this.configService.get<string>('S3_SECRET_KEY'),
//       region: this.configService.get<string>('S3_REGION'),
//       endpoint: this.configService.get<string>('S3_ENDPOINT'),
//     });
//   }
//
//   async uploadPublicFile(
//     dataBuffer: Buffer,
//     filename: string,
//   ): Promise<S3.ManagedUpload.SendData> {
//     try {
//       return await this.s3
//         .upload({
//           Bucket: this.bucketName,
//           Body: dataBuffer,
//           Key: `${filename}`,
//           ACL: 'public-read',
//           ContentDisposition: 'inline',
//         })
//         .promise();
//     } catch (error) {
//       console.error('Error uploading file to S3:', error);
//       throw error;
//     }
//   }
//
//   async deletePublicFile(fileKey: string): Promise<S3.DeleteObjectOutput> {
//     try {
//       return await this.s3
//         .deleteObject({
//           Bucket: this.bucketName,
//           Key: fileKey,
//         })
//         .promise();
//     } catch (error) {
//       console.error('Error deleting file from S3:', error);
//       throw error;
//     }
//   }
//
//   async listObjects(): Promise<S3.ListObjectsV2Output> {
//     try {
//       return await this.s3
//         .listObjectsV2({
//           Bucket: this.bucketName,
//         })
//         .promise();
//     } catch (error) {
//       console.error('Error listing objects in S3:', error);
//       throw error;
//     }
//   }
//
//   async getObject(key: string): Promise<S3.GetObjectOutput> {
//     try {
//       return await this.s3
//         .getObject({
//           Bucket: this.bucketName,
//           Key: key,
//         })
//         .promise();
//     } catch (error) {
//       console.error('Error getting object from S3:', error);
//       throw error;
//     }
//   }
//
//   async copyObject(sourceKey: string, destinationKey: string): Promise<void> {
//     try {
//       await this.s3
//         .copyObject({
//           Bucket: this.bucketName,
//           CopySource: `${this.bucketName}/${sourceKey}`,
//           Key: destinationKey,
//         })
//         .promise();
//     } catch (error) {
//       console.error('Error copying object in S3:', error);
//       throw error;
//     }
//   }
//
//   async deleteObject(key: string): Promise<void> {
//     try {
//       await this.s3
//         .deleteObject({
//           Bucket: this.bucketName,
//           Key: key,
//         })
//         .promise();
//     } catch (error) {
//       console.error('Error deleting object from S3:', error);
//       throw error;
//     }
//   }
//
//   async deleteBucket(): Promise<void> {
//     try {
//       await this.s3
//         .deleteBucket({
//           Bucket: this.bucketName,
//         })
//         .promise();
//     } catch (error) {
//       console.error('Error deleting bucket in S3:', error);
//       throw error;
//     }
//   }
//
//   async deleteFile(fileKey: string): Promise<void> {
//     try {
//       await this.s3
//         .deleteObject({
//           Bucket: this.bucketName,
//           Key: fileKey,
//         })
//         .promise();
//     } catch (error) {
//       console.error('Error deleting file from S3:', error);
//       throw error;
//     }
//   }
// }
//
// import {
//   S3Client,
//   PutObjectCommand,
//   DeleteObjectCommand,
//   ListObjectsV2Command,
//   GetObjectCommand,
//   CopyObjectCommand,
//   DeleteBucketCommand,
// } from '@aws-sdk/client-s3';
// import { IS3Service } from './interface';
//
// export class S3Service implements IS3Service {
//   private s3Client: S3Client;
//
//   constructor(
//     private readonly bucketName: string,
//     private readonly accessKeyId: string,
//     private readonly secretAccessKey: string,
//     private readonly endpoint: string,
//     private readonly region: string,
//   ) {
//     this.s3Client = new S3Client({
//       region: this.region,
//       credentials: {
//         accessKeyId: this.accessKeyId,
//         secretAccessKey: this.secretAccessKey,
//       },
//       endpoint: this.endpoint,
//     });
//   }
//
//   async uploadPublicFile(
//     dataBuffer: Buffer,
//     filename: string,
//   ): Promise<S3.PutObjectOutput> {
//     const uploadParams = {
//       Bucket: this.bucketName,
//       Key: filename,
//       Body: dataBuffer,
//       ACL: 'public-read',
//     };
//
//     const command = new PutObjectCommand(uploadParams);
//     return await this.s3Client.send(command);
//   }
//
//   async deletePublicFile(fileKey: string): Promise<S3.DeleteObjectOutput> {
//     const deleteParams = {
//       Bucket: this.bucketName,
//       Key: fileKey,
//     };
//
//     const command = new DeleteObjectCommand(deleteParams);
//     return await this.s3Client.send(command);
//   }
//
//   async listObjects(): Promise<S3.ListObjectsV2Output> {
//     const listParams = {
//       Bucket: this.bucketName,
//     };
//
//     const command = new ListObjectsV2Command(listParams);
//     return await this.s3Client.send(command);
//   }
//
//   async getObject(key: string): Promise<S3.GetObjectOutput> {
//     const getParams = {
//       Bucket: this.bucketName,
//       Key: key,
//     };
//
//     const command = new GetObjectCommand(getParams);
//     return await this.s3Client.send(command);
//   }
//
//   async copyObject(
//     sourceKey: string,
//     destinationKey: string,
//   ): Promise<S3.CopyObjectOutput> {
//     const copyParams = {
//       Bucket: this.bucketName,
//       CopySource: `/${this.bucketName}/${sourceKey}`,
//       Key: destinationKey,
//     };
//
//     const command = new CopyObjectCommand(copyParams);
//     return await this.s3Client.send(command);
//   }
//
//   async deleteObject(key: string): Promise<S3.DeleteObjectOutput> {
//     const deleteParams = {
//       Bucket: this.bucketName,
//       Key: key,
//     };
//
//     const command = new DeleteObjectCommand(deleteParams);
//     return await this.s3Client.send(command);
//   }
//
//   async deleteBucket(): Promise<void> {
//     const deleteBucketParams = {
//       Bucket: this.bucketName,
//     };
//
//     const command = new DeleteBucketCommand(deleteBucketParams);
//     await this.s3Client.send(command);
//   }
// // }
// import { S3Client } from '@aws-sdk/client-s3';
//
// constructor() {
//   this.s3Client = new S3Client({
//     region: process.env.S3_REGION!, // Non-null assertion
//     endpoint: process.env.S3_ENDPOINT!, // Non-null assertion
//     credentials: {
//       accessKeyId: process.env.S3_ACCESS_ID!, // Non-null assertion
//       secretAccessKey: process.env.S3_SECRET_KEY!, // Non-null assertion
//     }
//   });
// }