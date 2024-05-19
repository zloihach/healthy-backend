import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { MailService } from './mailer.service';

class SendConfirmationDto {
  email: string;
  name: string;
}

class MailResponseDto {
  success: boolean;
  message: string;
}

@ApiTags('Mail')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-confirmation')
  @ApiOperation({ summary: 'Send confirmation email' })
  @ApiBody({
    type: SendConfirmationDto,
    examples: {
      example1: {
        summary: 'Example 1',
        description: 'An example of a payload to send a confirmation email',
        value: {
          email: 'user@example.com',
          name: 'John Doe',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Email sent successfully',
    type: MailResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Failed to send email',
    type: MailResponseDto,
  })
  async sendConfirmation(
    @Body() body: SendConfirmationDto,
  ): Promise<MailResponseDto> {
    const { email, name } = body;
    const token = 'example-token'; // здесь должен быть реальный токен
    const success = await this.mailService.sendUserConfirmation(
      { email, name },
      token,
    );

    if (success!) {
      return {
        success: true,
        message: 'Confirmation email sent successfully',
      };
    } else {
      return {
        success: false,
        message: 'Failed to send confirmation email',
      };
    }
  }
}
