import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateChargeDTO } from '@app/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
  );

  constructor(private readonly configService: ConfigService) {}

  async createCharge({ amount }: CreateChargeDTO) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      confirm: true,
      currency: 'usd',
      payment_method: 'pm_card_visa',
      automatic_payment_methods: {
        allow_redirects: 'never',
        enabled: true,
      },
    });

    return paymentIntent;
  }
}
