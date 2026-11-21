import { ConfigService } from '@nestjs/config';
import { money } from '@eco/shared';

import { StripePaymentProvider } from './stripe.provider.js';

describe('StripePaymentProvider', () => {
  const provider = new StripePaymentProvider(
    new ConfigService({ STRIPE_SECRET_KEY: '' }) as never,
  );

  it('rejects charges below the AED minimum', async () => {
    await expect(
      provider.createPayment({
        amount: money(150),
        idempotencyKey: 'k',
        reference: 'r',
      }),
    ).rejects.toThrow(RangeError);
  });
});
