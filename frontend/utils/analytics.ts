// Analytics utility for enhanced tracking
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-7L38DE9WV0', {
      page_path: url,
      page_title: title,
      stream_id: '11701334391',
      custom_map: {
        'custom_parameter_1': 'zephryx_labs_content',
        'custom_parameter_2': 'money_making_content'
      }
    });
  }
};

// ZephryxLabs specific tracking
export const trackZephryxLabsEngagement = (action: string, postSlug?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: 'ZephryxLabs',
      event_label: postSlug,
      custom_parameter_1: 'zephryx_labs_content',
      stream_id: '11701334391',
      content_type: 'zephryx_labs_review',
      content_slug: postSlug
    });
  }
};

// Money making content tracking
export const trackMoneyMakingEngagement = (action: string, category: string, postSlug?: string) => {
  trackEvent(action, 'Money Making', `${category} - ${postSlug || 'general'}`);
};

// Blog post engagement tracking
export const trackBlogEngagement = (action: string, postSlug: string, category: string) => {
  trackEvent(action, 'Blog Post', `${category} - ${postSlug}`);
};

// Newsletter signup tracking
export const trackNewsletterSignup = (source: string) => {
  trackEvent('newsletter_signup', 'Conversion', source);
};

// Social share tracking
export const trackSocialShare = (platform: string, postSlug: string) => {
  trackEvent('share', 'Social Media', `${platform} - ${postSlug}`);
};

// Search tracking
export const trackSearch = (query: string, results: number) => {
  trackEvent('search', 'Site Search', query, results);
};

// Category page tracking
export const trackCategoryView = (category: string) => {
  trackEvent('view_category', 'Navigation', category);
};

// Related post click tracking
export const trackRelatedPostClick = (fromPost: string, toPost: string) => {
  trackEvent('click_related_post', 'Internal Link', `${fromPost} -> ${toPost}`);
}; 