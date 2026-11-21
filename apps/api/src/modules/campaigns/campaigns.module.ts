import { Module } from '@nestjs/common';

import { CampaignsController } from './campaigns.controller.js';

/**
 * Group buy campaigns (S6): pay-to-join, paid-participant count, deadline close, refunds on failure (spec §3 policies 1-2).
 */
@Module({
  controllers: [CampaignsController],
})
export class CampaignsModule {}
