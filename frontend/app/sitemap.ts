import { MetadataRoute } from 'next'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'http://localhost:5001'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sixfigurepayday.com'
  
  // Static pages with high priority
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/lander`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ecommerce`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  // Known blog posts with ZephryxLabs focus
  const knownPosts = [
    {
      url: `${baseUrl}/blog/is-zephryx-labs-scam-honest-review`,
      lastModified: new Date('2025-01-15'),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/is-zephryx-labs-legit-honest-look-2025`,
      lastModified: new Date('2025-01-20'),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/apple-ai-strategy-2025-earnings-call`,
      lastModified: new Date('2025-01-25'),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  // Category pages
  const categories = [
    'ai',
    'money-making',
    'zephryx-labs',
    'online-business',
    'passive-income',
    'digital-marketing',
    'entrepreneurship',
    'artificial-intelligence',
    'side-hustles',
    'business-opportunities'
  ]

  const categoryPages = categories.map(category => ({
    url: `${baseUrl}/category/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Try to fetch dynamic blog posts from API
  let dynamicPosts: MetadataRoute.Sitemap = []
  
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
          lastModified: new Date(post.updatedAt || post.publishedAt || Date.now()),
          changeFrequency: 'weekly' as const,
          priority: post.category === 'zephryx-labs' ? 0.9 : 0.7,
        }))
      }
    }
  } catch (error) {
    console.error('Error fetching dynamic posts for sitemap:', error)
  }

  // Combine all sitemap entries
  const allEntries = [
    ...staticPages,
    ...knownPosts,
    ...categoryPages,
    ...dynamicPosts,
  ]

  // Remove duplicates based on URL
  const uniqueEntries = allEntries.filter((entry, index, self) => 
    index === self.findIndex(e => e.url === entry.url)
  )

  return uniqueEntries
} 