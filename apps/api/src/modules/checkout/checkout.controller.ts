import { Controller, Post, NotImplementedException } from '@nestjs/common';

@Controller('checkout')
export class CheckoutController {
  /** Create/resume a checkout attempt (idempotency key required). */
  @Post()
  create() {
    throw new NotImplementedException();
  }
}
