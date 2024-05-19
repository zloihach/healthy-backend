import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mailer.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-confirmation')
  async sendConfirmation(
    @Body('email') email: string,
    @Body('token') token: string,
  ) {
    await this.mailService.sendUserConfirmation(email, token);
  }
}
