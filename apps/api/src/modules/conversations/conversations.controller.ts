import { Controller, Get, Post, NotImplementedException } from '@nestjs/common';

@Controller('conversations')
export class ConversationsController {
  /** List the caller's threads. */
  @Get()
  list() {
    throw new NotImplementedException();
  }

  /** Atomically accept the newest, unexpired, payable quote version. */
  @Post(':threadId/quotes/:version/accept')
  acceptQuote() {
    throw new NotImplementedException();
  }
}
