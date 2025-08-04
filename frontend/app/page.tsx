import React from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import BannerAd from '@/components/BannerAd'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      
      {/* Featured Properties Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium properties in the most desirable locations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Property Card 1 */}
            <div className="property-card">
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Luxury House" 
                className="property-image"
              />
              <div className="property-content">
                <h3 className="property-title">Modern Luxury Villa</h3>
                <p className="property-location mb-3">Lincoln Park, BEUU</p>
                <div className="property-price mb-4">$2,500,000</div>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4 text-sm text-gray-600">
                    <span>4 Beds</span>
                    <span>3 Baths</span>
                    <span>2,500 sqft</span>
                  </div>
                  <button className="btn-outline">View Details</button>
                </div>
              </div>
            </div>

            {/* Property Card 2 */}
            <div className="property-card">
              <img 
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Contemporary House" 
                className="property-image"
              />
              <div className="property-content">
                <h3 className="property-title">Contemporary Family Home</h3>
                <p className="property-location mb-3">Downtown District</p>
                <div className="property-price mb-4">$1,800,000</div>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4 text-sm text-gray-600">
                    <span>3 Beds</span>
                    <span>2 Baths</span>
                    <span>1,800 sqft</span>
                  </div>
                  <button className="btn-outline">View Details</button>
                </div>
              </div>
            </div>

            {/* Property Card 3 */}
            <div className="property-card">
              <img 
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Elegant House" 
                className="property-image"
              />
              <div className="property-content">
                <h3 className="property-title">Elegant Townhouse</h3>
                <p className="property-location mb-3">Riverside Heights</p>
                <div className="property-price mb-4">$1,200,000</div>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4 text-sm text-gray-600">
                    <span>2 Beds</span>
                    <span>2.5 Baths</span>
                    <span>1,500 sqft</span>
                  </div>
                  <button className="btn-outline">View Details</button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button className="btn-primary">
              View All Properties
            </button>
          </div>
        </div>
      </section>

      {/* Banner Ad */}
      <BannerAd variant="middle" />

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive real estate services to meet all your property needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-modern p-8 text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-black mb-4">Buy Property</h3>
              <p className="text-gray-600">
                Find your dream home with our extensive property listings and expert guidance.
              </p>
            </div>

            <div className="card-modern p-8 text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-black mb-4">Rent Property</h3>
              <p className="text-gray-600">
                Discover rental properties that match your lifestyle and budget requirements.
              </p>
            </div>

            <div className="card-modern p-8 text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-black mb-4">Sell Property</h3>
              <p className="text-gray-600">
                Get the best value for your property with our professional marketing and sales support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-500">
        <div className="container">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let our expert team help you navigate the real estate market with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-secondary">
                Start Your Search
              </button>
              <button className="btn-outline border-white text-white hover:bg-white hover:text-orange-500">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
} 