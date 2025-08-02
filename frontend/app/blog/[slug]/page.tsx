import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import BannerAd from '../../../components/BannerAd'
import { safeFormatDate, safeFormatDateShort } from '../../../utils/dateUtils'
import BlogAnalytics from '../../../components/BlogAnalytics'
import BlogShareButtons from '../../../components/BlogShareButtons'
import RelatedPosts from '../../../components/RelatedPosts'



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

interface PageProps {
  params: {
    slug: string
  }
}

// Generate metadata for blog posts
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'}/api/blog/${params.slug}`)
    
    if (!response.ok) {
      return {
        title: 'Blog Post Not Found',
        description: 'The requested blog post could not be found.',
      }
    }

    const data = await response.json()
    const post: BlogPost = data.post

    const title = post.seo_title || post.title
    const description = post.seo_description || post.excerpt
    const imageUrl = post.image_url || '/og-image.jpg'

    return {
      title,
      description,
      keywords: post.tags.join(', '),
      openGraph: {
        title,
        description,
        type: 'article',
        url: `https://sixfigurepayday.com/blog/${post.slug}`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        publishedTime: post.published_at,
        modifiedTime: post.published_at,
        authors: ['SixFigurePayday Staff'],
        section: post.category,
        tags: post.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [imageUrl],
      },
      alternates: {
        canonical: `https://sixfigurepayday.com/blog/${post.slug}`,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    }
  } catch (error) {
    return {
      title: 'Blog Post',
      description: 'Blog post on SixFigurePayday',
    }
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'}/api/blog/${params.slug}`)
    
    if (!response.ok) {
      notFound()
    }

    const data = await response.json()
    const post: BlogPost = data.post

    // Structured data for blog post
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "image": post.image_url || "https://sixfigurepayday.com/og-image.jpg",
      "author": {
        "@type": "Person",
        "name": "SixFigurePayday Staff"
      },
      "publisher": {
        "@type": "Organization",
        "name": "SixFigurePayday",
        "logo": {
          "@type": "ImageObject",
          "url": "https://sixfigurepayday.com/favicon.png"
        }
      },
      "datePublished": post.published_at,
      "dateModified": post.published_at,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://sixfigurepayday.com/blog/${post.slug}`
      },
      "articleSection": post.category,
      "keywords": post.tags.join(", "),
      "wordCount": post.content.length,
      "timeRequired": `PT${post.read_time}M`
    }

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <BlogAnalytics slug={post.slug} category={post.category} tags={post.tags} />
        <Header />
        <main className="bg-white">
          <article className="container-wide py-12">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <Link 
                href="/" 
                className="text-gray-600 hover:text-black transition-colors"
              >
                Home
              </Link>
              <span className="mx-2 text-gray-400">→</span>
              <Link 
                href={`/category/${post.category}`} 
                className="text-gray-600 hover:text-black transition-colors"
              >
                {post.category}
              </Link>
              <span className="mx-2 text-gray-400">→</span>
              <span className="text-gray-900">{post.title}</span>
            </nav>

            {/* Article header */}
            <header className="mb-8">
              <div className="mb-6">
                <span className="category-tag">{post.category}</span>
                <span className="trending-tag ml-3">FEATURED</span>
              </div>

              <h1 className="hero-headline mb-6">
                {post.title}
              </h1>

              <p className="hero-subheadline mb-8 max-w-4xl">
                {post.excerpt}
              </p>

              {/* Top Banner Ad */}
              <BannerAd variant="top" />

              {/* Article metadata */}
              <div className="flex items-center space-x-6 text-sm text-gray-500 border-t border-gray-200 pt-6">
                <span className="publish-date">
                  {safeFormatDate(post.published_at)}
                </span>
                <span className="read-time">
                  {post.read_time} min read
                </span>
                <span className="view-count">
                  {post.view_count} views
                </span>
                <span className="author">
                  By SixFigurePayday Staff
                </span>
              </div>
            </header>

            {/* Featured image */}
            {post.image_url && (
              <div className="mb-8">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="featured-image"
                />
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Featured image for {post.title}
                </p>
              </div>
            )}

            {/* Article content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content */}
              <div className="lg:col-span-2">
                <div className="blog-content">
                  <div 
                    className="text-gray-800 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </div>

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <h3 className="text-lg font-bold text-black font-serif mb-4">Tags:</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share buttons */}
                <BlogShareButtons title={post.title} slug={post.slug} category={post.category} />

                {/* Bottom Banner Ad */}
                <BannerAd variant="bottom" />
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Author info */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-black font-serif mb-4">About the Author</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    SixFigurePayday Staff provides expert insights on AI, entrepreneurship, and online business strategies.
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-black">SixFigurePayday Staff</p>
                      <p className="text-sm text-gray-500">AI & Business Expert</p>
                    </div>
                  </div>
                </div>

                {/* Related posts */}
                {data.relatedPosts && data.relatedPosts.length > 0 && (
                  <RelatedPosts posts={data.relatedPosts} currentPostSlug={post.slug} />
                )}

                {/* Newsletter signup */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-black font-serif mb-3">
                    Get Daily Insights
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Join thousands of entrepreneurs getting the latest AI and business news.
                  </p>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black mb-3"
                  />
                  <button className="w-full bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-800 transition-colors">
                    Subscribe
                  </button>
                </div>

                {/* Ad space */}
                <div className="ad-space">
                  <p className="text-sm">Advertisement</p>
                </div>
              </div>
            </div>
          </article>
        </main>
        <Footer />
      </>
    )
  } catch (error) {
    console.error('Error fetching blog post:', error)
    notFound()
  }
} 