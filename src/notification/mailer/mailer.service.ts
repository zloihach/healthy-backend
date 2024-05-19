import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { confirmationTemplate } from './templates/confirmation.html';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation(
    user: { email: string; name: string },
    token: string,
  ): Promise<boolean> {
    const url = `https://example.com/auth/confirm?token=${token}`;
    const html = confirmationTemplate(user.name, url);

    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Welcome to Nice App! Confirm your Email',
        html,
      });
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }
}
