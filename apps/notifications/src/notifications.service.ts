import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notifiy-email.dto';

@Injectable()
export class NotificationsService {
  async notifyEmail({ email }: NotifyEmailDto) {
    console.log('notifyEmail', email);
  }
}
