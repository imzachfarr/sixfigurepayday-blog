'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`real-estate-header fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
      <div className="container">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="real-estate-logo">
              MYHOUSE
            </Link>
            
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="real-estate-nav real-estate-nav-active">
                HOME
              </Link>
              <Link href="/about" className="real-estate-nav">
                ABOUT
              </Link>
              <Link href="/properties" className="real-estate-nav">
                PROPERTIES
              </Link>
              <Link href="/contact" className="real-estate-nav">
                CONTACT
              </Link>
            </nav>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-8">
            {/* Action Buttons */}
            <div className="hidden lg:flex items-center space-x-6">
              <button className="action-button action-button-active">
                BUY
              </button>
              <button className="action-button">
                RENT
              </button>
              <button className="action-button">
                SELL
              </button>
            </div>

            {/* Image Previews */}
            <div className="hidden xl:flex items-center space-x-2">
              <div className="w-12 h-8 bg-gray-200 rounded"></div>
              <div className="w-12 h-8 bg-gray-200 rounded"></div>
              <div className="w-12 h-8 bg-gray-200 rounded"></div>
            </div>

            {/* Contact Button */}
            <button className="contact-button">
              +1 234 567 8900
            </button>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
} 