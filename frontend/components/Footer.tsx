import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="news-footer">
      <div className="container-wide py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company info */}
          <div className="animate-fade-in-up">
            <Link href="/" className="news-logo mb-4 block hover-lift">
              SixFigurePayday
            </Link>
            <p className="footer-section mb-4">
              Your trusted source for AI insights and proven money-making strategies. 
              Stay ahead of the curve with expert analysis and actionable advice.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-black transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-black transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-black transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Categories */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="footer-heading">Categories</h3>
            <div className="space-y-2">
              <Link href="/category/ai" className="footer-link block">
                AI & Technology
              </Link>
              <Link href="/category/online-business" className="footer-link block">
                Online Business
              </Link>
              <Link href="/category/entrepreneurship" className="footer-link block">
                Startups
              </Link>
              <Link href="/category/digital-marketing" className="footer-link block">
                Digital Marketing
              </Link>
              <Link href="/category/tools" className="footer-link block">
                Tools & Resources
              </Link>
            </div>
          </div>

          {/* Company */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="footer-heading">Company</h3>
            <div className="space-y-2">
              <Link href="/about" className="footer-link block">
                About Us
              </Link>
              <Link href="/contact" className="footer-link block">
                Contact
              </Link>
              <Link href="/privacy" className="footer-link block">
                Privacy Policy
              </Link>
              <Link href="/terms" className="footer-link block">
                Terms of Service
              </Link>
              <Link href="/advertise" className="footer-link block">
                Advertise
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="footer-heading">Stay Updated</h3>
            <p className="footer-section mb-4">
              Get the latest AI and business insights delivered to your inbox.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="input-sleek"
              />
              <button className="btn-primary w-full">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-300 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 mb-4 md:mb-0">
              © 2025 SixFigurePayday. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/sitemap" className="footer-link">
                Sitemap
              </Link>
              <Link href="/rss" className="footer-link">
                RSS Feed
              </Link>
              <Link href="/accessibility" className="footer-link">
                Accessibility
              </Link>
              <Link href="/help" className="footer-link">
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 