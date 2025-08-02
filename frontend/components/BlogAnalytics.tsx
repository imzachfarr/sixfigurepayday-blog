'use client'

import { useEffect } from 'react'
import { trackBlogEngagement, trackZephryxLabsEngagement } from '../utils/analytics'

interface BlogAnalyticsProps {
  slug: string
  category: string
  tags: string[]
}

export default function BlogAnalytics({ slug, category, tags }: BlogAnalyticsProps) {
  useEffect(() => {
    trackBlogEngagement('view', slug, category);
    
    // Enhanced tracking for ZephryxLabs content
    if (category === 'zephryx-labs' || tags.some(tag => tag.toLowerCase().includes('zephryx'))) {
      trackZephryxLabsEngagement('view', slug);
    }
    
    // Enhanced tracking for money-making content
    if (category === 'money-making' || category === 'ai' || category === 'online-business') {
      trackBlogEngagement('view_money_making', slug, category);
    }
  }, [slug, category, tags]);

  return null; // This component doesn't render anything
} 