import { Controller, Get, NotImplementedException } from '@nestjs/common';

@Controller('returns')
export class ReturnsController {
  /** List the caller's return requests. */
  @Get()
  list() {
    throw new NotImplementedException();
  }
}
