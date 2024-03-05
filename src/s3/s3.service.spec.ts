import { Test, TestingModule } from '@nestjs/testing';
import { S3Service } from './s3.service';
import { ConfigService } from '@nestjs/config';

describe('S3Service', () => {
  let s3Service: S3Service;
  let configService: ConfigService;

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
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(s3Service).toBeDefined();
  });

  describe('uploadPublicFile', () => {
    it('should upload file to S3', async () => {
      const mockUploadResult = { Location: 'https://example.com/image.jpg' };
      jest.spyOn(s3Service['s3'], 'upload').mockReturnValue({
        promise: jest.fn().mockResolvedValue(mockUploadResult),
      } as any);

      const result = await s3Service.uploadPublicFile(
        Buffer.from('data'),
        'image.jpg',
      );

      expect(result).toEqual(mockUploadResult);
      expect(s3Service['s3'].upload).toHaveBeenCalledWith({
        Bucket: 'bucket-name',
        Body: Buffer.from('data'),
        Key: 'image.jpg',
        ACL: 'public-read',
        ContentDisposition: 'inline',
      });
    });
  });

  describe('deletePublicFile', () => {
    it('should delete file from S3', async () => {
      const mockDeleteResult = {}; // Mocked delete result
      jest.spyOn(s3Service['s3'], 'deleteObject').mockReturnValue({
        promise: jest.fn().mockResolvedValue(mockDeleteResult),
      } as any);

      await expect(s3Service.deletePublicFile('image.jpg')).resolves.toBe(
        mockDeleteResult,
      );

      expect(s3Service['s3'].deleteObject).toHaveBeenCalledWith({
        Bucket: 'bucket-name',
        Key: 'image.jpg',
      });
    });
  });

  describe('listObjects', () => {
    it('should list objects in S3 bucket', async () => {
      const mockListResult = {};
      jest.spyOn(s3Service['s3'], 'listObjectsV2').mockReturnValue({
        promise: jest.fn().mockResolvedValue(mockListResult),
      } as any);

      await expect(s3Service.listObjects()).resolves.toBe(mockListResult);

      expect(s3Service['s3'].listObjectsV2).toHaveBeenCalledWith({
        Bucket: 'bucket-name',
      });
    });
  });
});
