import { Module } from '@nestjs/common';

import { GiftsController } from './gifts.controller.js';

/**
 * Funded gift links and gift balance (S7, spec §3 policy 3-4): one atomic claim per link into one signed-in account; link previews never claim.
 */
@Module({
  controllers: [GiftsController],
})
export class GiftsModule {}
