import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class CatalogService {
  constructor(private readonly prisma: PrismaService) {}

  listProducts(take: number) {
    return this.prisma.product.findMany({
      where: { status: 'ACTIVE' },
      include: {
        variants: {
          select: {
            id: true,
            sku: true,
            options: true,
            priceMinor: true,
            currency: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take,
    });
  }

  findBySlug(slug: string) {
    return this.prisma.product.findFirst({
      where: { slug, status: 'ACTIVE' },
      include: { variants: true, category: true },
    });
  }
}
