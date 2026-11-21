import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { z } from 'zod';

import { Public } from '../../common/auth/decorators.js';
import { CatalogService } from './catalog.service.js';

const listQuerySchema = z.object({
  take: z.coerce.number().int().min(1).max(100).default(24),
});

/** Public catalog reads — guests can browse (decision D04). Staff writes live under /admin later. */
@Public()
@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalog: CatalogService) {}

  @Get('products')
  listProducts(
    @Query({ schema: listQuerySchema }) query: z.infer<typeof listQuerySchema>,
  ) {
    return this.catalog.listProducts(query.take);
  }

  @Get('products/:slug')
  async getProduct(@Param('slug') slug: string) {
    const product = await this.catalog.findBySlug(slug);
    if (!product) throw new NotFoundException();
    return product;
  }
}
