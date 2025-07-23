import React from 'react'

interface BannerAdProps {
  className?: string
  variant?: 'top' | 'middle' | 'bottom'
}

export default function BannerAd({ className = '', variant = 'middle' }: BannerAdProps) {
  const getAdStyles = () => {
    const baseStyles = "w-full bg-gray-100 border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md"
    
    switch (variant) {
      case 'top':
        return `${baseStyles} mb-8`
      case 'middle':
        return `${baseStyles} my-8`
      case 'bottom':
        return `${baseStyles} mt-8`
      default:
        return baseStyles
    }
  }

  return (
    <div className={`banner-ad-container ${getAdStyles()} ${className}`}>
      {/* Clickable Banner Ad */}
      <div className="relative w-full h-20 md:h-28 lg:h-32 overflow-hidden rounded-lg">
        {/* Ad Label */}
        <div className="absolute top-2 left-2 text-xs text-gray-500 font-medium bg-white px-2 py-1 rounded z-10">
          Advertisement
        </div>
        
        {/* Zephryx Banner Ad Image */}
        <a 
          href="https://www.zephryxlabs.com/aiassetaccelerator" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full h-full hover:opacity-90 transition-opacity duration-300"
        >
          <img 
            src="/zephryx_banner.PNG" 
            alt="Zephryx AI Asset Accelerator" 
            className="w-full h-full object-contain"
          />
        </a>
        
        {/* Hover Effect */}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-5 transition-all duration-300 rounded-lg pointer-events-none"></div>
      </div>
    </div>
  )
} 