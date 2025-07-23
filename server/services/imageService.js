const axios = require('axios');

class ImageService {
  constructor() {
    this.unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;
    this.baseUrl = 'https://api.unsplash.com';
  }

  async findImageForBlogPost(title, content, keywords = []) {
    try {
      if (!this.unsplashAccessKey) {
        console.warn('Unsplash API key not configured, using fallback image');
        return this.getFallbackImage();
      }

      // Generate search query from title, content, and keywords
      const searchQuery = this.generateSearchQuery(title, content, keywords);
      
      // Search for images on Unsplash
      const imageUrl = await this.searchUnsplashImage(searchQuery);
      
      if (imageUrl) {
        return imageUrl;
      }

      // Fallback to default business/technology image
      return this.getFallbackImage();
    } catch (error) {
      console.error('Error finding image for blog post:', error);
      return this.getFallbackImage();
    }
  }

  generateSearchQuery(title, content, keywords) {
    // Extract relevant terms from title and content
    const titleWords = title.toLowerCase().split(' ').filter(word => word.length > 3);
    const contentWords = content.toLowerCase().split(' ').filter(word => word.length > 3);
    
    // Combine with keywords and filter out common words
    const allWords = [...titleWords, ...contentWords, ...keywords];
    const commonWords = ['the', 'and', 'for', 'with', 'this', 'that', 'have', 'will', 'from', 'they', 'said', 'each', 'which', 'their', 'time', 'would', 'there', 'could', 'other', 'than', 'first', 'been', 'call', 'who', 'its', 'now', 'find', 'down', 'day', 'did', 'get', 'come', 'made', 'may', 'part'];
    
    const relevantWords = allWords.filter(word => 
      !commonWords.includes(word) && 
      word.length > 3 &&
      /^[a-zA-Z]+$/.test(word)
    );

    // Create search query with most relevant terms
    const searchTerms = relevantWords.slice(0, 3);
    
    // Add business/technology context if not present
    const businessTerms = ['business', 'technology', 'digital', 'modern', 'professional'];
    const hasBusinessContext = searchTerms.some(term => 
      businessTerms.some(businessTerm => term.includes(businessTerm))
    );

    if (!hasBusinessContext) {
      searchTerms.push('business');
    }

    return searchTerms.join(' ');
  }

  async searchUnsplashImage(query) {
    try {
      const response = await axios.get(`${this.baseUrl}/search/photos`, {
        headers: {
          'Authorization': `Client-ID ${this.unsplashAccessKey}`
        },
        params: {
          query: query,
          per_page: 1,
          orientation: 'landscape',
          content_filter: 'high'
        }
      });

      if (response.data.results && response.data.results.length > 0) {
        const image = response.data.results[0];
        return image.urls.regular; // Use regular size for good quality and reasonable file size
      }

      return null;
    } catch (error) {
      console.error('Error searching Unsplash:', error);
      return null;
    }
  }

  getFallbackImage() {
    // Return a reliable fallback image URL
    // Using a placeholder service that provides business/technology themed images
    const fallbackImages = [
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop'
    ];

    // Return a random fallback image
    return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
  }

  async getImageByCategory(category) {
    const categoryQueries = {
      'ai': 'artificial intelligence technology',
      'money-making': 'business success money',
      'entrepreneurship': 'entrepreneur business startup',
      'digital-marketing': 'digital marketing social media',
      'passive-income': 'passive income business',
      'online-business': 'online business digital',
      'tools': 'business tools technology'
    };

    const query = categoryQueries[category] || 'business technology';
    return await this.searchUnsplashImage(query);
  }

  async getImageByKeywords(keywords) {
    if (!keywords || keywords.length === 0) {
      return this.getFallbackImage();
    }

    // Use the first 2-3 keywords for search
    const searchQuery = keywords.slice(0, 3).join(' ');
    const imageUrl = await this.searchUnsplashImage(searchQuery);
    
    return imageUrl || this.getFallbackImage();
  }
}

module.exports = new ImageService(); 