import type { Role } from '../../generated/prisma/enums.js';

/** The caller, resolved from a verified Supabase access token. */
export type AuthUser = {
  /** Supabase auth user id — also our User.id */
  id: string;
  email: string | undefined;
  /** TODO(auth): load from the User table (staff roles are never trusted from the client). */
  role: Role;
};
