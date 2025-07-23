"use client"

import React from 'react'
import Link from 'next/link'
import { safeFormatDate, safeFormatDateShort } from '../utils/dateUtils'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  publishedAt: string
  readTime: number
  category: string
  tags: string[]
  imageUrl?: string
  seoTitle?: string
  seoDescription?: string
}

export default function BlogList() {
  const [posts, setPosts] = React.useState<BlogPost[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts')
        if (!response.ok) {
          throw new Error('Failed to fetch posts')
        }
        const data = await response.json()
        setPosts(data.posts || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return (
      <section className="py-16">
        <div className="container-wide">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading articles...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="container-wide">
          <div className="text-center">
            <p className="text-red-600">Error: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  // Get the latest 4 posts for the sidebar
  const latestPosts = posts.slice(0, 4)

  return (
    <section className="bg-white py-16">
      <div className="container-wide">
        {/* Section header */}
        <div className="mb-12 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-black font-serif mb-4">
            Latest Articles
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            Stay informed with the latest insights on AI, entrepreneurship, and online business strategies.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No articles available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content area */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {posts.map((post, index) => (
                  <article key={post.id} className="article-card card-sleek" style={{ animationDelay: `${index * 0.1}s` }}>
                    {/* Featured image */}
                    {post.imageUrl && (
                      <div className="mb-6">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="featured-image hover-glow"
                        />
                      </div>
                    )}
                    
                    {/* Category and trending tag */}
                    <div className="mb-4 flex items-center space-x-4">
                      <span className="category-tag">{post.category}</span>
                      {index === 0 && <span className="trending-tag hover:scale-105">FEATURED</span>}
                    </div>

                    {/* Article title */}
                    <h3 className="article-title mb-4">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>

                    {/* Article excerpt */}
                    <p className="article-excerpt">
                      {post.excerpt}
                    </p>

                    {/* Article metadata */}
                                            <div className="article-meta">
                          <span className="publish-date">
                            {safeFormatDate(post.publishedAt)}
                          </span>
                      <span className="read-time">
                        {post.readTime} min read
                      </span>
                      {post.tags.length > 0 && (
                        <span className="text-sm text-gray-500">
                          {post.tags.slice(0, 2).join(', ')}
                        </span>
                      )}
                    </div>
                  </article>
                ))}
              </div>

              {/* Load more button */}
              <div className="text-center mt-12">
                <Link 
                  href="/blog" 
                  className="btn-primary"
                >
                  View All Articles
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Latest News */}
              <div className="card-sleek p-6">
                <h3 className="sidebar-heading">Latest News</h3>
                <div className="space-y-4">
                  {latestPosts.length > 0 ? (
                    latestPosts.map((post) => (
                      <article key={post.id} className="sidebar-article hover-lift">
                        <h4 className="sidebar-title">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h4>
                                                    <div className="sidebar-meta">
                              <span>{safeFormatDateShort(post.publishedAt)}</span>
                          <span>•</span>
                          <span>{post.readTime} min read</span>
                        </div>
                      </article>
                    ))
                  ) : (
                    <div className="text-gray-500 text-sm">
                      No recent articles available
                    </div>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div className="card-sleek p-6">
                <h3 className="sidebar-heading">Categories</h3>
                <div className="space-y-2">
                  <Link href="/category/ai" className="block text-gray-600 hover:text-black transition-all duration-300 hover:translate-x-2">
                    AI & Technology (12)
                  </Link>
                  <Link href="/category/online-business" className="block text-gray-600 hover:text-black transition-all duration-300 hover:translate-x-2">
                    Online Business (8)
                  </Link>
                  <Link href="/category/entrepreneurship" className="block text-gray-600 hover:text-black transition-all duration-300 hover:translate-x-2">
                    Startups (15)
                  </Link>
                  <Link href="/category/digital-marketing" className="block text-gray-600 hover:text-black transition-all duration-300 hover:translate-x-2">
                    Digital Marketing (6)
                  </Link>
                  <Link href="/category/tools" className="block text-gray-600 hover:text-black transition-all duration-300 hover:translate-x-2">
                    Tools & Resources (9)
                  </Link>
                </div>
              </div>

              {/* Newsletter signup */}
              <div className="card-sleek p-6 bg-gradient-to-br from-gray-50 to-gray-100">
                <h3 className="text-lg font-bold text-black font-serif mb-3">
                  Get Daily Insights
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Join thousands of entrepreneurs getting the latest AI and business news.
                </p>
                <input
                  type="email"
                  placeholder="Your email"
                  className="input-sleek mb-3"
                />
                <button className="btn-primary w-full">
                  Subscribe
                </button>
              </div>

              {/* Ad space */}
              <div className="ad-space hover-glow">
                <p className="text-sm">Advertisement</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
} 