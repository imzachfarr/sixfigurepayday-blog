import React from 'react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="bg-white py-16">
        <div className="container text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/" 
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              Go Home
            </Link>
            <Link 
              href="/blog" 
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded hover:bg-gray-50"
            >
              Browse Posts
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
} 