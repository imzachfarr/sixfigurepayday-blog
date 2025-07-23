import React from 'react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-white py-12 mt-24">
      <div className="container-wide">
        {/* Main headline */}
        <div className="mb-12 animate-fade-in-up">
          <h1 className="hero-headline mb-6">
            The Future of AI-Driven Entrepreneurship
          </h1>
          <p className="hero-subheadline mb-8 max-w-4xl">
            Discover how artificial intelligence is revolutionizing online business and creating unprecedented opportunities for digital entrepreneurs to scale their income.
          </p>
          <div className="flex items-center space-x-6">
            <span className="trending-tag hover:scale-105">TRENDING</span>
            <span className="text-sm text-gray-500">
              Updated {new Date().toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </span>
          </div>
        </div>

        {/* Featured articles grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main featured article */}
          <div className="lg:col-span-2">
            <article className="article-card card-sleek">
              <div className="mb-4">
                <span className="category-tag">AI & Technology</span>
              </div>
              <h2 className="article-title mb-4">
                <Link href="/blog/how-ai-revolutionizing-online-money-making-2024">
                  How AI is Revolutionizing Online Money Making in 2024
                </Link>
              </h2>
              <p className="article-excerpt">
                Discover the latest AI tools and strategies that are transforming how entrepreneurs make money online. From automated content creation to intelligent marketing systems.
              </p>
              <div className="article-meta">
                <span className="publish-date">December 19, 2024</span>
                <span className="read-time">5 min read</span>
                <span className="trending-tag hover:scale-105">FEATURED</span>
              </div>
            </article>
          </div>

          {/* Sidebar articles */}
          <div className="space-y-6">
            <h3 className="sidebar-heading">Latest News</h3>
            
            <article className="sidebar-article hover-lift">
              <h4 className="sidebar-title">
                <Link href="#">ChatGPT-5: What Entrepreneurs Need to Know</Link>
              </h4>
              <div className="sidebar-meta">
                <span>December 18, 2024</span>
                <span>•</span>
                <span>3 min read</span>
              </div>
            </article>

            <article className="sidebar-article hover-lift">
              <h4 className="sidebar-title">
                <Link href="#">The Rise of AI-Powered Dropshipping</Link>
              </h4>
              <div className="sidebar-meta">
                <span>December 17, 2024</span>
                <span>•</span>
                <span>4 min read</span>
              </div>
            </article>

            <article className="sidebar-article hover-lift">
              <h4 className="sidebar-title">
                <Link href="#">Passive Income Strategies for 2024</Link>
              </h4>
              <div className="sidebar-meta">
                <span>December 16, 2024</span>
                <span>•</span>
                <span>6 min read</span>
              </div>
            </article>

            <article className="sidebar-article hover-lift">
              <h4 className="sidebar-title">
                <Link href="#">Digital Marketing Trends to Watch</Link>
              </h4>
              <div className="sidebar-meta">
                <span>December 15, 2024</span>
                <span>•</span>
                <span>4 min read</span>
              </div>
            </article>
          </div>
        </div>

        {/* Newsletter signup */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 py-8 rounded-lg shadow-lg">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-black font-serif mb-4">
              Stay Ahead of the Curve
            </h3>
            <p className="text-gray-600 mb-6">
              Get the latest AI and business insights delivered to your inbox daily.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email address"
                className="input-sleek flex-1 max-w-md"
              />
              <button className="btn-primary">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 