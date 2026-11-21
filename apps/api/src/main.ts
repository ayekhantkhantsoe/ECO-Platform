import { StandardSchemaValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module.js';
import type { Env } from './config/env.js';

async function bootstrap() {
  // rawBody is needed to verify Stripe webhook signatures.
  const app = await NestFactory.create(AppModule, { rawBody: true });
  const config = app.get<ConfigService<Env, true>>(ConfigService);

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: config.get('WEB_ORIGIN', { infer: true }).split(','),
    credentials: true,
  });
  // Validates any @Body/@Query/@Param that declares a Zod (Standard Schema) `schema`.
  app.useGlobalPipes(new StandardSchemaValidationPipe());
  app.enableShutdownHooks();

  await app.listen(config.get('PORT', { infer: true }));
}
await bootstrap();
