import { Module } from '@nestjs/common';

import { OrdersController } from './orders.controller.js';

/**
 * Orders, receipts, separate payment/fulfillment status, and F09 'Add to This Order' adjustments (never edit the old receipt).
 */
@Module({
  controllers: [OrdersController],
})
export class OrdersModule {}
