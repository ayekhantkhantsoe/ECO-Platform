import type { RawBodyRequest } from '@nestjs/common';
import {
  Controller,
  Headers,
  HttpCode,
  NotImplementedException,
  Post,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';

import { Public } from '../../common/auth/decorators.js';

@Controller('payments')
export class PaymentsController {
  /**
   * Stripe webhooks are the source of truth for "paid" (spec §3: a receipt follows verified
   * payment state). TODO: verify `stripe-signature` against STRIPE_WEBHOOK_SECRET using
   * req.rawBody, store the event id for idempotency, then update payment/order state.
   */
  @Public()
  @Post('webhooks/stripe')
  @HttpCode(200)
  stripeWebhook(
    @Req() _req: RawBodyRequest<Request>,
    @Headers('stripe-signature') _signature?: string,
  ) {
    throw new NotImplementedException();
  }
}
