import { NextResponse } from 'next/server'

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Block access to sensitive files
Disallow: /api/
Disallow: /_next/
Disallow: /.next/
Disallow: /node_modules/
Disallow: /.git/
Disallow: /.env*
Disallow: /package*.json

# Sitemap location
Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'}/sitemap.xml

# Crawl delay (optional)
Crawl-delay: 1
`

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}