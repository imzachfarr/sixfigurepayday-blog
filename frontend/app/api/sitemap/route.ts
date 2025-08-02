import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'http://localhost:5001'

export async function GET(request: NextRequest) {
  try {
    const baseUrl = 'https://sixfigurepayday.com'
    
    // Static pages
    const staticPages = [
      { url: baseUrl, priority: '1.0', changefreq: 'daily' },
      { url: `${baseUrl}/lander`, priority: '0.9', changefreq: 'weekly' },
      { url: `${baseUrl}/ecommerce`, priority: '0.8', changefreq: 'weekly' },
    ]

    // Known blog posts with ZephryxLabs focus
    const knownPosts = [
      { 
        url: `${baseUrl}/blog/is-zephryx-labs-scam-honest-review`, 
        priority: '0.9', 
        changefreq: 'weekly',
        lastmod: '2025-01-15'
      },
      { 
        url: `${baseUrl}/blog/is-zephryx-labs-legit-honest-look-2025`, 
        priority: '0.9', 
        changefreq: 'weekly',
        lastmod: '2025-01-20'
      },
      { 
        url: `${baseUrl}/blog/apple-ai-strategy-2025-earnings-call`, 
        priority: '0.8', 
        changefreq: 'weekly',
        lastmod: '2025-01-25'
      },
    ]

    // Category pages
    const categories = [
      'ai', 'money-making', 'zephryx-labs', 'online-business', 'passive-income',
      'digital-marketing', 'entrepreneurship', 'artificial-intelligence', 'side-hustles',
      'business-opportunities'
    ]

    const categoryPages = categories.map(category => ({
      url: `${baseUrl}/category/${category}`,
      priority: '0.7',
      changefreq: 'weekly',
      lastmod: new Date().toISOString().split('T')[0]
    }))

    // Fetch dynamic blog posts
    let dynamicPosts: any[] = []
    
    try {
      const response = await fetch(`${BACKEND_URL}/api/blog?limit=100`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        if (data.posts && Array.isArray(data.posts)) {
          dynamicPosts = data.posts.map((post: any) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            priority: post.category === 'zephryx-labs' ? '0.9' : '0.7',
            changefreq: 'weekly',
            lastmod: new Date(post.updatedAt || post.publishedAt || Date.now()).toISOString().split('T')[0]
          }))
        }
      }
    } catch (error) {
      console.error('Error fetching dynamic posts for sitemap:', error)
    }

    // Combine all entries
    const allEntries = [
      ...staticPages,
      ...knownPosts,
      ...categoryPages,
      ...dynamicPosts,
    ]

    // Remove duplicates
    const uniqueEntries = allEntries.filter((entry, index, self) => 
      index === self.findIndex(e => e.url === entry.url)
    )

    // Generate XML sitemap
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueEntries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return NextResponse.json(
      { error: 'Failed to generate sitemap' },
      { status: 500 }
    )
  }
} 