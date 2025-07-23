"use client"

import React from 'react'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import BannerAd from '../../components/BannerAd'
import { safeFormatDate } from '../../utils/dateUtils'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  published_at: string
  read_time: number
  category: string
  tags: string[]
  image_url?: string
  seo_title?: string
  seo_description?: string
  view_count: number
}

export default function EcommercePage() {
  const [posts, setPosts] = React.useState<BlogPost[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const fetchEcommercePosts = async () => {
      try {
        // Fetch all posts and filter for e-commerce related ones
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'}/api/blog?limit=50`)
        if (!response.ok) {
          throw new Error('Failed to fetch posts')
        }
        const data = await response.json()
        
        // Filter posts that are e-commerce related
        const ecommercePosts = data.posts.filter((post: BlogPost) => 
          post.tags.some(tag => 
            tag.toLowerCase().includes('e-commerce') || 
            tag.toLowerCase().includes('ecommerce') ||
            tag.toLowerCase().includes('dropshipping') ||
            tag.toLowerCase().includes('shopify') ||
            tag.toLowerCase().includes('amazon') ||
            tag.toLowerCase().includes('store') ||
            tag.toLowerCase().includes('product') ||
            tag.toLowerCase().includes('selling')
          ) ||
          post.title.toLowerCase().includes('e-commerce') ||
          post.title.toLowerCase().includes('ecommerce') ||
          post.title.toLowerCase().includes('dropshipping') ||
          post.title.toLowerCase().includes('shopify') ||
          post.title.toLowerCase().includes('amazon') ||
          post.title.toLowerCase().includes('store') ||
          post.title.toLowerCase().includes('product') ||
          post.title.toLowerCase().includes('selling')
        )
        
        setPosts(ecommercePosts)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchEcommercePosts()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-24">
          <section className="py-16">
            <div className="container-wide">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
                <p className="text-gray-600 mt-4">Loading articles...</p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-24">
          <section className="py-16">
            <div className="container-wide">
              <div className="text-center">
                <p className="text-red-600">Error: {error}</p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24">
        <section className="bg-white py-16">
          <div className="container-wide">
            {/* Category header */}
            <div className="mb-12 animate-fade-in-up">
              <div className="flex items-center mb-4">
                <Link href="/" className="text-gray-500 hover:text-black transition-colors">
                  Home
                </Link>
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-black font-semibold">E-commerce</span>
              </div>
              <h1 className="text-4xl font-bold text-black font-serif mb-4">
                E-commerce
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl">
                Discover the latest insights, strategies, and tips for building successful e-commerce businesses.
              </p>
            </div>

            {/* Top Banner Ad */}
            <BannerAd variant="top" />

            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No e-commerce articles found. Check back soon!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main content area */}
                <div className="lg:col-span-2">
                  <div className="space-y-8">
                    {posts.map((post, index) => (
                      <article key={post.id} className="article-card card-sleek" style={{ animationDelay: `${index * 0.1}s` }}>
                        {/* Featured image */}
                        {post.image_url && (
                          <div className="mb-6">
                            <img
                              src={post.image_url}
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
                            {safeFormatDate(post.published_at)}
                          </span>
                          <span className="read-time">
                            {post.read_time} min read
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
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                  {/* Category info */}
                  <div className="card-sleek p-6">
                    <h3 className="sidebar-heading">About E-commerce</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Stay updated with the latest trends and strategies in e-commerce and online retail.
                    </p>
                    <div className="text-sm text-gray-500">
                      {posts.length} article{posts.length !== 1 ? 's' : ''} in this category
                    </div>
                  </div>

                  {/* Newsletter signup */}
                  <div className="card-sleek p-6 bg-gradient-to-br from-gray-50 to-gray-100">
                    <h3 className="text-lg font-bold text-black font-serif mb-3">
                      Get E-commerce Insights
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Join thousands of entrepreneurs getting the latest e-commerce news and strategies.
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

            {/* Bottom Banner Ad */}
            <BannerAd variant="bottom" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
} 