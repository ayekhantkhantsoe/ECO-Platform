import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { AuthGuard } from './common/auth/auth.guard.js';
import { envSchema } from './config/env.js';
import { HealthController } from './health/health.controller.js';
import { BoardsModule } from './modules/boards/boards.module.js';
import { CampaignsModule } from './modules/campaigns/campaigns.module.js';
import { CartModule } from './modules/cart/cart.module.js';
import { CatalogModule } from './modules/catalog/catalog.module.js';
import { CheckoutModule } from './modules/checkout/checkout.module.js';
import { ConversationsModule } from './modules/conversations/conversations.module.js';
import { GiftsModule } from './modules/gifts/gifts.module.js';
import { OrdersModule } from './modules/orders/orders.module.js';
import { PaymentsModule } from './modules/payments/payments.module.js';
import { ReturnsModule } from './modules/returns/returns.module.js';
import { UsersModule } from './modules/users/users.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validationSchema: envSchema }),
    PrismaModule,
    // Feature modules — one owner each (see docs/ARCHITECTURE.md).
    UsersModule,
    CatalogModule,
    CartModule,
    CheckoutModule,
    OrdersModule,
    PaymentsModule,
    ConversationsModule,
    BoardsModule,
    CampaignsModule,
    GiftsModule,
    ReturnsModule,
  ],
  controllers: [HealthController],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
