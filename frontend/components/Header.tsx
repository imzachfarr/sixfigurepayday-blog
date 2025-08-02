import React from 'react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed top-4 left-4 right-4 z-50 backdrop-blur-sm bg-white/3 shadow-xl rounded-2xl border border-white/10">
      {/* Main header */}
              <div className="container-wide py-4 px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="hover-lift">
            <img src="/sixlogo.png" alt="SixFigurePayday" className="h-10 md:h-12" />
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <Link href="/" className="news-nav news-nav-active">
              Home
            </Link>
            <Link href="/category/online-business" className="news-nav">
              Online Business
            </Link>
            <Link href="/category/entrepreneurship" className="news-nav">
              Startups
            </Link>
            <Link href="/category/digital-marketing" className="news-nav">
              Digital Marketing
            </Link>
            <Link href="/ecommerce" className="news-nav">
              E-commerce
            </Link>
            <Link href="/category/tools" className="news-nav">
              Tools & Resources
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button className="lg:hidden text-gray-600 hover:text-black transition-all duration-300 hover:scale-110">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
} 