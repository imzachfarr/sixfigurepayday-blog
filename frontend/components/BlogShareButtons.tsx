'use client'

import { trackBlogEngagement } from '../utils/analytics'

interface BlogShareButtonsProps {
  title: string
  slug: string
  category: string
}

export default function BlogShareButtons({ title, slug, category }: BlogShareButtonsProps) {
  const handleShare = (platform: string) => {
    trackBlogEngagement('share', slug, category);
    
    const url = window.location.href;
    const text = encodeURIComponent(title);
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

  return (
    <div className="mt-8 pt-8 border-t border-gray-200">
      <h3 className="text-lg font-bold text-black font-serif mb-4">Share this article:</h3>
      <div className="flex space-x-4">
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
          onClick={() => handleShare('twitter')}
        >
          Twitter
        </button>
        <button 
          className="bg-blue-800 text-white px-4 py-2 rounded text-sm hover:bg-blue-900 transition-colors"
          onClick={() => handleShare('facebook')}
        >
          Facebook
        </button>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600 transition-colors"
          onClick={() => handleShare('linkedin')}
        >
          LinkedIn
        </button>
      </div>
    </div>
  );
} 