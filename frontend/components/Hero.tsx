import React from 'react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="hero-section pt-20">
      {/* Main Heading */}
      <div className="container">
        <h1 className="hero-headline text-center mb-16">
          PROPERTIES
        </h1>
      </div>

      {/* Hero Content */}
      <div className="relative">
        {/* Main Property Image */}
        <div className="relative w-full h-screen">
          <img 
            src="/hero-property.jpg" 
            alt="Luxury Property" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80'
            }}
          />
          
          {/* Overlay Content */}
          <div className="absolute inset-0 bg-black bg-opacity-20">
            <div className="container h-full flex items-end pb-20">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
                {/* Left - Text Overlay */}
                <div className="lg:col-span-1 flex flex-col justify-end">
                  <div className="text-white">
                    <p className="text-orange-500 text-sm font-medium mb-2">
                      RENT, BUY OR SELL
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                      Easy way to find your dream property
                    </h2>
                  </div>
                </div>

                {/* Center - Call to Action */}
                <div className="lg:col-span-1 flex items-end justify-center">
                  <div className="text-center">
                    <p className="text-white text-lg font-medium mb-2">
                      Start the experience
                    </p>
                    <div className="flex justify-center">
                      <svg className="w-6 h-6 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Right - Map Overlay */}
                <div className="lg:col-span-1 flex items-end justify-end">
                  <div className="map-overlay max-w-xs">
                    <div className="mb-4">
                      <div className="w-full h-32 bg-gray-800 rounded mb-2"></div>
                      <p className="map-title mb-1">LINCOLN PARK</p>
                      <p className="map-address">Avenue 01, Lincoln Park, BEUU</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-300">
                        EXPLORE HOUSE
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input 
                type="text" 
                placeholder="Location" 
                className="input-modern"
              />
              <select className="input-modern">
                <option>Property Type</option>
                <option>House</option>
                <option>Apartment</option>
                <option>Condo</option>
              </select>
              <select className="input-modern">
                <option>Price Range</option>
                <option>$100k - $200k</option>
                <option>$200k - $500k</option>
                <option>$500k+</option>
              </select>
              <button className="btn-primary">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 