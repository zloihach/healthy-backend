import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Get,
  Param,
} from '@nestjs/common';
import { ApiConsumes, ApiBody, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from '../../dist/s3/s3.service';

@ApiTags('S3')
@Controller('s3')
export class S3Controller {
  constructor(private readonly awsService: S3Service) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      if (!file) {
        throw new BadRequestException('No file uploaded');
      }

      // Use S3Service to upload the file to S3
      const result = await this.awsService.uploadPublicFile(
        file.buffer,
        file.originalname,
      );

      console.log(result);

      return { success: true, message: 'File uploaded successfully' };
    } catch (error) {
      // Handle errors when uploading a file to S3
      console.error('Error uploading file to S3:', error);
      throw new BadRequestException('Failed to upload file to S3');
    }
  }

  @Get('list')
  async listObjects() {
    try {
      // Use S3Service to list objects in the S3 bucket
      const objects = await this.awsService.listObjects();

      console.log(objects);

      return { success: true, objects };
    } catch (error) {
      // Handle errors when listing objects in S3
      console.error('Error listing objects in S3:', error);
      throw new BadRequestException('Failed to list objects in S3');
    }
  }

  @Get('get/:key')
  async getObject(@Param('key') key: string) {
    try {
      // Use S3Service to get an object from S3
      const object = await this.awsService.getObject(key);

      console.log(object);

      return { success: true, object };
    } catch (error) {
      // Handle errors when getting an object from S3
      console.error('Error getting object from S3:', error);
      throw new BadRequestException('Failed to get object from S3');
    }
  }

  @Get('copy/:sourceKey/:destinationKey')
  async copyObject(
    @Param('sourceKey') sourceKey: string,
    @Param('destinationKey') destinationKey: string,
  ) {
    try {
      // Use S3Service to copy an object in S3
      await this.awsService.copyObject(sourceKey, destinationKey);

      return { success: true, message: 'Object copied successfully' };
    } catch (error) {
      // Handle errors when copying an object in S3
      console.error('Error copying object in S3:', error);
      throw new BadRequestException('Failed to copy object in S3');
    }
  }

  @Get('delete/:key')
  async deleteObject(@Param('key') key: string) {
    try {
      // Use S3Service to delete an object from S3
      await this.awsService.deleteObject(key);

      return { success: true, message: 'Object deleted successfully' };
    } catch (error) {
      // Handle errors when deleting an object from S3
      console.error('Error deleting object from S3:', error);
      throw new BadRequestException('Failed to delete object from S3');
    }
  }

  @Get('delete-bucket')
  async deleteBucket() {
    try {
      // Use S3Service to delete the S3 bucket
      await this.awsService.deleteBucket();

      return { success: true, message: 'Bucket deleted successfully' };
    } catch (error) {
      // Handle errors when deleting the S3 bucket
      console.error('Error deleting bucket in S3:', error);
      throw new BadRequestException('Failed to delete bucket in S3');
    }
  }
}
