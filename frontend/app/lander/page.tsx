import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import BannerAd from '../../components/BannerAd'

export const metadata: Metadata = {
  title: 'SixFigurePayday - AI & Online Money Making | ZephryxLabs Reviews',
  description: 'Discover proven strategies to make money online with AI tools and platforms. Expert reviews of ZephryxLabs and other money-making opportunities. Start your journey to financial freedom today.',
  keywords: [
    'make money online', 'ZephryxLabs review', 'ZephryxLabs scam', 'ZephryxLabs legit',
    'AI money making', 'online income', 'passive income', 'digital marketing',
    'entrepreneurship', 'side hustles', 'business opportunities', 'financial freedom'
  ],
  openGraph: {
    title: 'SixFigurePayday - AI & Online Money Making | ZephryxLabs Reviews',
    description: 'Discover proven strategies to make money online with AI tools and platforms. Expert reviews of ZephryxLabs and other money-making opportunities.',
    url: 'https://www.sixfigurepayday.com/lander',
    siteName: 'SixFigurePayday',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SixFigurePayday - AI & Online Money Making',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SixFigurePayday - AI & Online Money Making | ZephryxLabs Reviews',
    description: 'Discover proven strategies to make money online with AI tools and platforms. Expert reviews of ZephryxLabs and other money-making opportunities.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.sixfigurepayday.com/lander',
  },
}

export default function LanderPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Header */}
          <div className="flex items-center justify-between py-4">
            {/* Left Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-black rounded-sm"></div>
              <span className="text-sm font-medium text-gray-900">SIXFIGUREPAYDAY</span>
            </div>
            
            {/* Center Logo */}
            <div className="text-center">
              <h1 className="text-2xl font-bold text-black tracking-wider">SIXFIGUREPAYDAY</h1>
            </div>
            
            {/* Right - Email Subscribe */}
            <div className="flex items-center space-x-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
              />
              <button className="px-4 py-2 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex items-center justify-between py-4 border-t border-gray-200">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-sm font-medium text-black hover:text-gray-600 transition-colors">
                BUSINESS
              </Link>
              <Link href="/blog" className="text-sm font-medium text-black hover:text-gray-600 transition-colors">
                TECHNOLOGY
              </Link>
              <Link href="/blog" className="text-sm font-medium text-black hover:text-gray-600 transition-colors">
                AI & MONEY
              </Link>
              <Link href="/blog" className="text-sm font-medium text-black hover:text-gray-600 transition-colors">
                REVIEWS
              </Link>
              <Link href="/blog" className="text-sm font-medium text-black hover:text-gray-600 transition-colors">
                STRATEGIES
              </Link>
              <Link href="/blog" className="text-sm font-medium text-black hover:text-gray-600 transition-colors">
                OPPORTUNITIES
              </Link>
              <Link href="/blog" className="text-sm font-medium text-black hover:text-gray-600 transition-colors">
                ZEPHRYXLABS
              </Link>
            </div>
            
            {/* Search Icon */}
            <div className="w-5 h-5">
              <svg className="w-full h-full text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2">
            {/* Today's Picks Section */}
            <div className="mb-8">
              <div className="bg-black text-white px-4 py-2 inline-block mb-6">
                <span className="text-sm font-medium">TODAY'S PICKS</span>
              </div>
              
              {/* Featured Article */}
              <article className="mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg mb-4">
                  <div className="w-full h-64 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <p className="text-lg font-semibold">AI Money Making</p>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">ZEPHRYXLABS</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    ZEPHRYXLABS REVIEW: IS IT LEGIT OR A SCAM? HONEST ANALYSIS 2025
                  </h2>
                  
                  <p className="text-gray-600 mb-4">
                    Introduction: ZephryxLabs has been making waves in the online money-making community. But is this platform truly legitimate, or is it just another scam? Our comprehensive analysis reveals the truth behind the hype...
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">SIXFIGUREPAYDAY STAFF</span>
                    <Link 
                      href="/blog/is-zephryx-labs-legit-honest-look-2025"
                      className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                    >
                      Read Full Review →
                    </Link>
                  </div>
                </div>
              </article>
              
              {/* Second Featured Article */}
              <article className="mb-8">
                <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg mb-4">
                  <div className="w-full h-48 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <p className="text-sm font-semibold">AI Strategy</p>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-xs font-medium text-green-600 uppercase tracking-wide">BUSINESS</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    APPLE'S AI STRATEGY: REVOLUTIONARY CHANGES IN 2025 EARNINGS CALL
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    Apple's latest earnings call reveals groundbreaking AI investments and strategic shifts that could reshape the technology landscape...
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">SIXFIGUREPAYDAY STAFF</span>
                    <Link 
                      href="/blog/apple-ai-strategy-2025-earnings-call"
                      className="text-green-600 font-semibold hover:text-green-700 transition-colors"
                    >
                      Read Full Analysis →
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          </div>
          
          {/* Sidebar - Right Column */}
          <div className="lg:col-span-1">
            <div className="bg-black text-white px-4 py-2 inline-block mb-6">
              <span className="text-sm font-medium">MOST RECENT</span>
            </div>
            
            <div className="space-y-6">
              {/* Recent Article 1 */}
              <article className="flex space-x-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex-shrink-0"></div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-gray-900 mb-1">
                    ZephryxLabs Scam Review: Honest Analysis 2025
                  </h4>
                  <p className="text-xs text-gray-500">SIXFIGUREPAYDAY STAFF</p>
                </div>
              </article>
              
              {/* Recent Article 2 */}
              <article className="flex space-x-4">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex-shrink-0"></div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-gray-900 mb-1">
                    AI Money Making: 10 Proven Strategies for 2025
                  </h4>
                  <p className="text-xs text-gray-500">SIXFIGUREPAYDAY STAFF</p>
                </div>
              </article>
              
              {/* Recent Article 3 */}
              <article className="flex space-x-4">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg flex-shrink-0"></div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-gray-900 mb-1">
                    Online Business: Start Your Empire Today
                  </h4>
                  <p className="text-xs text-gray-500">SIXFIGUREPAYDAY STAFF</p>
                </div>
              </article>
              
              {/* Recent Article 4 */}
              <article className="flex space-x-4">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex-shrink-0"></div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-gray-900 mb-1">
                    Passive Income: The Ultimate Guide for 2025
                  </h4>
                  <p className="text-xs text-gray-500">SIXFIGUREPAYDAY STAFF</p>
                </div>
              </article>
              
              {/* Recent Article 5 */}
              <article className="flex space-x-4">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-lg flex-shrink-0"></div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-gray-900 mb-1">
                    Digital Marketing: Dominate Your Niche
                  </h4>
                  <p className="text-xs text-gray-500">SIXFIGUREPAYDAY STAFF</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 