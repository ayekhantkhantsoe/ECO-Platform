import { Controller, Get, NotImplementedException } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  /** List the caller's orders. */
  @Get()
  list() {
    throw new NotImplementedException();
  }
}
