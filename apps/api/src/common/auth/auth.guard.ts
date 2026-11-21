import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { createRemoteJWKSet, jwtVerify, type JWTVerifyGetKey } from 'jose';

import type { Env } from '../../config/env.js';
import type { Role } from '../../generated/prisma/enums.js';
import type { AuthUser } from './auth-user.js';
import { IS_PUBLIC_KEY, ROLES_KEY } from './decorators.js';

/**
 * Global guard: every route requires a valid Supabase access token unless marked @Public().
 * Tokens are verified against the project's JWKS (asymmetric signing keys), so the API
 * never needs the Supabase JWT secret.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  private jwks: JWTVerifyGetKey | undefined;
  private readonly supabaseUrl: string;

  constructor(
    private readonly reflector: Reflector,
    config: ConfigService<Env, true>,
  ) {
    this.supabaseUrl = config.get('SUPABASE_URL', { infer: true });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const targets = [context.getHandler(), context.getClass()];
    if (this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, targets))
      return true;

    const request = context.switchToHttp().getRequest<{
      headers: Record<string, string | undefined>;
      user?: AuthUser;
    }>();
    const token = request.headers.authorization?.replace(/^Bearer\s+/i, '');
    if (!token) throw new UnauthorizedException();

    request.user = await this.verify(token);

    const roles = this.reflector.getAllAndOverride<Role[] | undefined>(
      ROLES_KEY,
      targets,
    );
    if (roles && !roles.includes(request.user.role))
      throw new ForbiddenException();
    return true;
  }

  private async verify(token: string): Promise<AuthUser> {
    if (!this.supabaseUrl)
      throw new UnauthorizedException('Auth is not configured (SUPABASE_URL)');
    this.jwks ??= createRemoteJWKSet(
      new URL('/auth/v1/.well-known/jwks.json', this.supabaseUrl),
    );
    try {
      const { payload } = await jwtVerify(token, this.jwks, {
        issuer: new URL('/auth/v1', this.supabaseUrl).toString(),
        audience: 'authenticated',
      });
      return {
        id: String(payload.sub),
        email: typeof payload.email === 'string' ? payload.email : undefined,
        role: 'CUSTOMER',
      };
    } catch {
      throw new UnauthorizedException();
    }
  }
}
