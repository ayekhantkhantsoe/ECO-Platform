import { Module } from '@nestjs/common';

import { ReturnsController } from './returns.controller.js';

/**
 * Return requests and refunds with traceable status; gift-funded portions go back to gift balance (spec §3 policy 4).
 */
@Module({
  controllers: [ReturnsController],
})
export class ReturnsModule {}
