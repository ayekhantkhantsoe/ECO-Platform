import { Controller, Post, NotImplementedException } from '@nestjs/common';

@Controller('gifts')
export class GiftsController {
  /** Claim a gift link into the caller's account (idempotent for the same owner). */
  @Post(':token/claim')
  claim() {
    throw new NotImplementedException();
  }
}
