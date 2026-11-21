import { Module } from '@nestjs/common';

import { CartController } from './cart.controller.js';

/**
 * Account cart CRUD and guest-cart merge on sign-in (decision D04, spec §4 normal purchase step 4).
 */
@Module({
  controllers: [CartController],
})
export class CartModule {}
