import { publicEnv } from './env';

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: unknown,
  ) {
    super(`API request failed with status ${status}`);
  }
}

type ApiOptions = RequestInit & {
  /** Supabase access token; the API verifies it (see apps/api/src/common/auth). */
  accessToken?: string;
};

/**
 * Thin fetch wrapper for the NestJS API. The API is the authority for prices,
 * totals, stock and payment state — the web app only displays what it returns.
 */
export async function api<T>(
  path: string,
  { accessToken, headers, ...init }: ApiOptions = {},
): Promise<T> {
  const response = await fetch(`${publicEnv.apiUrl}${path}`, {
    ...init,
    headers: {
      'content-type': 'application/json',
      ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {}),
      ...headers,
    },
  });

  const body: unknown = response.headers
    .get('content-type')
    ?.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) throw new ApiError(response.status, body);
  return body as T;
}
