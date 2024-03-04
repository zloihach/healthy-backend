import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from './file.service';
import { S3Service } from '../s3/s3.service';

describe('FileService', () => {
  let fileService: FileService;
  let s3Service: S3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FileService,
        {
          provide: S3Service,
          useValue: {
            uploadPublicFile: jest.fn(),
            deleteFile: jest.fn(),
          },
        },
      ],
    }).compile();

    fileService = module.get<FileService>(FileService);
    s3Service = module.get<S3Service>(S3Service);
  });

  describe('uploadFile', () => {
    it('should return the location of the uploaded file', async () => {
      const mockLocation = 'https://example.com/image.jpg';
      jest.spyOn(s3Service, 'uploadPublicFile').mockResolvedValue({
        ETag: 'etag',
        Bucket: 'bucket',
        Key: 'key',
        Location: mockLocation,
      });

      const result = await fileService.uploadFile(
        Buffer.from('data'),
        'image.jpg',
      );

      expect(s3Service.uploadPublicFile).toHaveBeenCalledWith(
        Buffer.from('data'),
        'image.jpg',
      );
      expect(result).toEqual(mockLocation);
    });

    it('should throw an error if upload fails', async () => {
      jest
        .spyOn(s3Service, 'uploadPublicFile')
        .mockRejectedValue(new Error('Upload failed'));

      await expect(
        fileService.uploadFile(Buffer.from('data'), 'image.jpg'),
      ).rejects.toThrow('Upload failed');
    });
  });

  describe('deleteFile', () => {
    it('should call deleteFile on the S3 service with the correct key', async () => {
      jest.spyOn(s3Service, 'deleteFile').mockResolvedValue(undefined); // Предполагается, что метод не возвращает значение

      await fileService.deleteFile('fileKey');

      expect(s3Service.deleteFile).toHaveBeenCalledWith('fileKey');
    });

    it('should throw an error if deletion fails', async () => {
      jest
        .spyOn(s3Service, 'deleteFile')
        .mockRejectedValue(new Error('Deletion failed'));

      await expect(fileService.deleteFile('fileKey')).rejects.toThrow(
        'Deletion failed',
      );
    });
  });
});
