import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const headers = Object.fromEntries(request.headers.entries());
  
  const securityHeaders = {
    'x-frame-options': 'DENY',
    'x-content-type-options': 'nosniff', 
    'content-security-policy': "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net https://unpkg.com https://d3js.org; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; connect-src 'self' https: wss: http://localhost:*; media-src 'self'; object-src 'none'; child-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self';",
    'referrer-policy': 'origin-when-cross-origin',
    'strict-transport-security': 'max-age=31536000; includeSubDomains; preload',
    'x-xss-protection': '1; mode=block',
    'x-dns-prefetch-control': 'off',
    'x-download-options': 'noopen',
    'x-permitted-cross-domain-policies': 'none',
    'permissions-policy': 'camera=(), microphone=(), geolocation=()'
  };

  return NextResponse.json({
    message: 'Security headers test endpoint',
    requestHeaders: headers,
    expectedSecurityHeaders: securityHeaders,
    timestamp: new Date().toISOString()
  }, {
    headers: securityHeaders
  });
}
