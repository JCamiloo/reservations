import { CreateChargeDTO } from '@app/common';
import { IsEmail } from 'class-validator';

export class PaymentsCreateChargeDTO extends CreateChargeDTO {
  @IsEmail()
  email: string;
}
