import { Module } from '@nestjs/common';

import { CheckoutController } from './checkout.controller.js';

/**
 * Ordinary cart checkout: address → delivery → payment (S5). Server calculates totals; idempotent checkout attempts. Quote and campaign checkouts stay separate flows.
 */
@Module({
  controllers: [CheckoutController],
})
export class CheckoutModule {}
