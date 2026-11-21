import { Module } from '@nestjs/common';

import { BoardsController } from './boards.controller.js';

/**
 * Mix & Match 'Try Them Together' boards (S3). Positions never change prices; keyboard/list equivalent required.
 */
@Module({
  controllers: [BoardsController],
})
export class BoardsModule {}
