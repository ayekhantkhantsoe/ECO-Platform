import { Module } from '@nestjs/common';

import { ConversationsController } from './conversations.controller.js';

/**
 * Shared thread + quote engine for F01 bundle offer, F05 find it for me, F06 shop my budget, F07 negotiate a deal (spec §3 quote contract, S4, S8). Quotes are immutable versioned snapshots; acceptance is an atomic server check.
 */
@Module({
  controllers: [ConversationsController],
})
export class ConversationsModule {}
