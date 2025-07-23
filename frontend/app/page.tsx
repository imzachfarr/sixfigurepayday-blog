import React from 'react'
import BlogList from '../components/BlogList'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import BannerAd from '../components/BannerAd'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Hero />
        <BannerAd variant="top" />
        <BlogList />
        <BannerAd variant="bottom" />
      </main>
      <Footer />
    </div>
  )
} 