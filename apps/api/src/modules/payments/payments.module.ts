import { Module } from '@nestjs/common';

import { PAYMENT_PROVIDER } from './payment-provider.js';
import { PaymentsController } from './payments.controller.js';
import { StripePaymentProvider } from './stripe.provider.js';

/** Payment intents, webhooks, refunds — behind the PaymentProvider port. */
@Module({
  controllers: [PaymentsController],
  providers: [{ provide: PAYMENT_PROVIDER, useClass: StripePaymentProvider }],
  exports: [PAYMENT_PROVIDER],
})
export class PaymentsModule {}
