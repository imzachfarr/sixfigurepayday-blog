import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'SixFigurePayday - AI & Online Money Making Blog',
    template: '%s | SixFigurePayday'
  },
  description: 'Discover the latest AI tools, strategies, and opportunities to make money online. Expert insights on artificial intelligence, digital marketing, and passive income streams.',
  keywords: ['AI', 'artificial intelligence', 'make money online', 'passive income', 'digital marketing', 'entrepreneurship', 'online business'],
  authors: [{ name: 'SixFigurePayday' }],
  creator: 'SixFigurePayday',
  publisher: 'SixFigurePayday',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sixfigurepayday.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sixfigurepayday.com',
    title: 'SixFigurePayday - AI & Online Money Making Blog',
    description: 'Discover the latest AI tools, strategies, and opportunities to make money online.',
    siteName: 'SixFigurePayday',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SixFigurePayday - AI & Online Money Making Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SixFigurePayday - AI & Online Money Making Blog',
    description: 'Discover the latest AI tools, strategies, and opportunities to make money online.',
    images: ['/og-image.jpg'],
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



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 