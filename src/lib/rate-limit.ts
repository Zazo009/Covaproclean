/**
 * Minimal in-memory rate limiter, sufficient for a single serverless
 * instance / low-volume launch. For multi-instance production deployments,
 * replace this with a durable store (e.g. Upstash Redis) — the call site
 * (`src/app/api/booking/route.ts`) only depends on `checkRateLimit`'s
 * return shape, so swapping the implementation later needs no other changes.
 */
const hits = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

export function checkRateLimit(key: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || entry.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count += 1;
  return { allowed: true };
}
