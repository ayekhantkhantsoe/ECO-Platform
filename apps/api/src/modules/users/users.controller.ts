import { Controller, Get } from '@nestjs/common';

import type { AuthUser } from '../../common/auth/auth-user.js';
import { CurrentUser } from '../../common/auth/decorators.js';

@Controller('users')
export class UsersController {
  /** The signed-in caller. TODO: upsert the User row on first sign-in and return profile + role. */
  @Get('me')
  me(@CurrentUser() user: AuthUser) {
    return user;
  }
}
