import React from 'react'
import { Metadata } from 'next'
import BlogList from '../components/BlogList'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import BannerAd from '../components/BannerAd'

export const metadata: Metadata = {
  title: 'SixFigurePayday - AI & Online Money Making Blog | ZephryxLabs Reviews',
  description: 'Discover the latest AI tools, strategies, and opportunities to make money online. Expert insights on artificial intelligence, digital marketing, passive income streams, and ZephryxLabs reviews. Start your journey to financial freedom today.',
  keywords: [
    'AI money making', 'online income', 'passive income', 'ZephryxLabs review', 
    'ZephryxLabs scam', 'ZephryxLabs legit', 'make money online', 'AI tools',
    'digital marketing', 'entrepreneurship', 'side hustles', 'business opportunities',
    'financial freedom', 'online business', 'artificial intelligence'
  ],
  openGraph: {
    title: 'SixFigurePayday - AI & Online Money Making Blog | ZephryxLabs Reviews',
    description: 'Discover the latest AI tools, strategies, and opportunities to make money online. Expert insights on artificial intelligence, digital marketing, passive income streams, and ZephryxLabs reviews.',
    url: 'https://sixfigurepayday.com',
    siteName: 'SixFigurePayday',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SixFigurePayday - AI & Online Money Making Blog',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SixFigurePayday - AI & Online Money Making Blog | ZephryxLabs Reviews',
    description: 'Discover the latest AI tools, strategies, and opportunities to make money online. Expert insights on artificial intelligence, digital marketing, passive income streams, and ZephryxLabs reviews.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://sixfigurepayday.com',
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
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