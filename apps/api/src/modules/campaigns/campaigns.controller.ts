import { Controller, Get, NotImplementedException } from '@nestjs/common';

import { Public } from '../../common/auth/decorators.js';

@Public()
@Controller('campaigns')
export class CampaignsController {
  /** List active campaigns. */
  @Get()
  list() {
    throw new NotImplementedException();
  }
}
