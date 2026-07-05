import { NextRequest } from 'next/server';

// Best-effort, in-memory, per-IP rate limiter.
// NOTE: This state lives in module scope so it persists across warm
// invocations of the same serverless instance only. It is NOT reliable
// across cold starts or across multiple regions/instances. That's an
// accepted tradeoff given this project's zero-infrastructure constraint
// (no Redis/KV, no external services).
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

export function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (!forwardedFor) return 'unknown';
  return forwardedFor.split(',')[0].trim() || 'unknown';
}

/**
 * Returns true if the given IP is currently within its allowed request
 * budget (and records this request against that budget). Returns false
 * if the IP has exceeded the limit for the current window.
 */
export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  entry.count += 1;
  return true;
}
