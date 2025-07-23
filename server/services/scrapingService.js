const puppeteer = require('puppeteer');
const axios = require('axios');
const cheerio = require('cheerio');

class ScrapingService {
  constructor() {
    this.sources = [
      {
        name: 'TechCrunch AI',
        url: 'https://techcrunch.com/tag/artificial-intelligence/',
        selector: 'article h2 a',
        baseUrl: 'https://techcrunch.com'
      },
      {
        name: 'VentureBeat AI',
        url: 'https://venturebeat.com/category/ai/',
        selector: '.ArticleListing h3 a',
        baseUrl: 'https://venturebeat.com'
      },
      {
        name: 'MakeUseOf',
        url: 'https://www.makeuseof.com/tag/make-money-online/',
        selector: '.article-title a',
        baseUrl: 'https://www.makeuseof.com'
      },
      {
        name: 'Entrepreneur',
        url: 'https://www.entrepreneur.com/topic/artificial-intelligence',
        selector: '.card-title a',
        baseUrl: 'https://www.entrepreneur.com'
      },
      {
        name: 'Forbes AI',
        url: 'https://www.forbes.com/ai/',
        selector: '.stream-item__title a',
        baseUrl: 'https://www.forbes.com'
      }
    ];
  }

  async scrapeTrendingContent() {
    const allArticles = [];
    
    for (const source of this.sources) {
      try {
        console.log(`🔍 Scraping ${source.name}...`);
        const articles = await this.scrapeSource(source);
        allArticles.push(...articles);
        
        // Add delay to be respectful to servers
        await this.delay(2000);
      } catch (error) {
        console.error(`Error scraping ${source.name}:`, error.message);
      }
    }

    // Filter and rank articles
    const filteredArticles = this.filterAndRankArticles(allArticles);
    
    return filteredArticles.slice(0, 5); // Return top 5 articles
  }

  async scrapeSource(source) {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      const page = await browser.newPage();
      
      // Set user agent to avoid being blocked
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      
      await page.goto(source.url, { waitUntil: 'networkidle2', timeout: 30000 });
      
      const articles = await page.evaluate((selector, baseUrl) => {
        const links = Array.from(document.querySelectorAll(selector));
        return links.slice(0, 10).map(link => ({
          title: link.textContent.trim(),
          url: link.href.startsWith('http') ? link.href : `${baseUrl}${link.href}`,
          source: source.name
        }));
      }, source.selector, source.baseUrl);

      await browser.close();
      return articles;
    } catch (error) {
      console.error(`Error scraping ${source.name}:`, error);
      return [];
    }
  }

  async scrapeArticleContent(url) {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      
      const content = await page.evaluate(() => {
        // Remove unwanted elements
        const unwantedSelectors = [
          'nav', 'header', 'footer', '.sidebar', '.advertisement', 
          '.social-share', '.comments', '.related-posts', 'script', 'style'
        ];
        
        unwantedSelectors.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => el.remove());
        });

        // Try to find the main content
        const contentSelectors = [
          'article',
          '.post-content',
          '.article-content',
          '.entry-content',
          '.content',
          'main',
          '.post-body'
        ];

        let content = '';
        for (const selector of contentSelectors) {
          const element = document.querySelector(selector);
          if (element) {
            content = element.textContent.trim();
            break;
          }
        }

        // If no specific content found, get body text
        if (!content) {
          content = document.body.textContent.trim();
        }

        return content;
      });

      await browser.close();
      
      // Clean up the content
      return this.cleanContent(content);
    } catch (error) {
      console.error('Error scraping article content:', error);
      return null;
    }
  }

  cleanContent(content) {
    if (!content) return '';
    
    // Remove extra whitespace and normalize
    let cleaned = content
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, '\n')
      .trim();
    
    // Remove common unwanted text
    const unwantedPhrases = [
      'Subscribe to our newsletter',
      'Follow us on',
      'Share this article',
      'Related articles',
      'Read more',
      'Continue reading',
      'Advertisement',
      'Sponsored content'
    ];
    
    unwantedPhrases.forEach(phrase => {
      const regex = new RegExp(phrase, 'gi');
      cleaned = cleaned.replace(regex, '');
    });
    
    // Limit content length
    if (cleaned.length > 5000) {
      cleaned = cleaned.substring(0, 5000) + '...';
    }
    
    return cleaned;
  }

  filterAndRankArticles(articles) {
    // Filter out articles that are likely not relevant
    const relevantKeywords = [
      'ai', 'artificial intelligence', 'machine learning', 'chatgpt', 'gpt',
      'make money', 'passive income', 'online business', 'entrepreneur',
      'digital marketing', 'automation', 'productivity', 'startup',
      'fintech', 'cryptocurrency', 'blockchain', 'ecommerce'
    ];

    const filtered = articles.filter(article => {
      const title = article.title.toLowerCase();
      return relevantKeywords.some(keyword => title.includes(keyword));
    });

    // Remove duplicates based on title similarity
    const unique = this.removeDuplicates(filtered);

    // Sort by relevance (you could add more sophisticated ranking here)
    return unique.sort((a, b) => {
      const aScore = this.calculateRelevanceScore(a.title);
      const bScore = this.calculateRelevanceScore(b.title);
      return bScore - aScore;
    });
  }

  calculateRelevanceScore(title) {
    const titleLower = title.toLowerCase();
    let score = 0;
    
    // High relevance keywords
    const highValue = ['ai', 'artificial intelligence', 'make money', 'passive income'];
    highValue.forEach(keyword => {
      if (titleLower.includes(keyword)) score += 10;
    });
    
    // Medium relevance keywords
    const mediumValue = ['chatgpt', 'gpt', 'online business', 'entrepreneur'];
    mediumValue.forEach(keyword => {
      if (titleLower.includes(keyword)) score += 5;
    });
    
    // Low relevance keywords
    const lowValue = ['technology', 'digital', 'business', 'marketing'];
    lowValue.forEach(keyword => {
      if (titleLower.includes(keyword)) score += 2;
    });
    
    return score;
  }

  removeDuplicates(articles) {
    const seen = new Set();
    return articles.filter(article => {
      const title = article.title.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (seen.has(title)) {
        return false;
      }
      seen.add(title);
      return true;
    });
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Alternative method using RSS feeds (more reliable)
  async scrapeRSSFeeds() {
    const rssFeeds = [
      'https://techcrunch.com/feed/',
      'https://venturebeat.com/feed/',
      'https://www.makeuseof.com/feed/',
      'https://www.entrepreneur.com/feed/'
    ];

    const allArticles = [];

    for (const feedUrl of rssFeeds) {
      try {
        const response = await axios.get(feedUrl, { timeout: 10000 });
        const $ = cheerio.load(response.data, { xmlMode: true });
        
        $('item').each((i, elem) => {
          const title = $(elem).find('title').text();
          const link = $(elem).find('link').text();
          const description = $(elem).find('description').text();
          
          if (title && link) {
            allArticles.push({
              title,
              url: link,
              description,
              source: feedUrl
            });
          }
        });
      } catch (error) {
        console.error(`Error scraping RSS feed ${feedUrl}:`, error.message);
      }
    }

    return this.filterAndRankArticles(allArticles);
  }
}

module.exports = new ScrapingService(); 