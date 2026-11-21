import { Module } from '@nestjs/common';

import { CatalogController } from './catalog.controller.js';
import { CatalogService } from './catalog.service.js';

/** Categories, products, variants, stock. */
@Module({
  controllers: [CatalogController],
  providers: [CatalogService],
  exports: [CatalogService],
})
export class CatalogModule {}
