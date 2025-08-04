import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MYHOUSE - Find Your Dream Property',
  description: 'Discover premium properties for sale and rent. Expert real estate services to help you find your perfect home.',
  keywords: 'real estate, properties, homes for sale, rental properties, luxury homes, real estate agent',
  authors: [{ name: 'MYHOUSE' }],
  openGraph: {
    title: 'MYHOUSE - Find Your Dream Property',
    description: 'Discover premium properties for sale and rent. Expert real estate services to help you find your perfect home.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MYHOUSE - Find Your Dream Property',
    description: 'Discover premium properties for sale and rent. Expert real estate services to help you find your perfect home.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white">
        {children}
      </body>
    </html>
  )
} 