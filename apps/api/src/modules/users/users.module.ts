import { Module } from '@nestjs/common';

import { UsersController } from './users.controller.js';

/** Accounts, profile, addresses, staff roles. Sign-in itself is Supabase Auth on the web app. */
@Module({
  controllers: [UsersController],
})
export class UsersModule {}
