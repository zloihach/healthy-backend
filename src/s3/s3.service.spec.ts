import { Test, TestingModule } from '@nestjs/testing';
import { S3Service } from './s3.service';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand } from '@aws-sdk/client-s3';

describe('S3Service', () => {
  let s3Service: S3Service;
  let s3ClientMock: S3Client;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        S3Service,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('bucket-name'),
          },
        },
      ],
    }).compile();

    s3Service = module.get<S3Service>(S3Service);
    s3ClientMock = new S3Client({}); // Creating a mock S3Client
    s3Service['s3'] = s3ClientMock; // Injecting the mock S3Client into the S3Service
  });

  it('should be defined', () => {
    expect(s3Service).toBeDefined();
  });

  describe('uploadPublicFile', () => {
    it('should upload file to S3', async () => {
      const mockUploadResult = { Location: 'https://example.com/image.jpg' };
      jest.spyOn(s3ClientMock, 'send').mockResolvedValue(mockUploadResult);

      const result = await s3Service.uploadPublicFile(Buffer.from('data'), 'image.jpg');

      expect(result).toEqual(mockUploadResult);
      expect(s3ClientMock.send).toHaveBeenCalledWith(expect.objectContaining({
        input: expect.objectContaining({
          Bucket: 'bucket-name',
          Key: 'image.jpg',
          ACL: 'public-read',
        }),
        commandName: 'PutObjectCommand',
      }));
    });
  });

  describe('deletePublicFile', () => {
    it('should delete file from S3', async () => {
      const mockDeleteResult = {}; // Mocked delete result
      jest.spyOn(s3ClientMock, 'send').mockResolvedValue(mockDeleteResult);

      await expect(s3Service.deletePublicFile('image.jpg')).resolves.toBe(mockDeleteResult);

      expect(s3ClientMock.send).toHaveBeenCalledWith(expect.objectContaining({
        input: expect.objectContaining({
          Bucket: 'bucket-name',
          Key: 'image.jpg',
        }),
        commandName: 'DeleteObjectCommand',
      }));
    });
  });

  describe('listObjects', () => {
    it('should list objects in S3 bucket', async () => {
      const mockListResult = {};
      jest.spyOn(s3ClientMock, 'send').mockResolvedValue(mockListResult);

      await expect(s3Service.listObjects()).resolves.toBe(mockListResult);

      expect(s3ClientMock.send).toHaveBeenCalledWith(expect.objectContaining({
        input: expect.objectContaining({
          Bucket: 'bucket-name',
        }),
        commandName: 'ListObjectsV2Command',
      }));
    });
  });
});
