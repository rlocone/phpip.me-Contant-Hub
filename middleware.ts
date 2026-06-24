import { NextRequest, NextResponse } from 'next/server';

// In-memory rate limiter (resets on server restart — fine for this scale)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string, pathname: string, maxReqs: number, windowMs: number) {
  const key = `${ip}:${pathname}`;
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxReqs - 1, resetAt: now + windowMs };
  }

  entry.count++;
  return { allowed: entry.count <= maxReqs, remaining: Math.max(0, maxReqs - entry.count), resetAt: entry.resetAt };
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // Security headers
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://s.ytimg.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data: https://*",
    "font-src 'self'",
    "connect-src 'self' https://api.venice.ai",
    "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');

  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Rate limiting
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]
          || request.headers.get('x-real-ip')
          || '127.0.0.1';

  const isApi = pathname.startsWith('/api/');
  const isFeed = pathname === '/api/feed';
  const isAuthEndpoint = pathname.startsWith('/api/auth/') || pathname.startsWith('/api/signup');

  if (isApi) {
    const limits = isFeed ? { max: 30, window: 60_000 }
                 : isAuthEndpoint ? { max: 5, window: 60_000 }
                 : { max: 100, window: 60_000 };

    const { allowed, remaining, resetAt } = rateLimit(ip, pathname, limits.max, limits.window);
    response.headers.set('X-RateLimit-Limit', String(limits.max));
    response.headers.set('X-RateLimit-Remaining', String(remaining));
    response.headers.set('X-RateLimit-Reset', String(Math.ceil(resetAt / 1000)));

    if (!allowed) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((resetAt - Date.now()) / 1000)),
          'Content-Security-Policy': csp,
        },
      });
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$).*)'],
};