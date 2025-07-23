"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`news-header fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg bg-white/95 backdrop-blur-md' : 'bg-white'}`}>
      {/* Main header */}
      <div className="container-wide py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="news-logo hover-lift">
            SixFigurePayday
          </Link>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search articles..."
                className="input-sleek"
              />
              <button className="absolute right-3 top-2.5 text-gray-400 hover:text-black transition-all duration-300 hover:scale-110">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

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