import { Controller, Post, NotImplementedException } from '@nestjs/common';

@Controller('cart')
export class CartController {
  /** Merge a guest cart into the account cart; return conflicts for visible review. */
  @Post('merge')
  merge() {
    throw new NotImplementedException();
  }
}
