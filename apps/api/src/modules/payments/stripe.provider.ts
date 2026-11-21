import { Injectable, NotImplementedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MIN_CHARGE_MINOR } from '@eco/shared';
import Stripe from 'stripe';

import type { Env } from '../../config/env.js';
import type { PaymentProvider } from './payment-provider.js';

/** Stripe implementation (UAE, AED; card + Apple Pay + Google Pay only — spec §7). */
@Injectable()
export class StripePaymentProvider implements PaymentProvider {
  private readonly stripe: Stripe | undefined;

  constructor(config: ConfigService<Env, true>) {
    const key = config.get('STRIPE_SECRET_KEY', { infer: true });
    this.stripe = key ? new Stripe(key) : undefined;
  }

  async createPayment(input: Parameters<PaymentProvider['createPayment']>[0]) {
    if (input.amount.amountMinor < MIN_CHARGE_MINOR[input.amount.currency]) {
      throw new RangeError(`Below the minimum ${input.amount.currency} charge`);
    }
    const intent = await this.client().paymentIntents.create(
      {
        amount: input.amount.amountMinor,
        currency: input.amount.currency.toLowerCase(),
        metadata: { reference: input.reference },
        receipt_email: input.customerEmail,
        automatic_payment_methods: { enabled: true },
      },
      { idempotencyKey: input.idempotencyKey },
    );
    return {
      providerPaymentId: intent.id,
      clientSecret: intent.client_secret ?? '',
    };
  }

  async refund(input: Parameters<PaymentProvider['refund']>[0]) {
    const refund = await this.client().refunds.create(
      {
        payment_intent: input.providerPaymentId,
        amount: input.amount.amountMinor,
      },
      { idempotencyKey: input.idempotencyKey },
    );
    return { providerRefundId: refund.id };
  }

  private client(): Stripe {
    if (!this.stripe)
      throw new NotImplementedException(
        'Stripe is not configured (STRIPE_SECRET_KEY)',
      );
    return this.stripe;
  }
}
