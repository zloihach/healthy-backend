import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailService } from './mailer.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.example.com', // Замените на ваш SMTP сервер
        port: 587,
        secure: false, // true для 465, false для других портов
        auth: {
          user: 'user@example.com', // Замените на ваш email
          pass: 'password', // Замените на ваш пароль
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>', // Замените на ваш email
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(), // или любой другой адаптер
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
