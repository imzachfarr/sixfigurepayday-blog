import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'SixFigurePayday - AI & Online Money Making Blog | ZephryxLabs Reviews',
    template: '%s | SixFigurePayday'
  },
  description: 'Discover the latest AI tools, strategies, and opportunities to make money online. Expert insights on artificial intelligence, digital marketing, passive income streams, and ZephryxLabs reviews.',
  keywords: [
    'AI', 'artificial intelligence', 'make money online', 'passive income', 'digital marketing', 
    'entrepreneurship', 'online business', 'ZephryxLabs', 'ZephryxLabs review', 'ZephryxLabs scam',
    'ZephryxLabs legit', 'money making opportunities', 'side hustles', 'business opportunities',
    'AI tools', 'digital marketing strategies', 'online income', 'financial freedom'
  ],
  authors: [{ name: 'SixFigurePayday' }],
  creator: 'SixFigurePayday',
  publisher: 'SixFigurePayday',
  category: 'Business & Finance',
  classification: 'Money Making & AI Blog',
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
    other: [
      { rel: 'icon', url: '/favicon.png', type: 'image/png' },
      { rel: 'shortcut icon', url: '/favicon.png', type: 'image/png' },
      { rel: 'icon', url: '/favicon.ico', type: 'image/x-icon' }
    ]
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
    title: 'SixFigurePayday - AI & Online Money Making Blog | ZephryxLabs Reviews',
    description: 'Discover the latest AI tools, strategies, and opportunities to make money online. Expert insights on artificial intelligence, digital marketing, passive income streams, and ZephryxLabs reviews.',
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
    title: 'SixFigurePayday - AI & Online Money Making Blog | ZephryxLabs Reviews',
    description: 'Discover the latest AI tools, strategies, and opportunities to make money online. Expert insights on artificial intelligence, digital marketing, passive income streams, and ZephryxLabs reviews.',
    images: ['/og-image.jpg'],
    creator: '@sixfigurepayday',
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  other: {
    'google-site-verification': 'your-google-verification-code',
    'msvalidate.01': 'your-bing-verification-code',
  },
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SixFigurePayday",
    "description": "AI & Online Money Making Blog with ZephryxLabs Reviews",
    "url": "https://sixfigurepayday.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://sixfigurepayday.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SixFigurePayday",
      "logo": {
        "@type": "ImageObject",
        "url": "https://sixfigurepayday.com/favicon.png"
      }
    },
    "sameAs": [
      "https://twitter.com/sixfigurepayday",
      "https://facebook.com/sixfigurepayday"
    ]
  }

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SixFigurePayday",
    "url": "https://sixfigurepayday.com",
    "logo": "https://sixfigurepayday.com/favicon.png",
    "description": "Expert insights on AI, money making opportunities, and ZephryxLabs reviews",
    "foundingDate": "2024",
    "sameAs": [
      "https://twitter.com/sixfigurepayday",
      "https://facebook.com/sixfigurepayday"
    ]
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="theme-color" content="#000000" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationData),
          }}
        />
        {/* Google Analytics 4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-7L38DE9WV0"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-7L38DE9WV0', {
                page_title: document.title,
                page_location: window.location.href,
                stream_id: '11701334391'
              });
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
} 