import { Controller, Get, NotImplementedException } from '@nestjs/common';

import { Public } from '../../common/auth/decorators.js';

@Public()
@Controller('boards')
export class BoardsController {
  /** Load a board. */
  @Get(':boardId')
  get() {
    throw new NotImplementedException();
  }
}
