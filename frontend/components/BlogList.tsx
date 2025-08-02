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
  // For now, we'll use static content to avoid hydration issues
  // In a real app, you'd fetch this data server-side
  const posts: BlogPost[] = []

  // Get the latest 4 posts for the sidebar
  const latestPosts = posts.slice(0, 4)

  return (
    <section className="py-16">
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content area */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {/* Featured ZephryxLabs Article */}
                <article className="article-card card-sleek" style={{ animationDelay: '0.1s' }}>
                  <div className="mb-6">
                    <img 
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&crop=center" 
                      alt="AI Business Opportunity - ZephryxLabs Review" 
                      className="w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    />
                  </div>
                  
                  <div className="mb-4 flex items-center space-x-4">
                    <span className="category-tag">ZephryxLabs</span>
                    <span className="trending-tag hover:scale-105">FEATURED</span>
                  </div>

                  <h3 className="article-title mb-4">
                    <Link href="/blog/is-zephryx-labs-legit-honest-look-2025">
                      ZephryxLabs Review: Is It Legit or Scam? Honest Analysis 2025
                    </Link>
                  </h3>

                  <p className="article-excerpt">
                    Discover the truth about ZephryxLabs in our comprehensive review. Is this platform truly legitimate for making money online, or is it just another scam? Our detailed analysis reveals everything you need to know.
                  </p>

                  <div className="article-meta">
                    <span className="publish-date">August 1, 2025</span>
                    <span className="read-time">8 min read</span>
                    <span className="text-sm text-gray-500">ZephryxLabs, Review, Money Making</span>
                  </div>
                </article>

                {/* Apple AI Strategy Article */}
                <article className="article-card card-sleek" style={{ animationDelay: '0.2s' }}>
                  <div className="mb-6">
                    <img 
                      src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=400&fit=crop&crop=center" 
                      alt="Apple AI Strategy - Technology Innovation" 
                      className="w-full h-48 object-cover rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    />
                  </div>
                  
                  <div className="mb-4 flex items-center space-x-4">
                    <span className="category-tag">AI & Technology</span>
                  </div>

                  <h3 className="article-title mb-4">
                    <Link href="/blog/apple-ai-strategy-2025-earnings-call">
                      Apple's AI Strategy: Revolutionary Changes in 2025 Earnings Call
                    </Link>
                  </h3>

                  <p className="article-excerpt">
                    Apple's latest earnings call reveals groundbreaking AI investments and strategic shifts that could reshape the technology landscape. Learn what this means for entrepreneurs and investors.
                  </p>

                  <div className="article-meta">
                    <span className="publish-date">July 31, 2025</span>
                    <span className="read-time">12 min read</span>
                    <span className="text-sm text-gray-500">Apple, AI, Technology</span>
                  </div>
                </article>
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
                  <article className="sidebar-article hover-lift">
                    <h4 className="sidebar-title">
                      <Link href="/blog/is-zephryx-labs-legit-honest-look-2025">
                        ZephryxLabs Review: Is It Legit or Scam? Honest Analysis 2025
                      </Link>
                    </h4>
                    <div className="sidebar-meta">
                      <span>August 1, 2025</span>
                      <span>•</span>
                      <span>8 min read</span>
                    </div>
                  </article>
                  
                  <article className="sidebar-article hover-lift">
                    <h4 className="sidebar-title">
                      <Link href="/blog/apple-ai-strategy-2025-earnings-call">
                        Apple's AI Strategy: Revolutionary Changes in 2025 Earnings Call
                      </Link>
                    </h4>
                    <div className="sidebar-meta">
                      <span>July 31, 2025</span>
                      <span>•</span>
                      <span>12 min read</span>
                    </div>
                  </article>
                  
                  <article className="sidebar-article hover-lift">
                    <h4 className="sidebar-title">
                      <Link href="/blog/is-zephryx-labs-scam-honest-review">
                        ZephryxLabs Scam Review: The Truth Behind the Platform
                      </Link>
                    </h4>
                    <div className="sidebar-meta">
                      <span>July 30, 2025</span>
                      <span>•</span>
                      <span>6 min read</span>
                    </div>
                  </article>
                  
                  <article className="sidebar-article hover-lift">
                    <h4 className="sidebar-title">
                      <Link href="/ecommerce">
                        AI-Powered Dropshipping: The Future of E-commerce in 2025
                      </Link>
                    </h4>
                    <div className="sidebar-meta">
                      <span>July 29, 2025</span>
                      <span>•</span>
                      <span>10 min read</span>
                    </div>
                  </article>
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
                  <article className="sidebar-article hover-lift">
                    <h4 className="sidebar-title">
                      <Link href="/blog/is-zephryx-labs-legit-honest-look-2025">
                        ZephryxLabs Review: Is It Legit or Scam? Honest Analysis 2025
                      </Link>
                    </h4>
                    <div className="sidebar-meta">
                      <span>August 1, 2025</span>
                      <span>•</span>
                      <span>8 min read</span>
                    </div>
                  </article>
                  
                  <article className="sidebar-article hover-lift">
                    <h4 className="sidebar-title">
                      <Link href="/blog/apple-ai-strategy-2025-earnings-call">
                        Apple's AI Strategy: Revolutionary Changes in 2025 Earnings Call
                      </Link>
                    </h4>
                    <div className="sidebar-meta">
                      <span>July 31, 2025</span>
                      <span>•</span>
                      <span>12 min read</span>
                    </div>
                  </article>
                  
                  <article className="sidebar-article hover-lift">
                    <h4 className="sidebar-title">
                      <Link href="/blog/is-zephryx-labs-scam-honest-review">
                        ZephryxLabs Scam Review: The Truth Behind the Platform
                      </Link>
                    </h4>
                    <div className="sidebar-meta">
                      <span>July 30, 2025</span>
                      <span>•</span>
                      <span>6 min read</span>
                    </div>
                  </article>
                  
                  <article className="sidebar-article hover-lift">
                    <h4 className="sidebar-title">
                      <Link href="/ecommerce">
                        AI-Powered Dropshipping: The Future of E-commerce in 2025
                      </Link>
                    </h4>
                    <div className="sidebar-meta">
                      <span>July 29, 2025</span>
                      <span>•</span>
                      <span>10 min read</span>
                    </div>
                  </article>
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