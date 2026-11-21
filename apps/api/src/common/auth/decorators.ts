import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';

import type { Role } from '../../generated/prisma/enums.js';
import type { AuthUser } from './auth-user.js';

export const IS_PUBLIC_KEY = 'isPublic';
/** Route is reachable without signing in (guests can browse and build a cart — decision D04). */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const ROLES_KEY = 'roles';
/** Restrict a route to staff roles, e.g. @Roles('STAFF', 'ADMIN') on /admin endpoints. */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthUser | undefined => {
    return ctx.switchToHttp().getRequest<{ user?: AuthUser }>().user;
  },
);
