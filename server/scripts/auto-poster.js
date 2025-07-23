require('dotenv').config();
const BlogPost = require('../models/BlogPost');
const { supabase } = require('../config/database');

// Configuration
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

if (!OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY is required in your .env file');
  process.exit(1);
}

if (!UNSPLASH_ACCESS_KEY) {
  console.error('❌ UNSPLASH_ACCESS_KEY is required in your .env file');
  process.exit(1);
}

// News sources for trending AI topics
const NEWS_SOURCES = [
  'https://newsapi.org/v2/everything?q=artificial+intelligence&sortBy=popularity&apiKey=',
  'https://newsapi.org/v2/everything?q=AI+technology&sortBy=popularity&apiKey=',
  'https://newsapi.org/v2/everything?q=machine+learning&sortBy=popularity&apiKey=',
  'https://newsapi.org/v2/everything?q=ChatGPT&sortBy=popularity&apiKey=',
  'https://newsapi.org/v2/everything?q=OpenAI&sortBy=popularity&apiKey=',
  'https://newsapi.org/v2/everything?q=AI+business&sortBy=popularity&apiKey='
];

// Categories for AI news
const CATEGORIES = ['ai', 'entrepreneurship', 'tools', 'digital-marketing', 'online-business'];

// Trending topics to focus on
const TRENDING_TOPICS = [
  'AI agents', 'ChatGPT', 'OpenAI', 'Google AI', 'Microsoft AI', 'Meta AI',
  'AI automation', 'AI tools', 'machine learning', 'deep learning',
  'AI business', 'AI startup', 'AI investment', 'AI regulation',
  'AI ethics', 'AI safety', 'AI development', 'AI research'
];

async function fetchTrendingNews() {
  try {
    console.log('📰 Fetching trending AI news...');
    
    const NEWS_API_KEY = process.env.NEWS_API_KEY;
    if (!NEWS_API_KEY) {
      console.log('⚠️  NEWS_API_KEY not set, using mock trending topics');
      return getMockTrendingTopics();
    }

    const allNews = [];
    
    for (const source of NEWS_SOURCES) {
      try {
        const response = await fetch(source + NEWS_API_KEY);
        const data = await response.json();
        
        if (data.articles) {
          allNews.push(...data.articles);
        }
        
        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Error fetching from ${source}:`, error.message);
      }
    }

    // Filter and rank news by relevance
    const relevantNews = allNews
      .filter(article => {
        const title = (article.title || '').toLowerCase();
        const description = (article.description || '').toLowerCase();
        const content = (article.content || '').toLowerCase();
        
        return TRENDING_TOPICS.some(topic => 
          title.includes(topic.toLowerCase()) ||
          description.includes(topic.toLowerCase()) ||
          content.includes(topic.toLowerCase())
        );
      })
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, 10);

    console.log(`✅ Found ${relevantNews.length} relevant trending articles`);
    return relevantNews;
  } catch (error) {
    console.error('Error fetching trending news:', error);
    return getMockTrendingTopics();
  }
}

function getMockTrendingTopics() {
  // Fallback trending topics when news API is not available
  return [
    {
      title: 'OpenAI Releases GPT-5 with Revolutionary Capabilities',
      description: 'Latest AI model shows unprecedented reasoning and creativity',
      url: 'https://example.com/gpt5-release',
      publishedAt: new Date().toISOString()
    },
    {
      title: 'Google Launches New AI Agent for Business Automation',
      description: 'Enterprise-focused AI solution promises 10x productivity gains',
      url: 'https://example.com/google-ai-agent',
      publishedAt: new Date().toISOString()
    },
    {
      title: 'AI Startup Raises $50M for Revolutionary Content Creation Tool',
      description: 'New platform uses AI to generate viral social media content',
      url: 'https://example.com/ai-startup-funding',
      publishedAt: new Date().toISOString()
    }
  ];
}

async function generateBlogPost(trendingTopic) {
  try {
    console.log(`🤖 Generating blog post for: "${trendingTopic.title}"`);
    
    const prompt = `
Create a compelling blog post about this trending AI topic: "${trendingTopic.title}"

Requirements:
- Title: Create an engaging, click-worthy title (max 60 characters)
- Excerpt: Write a compelling 2-3 sentence excerpt (max 300 characters)
- Content: Write a comprehensive blog post (800-1200 words) with:
  * Engaging introduction
  * 3-4 main sections with subheadings
  * Practical insights and actionable tips
  * Conclusion with call-to-action
- Category: Choose from: ai, entrepreneurship, tools, digital-marketing, online-business
- Tags: 5-8 relevant tags
- Read time: Estimate reading time (3-8 minutes)

Format the response as JSON:
{
  "title": "Title here",
  "excerpt": "Excerpt here",
  "content": "Full content with HTML tags",
  "category": "category",
  "tags": ["tag1", "tag2", "tag3"],
  "read_time": 5
}

Make it engaging, informative, and optimized for SEO. Focus on how this AI development impacts entrepreneurs and online business owners.
`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert AI and business writer who creates engaging, informative blog posts for entrepreneurs and online business owners.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse JSON response
    let blogData;
    try {
      blogData = JSON.parse(content);
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      // Fallback: create structured content from raw response
      blogData = createFallbackBlogData(trendingTopic, content);
    }

    return blogData;
  } catch (error) {
    console.error('Error generating blog post:', error);
    return createFallbackBlogData(trendingTopic);
  }
}

function createFallbackBlogData(trendingTopic, content = null) {
  const title = `Breaking: ${trendingTopic.title}`;
  const excerpt = trendingTopic.description || 'Latest developments in AI technology and their impact on business.';
  
  return {
    title: title.substring(0, 60),
    excerpt: excerpt.substring(0, 300),
    content: content || `
      <h2>${trendingTopic.title}</h2>
      <p>${trendingTopic.description}</p>
      <h3>What This Means for Entrepreneurs</h3>
      <p>This latest development in AI technology represents a significant opportunity for forward-thinking entrepreneurs and online business owners.</p>
      <h3>Key Takeaways</h3>
      <ul>
        <li>Stay ahead of the curve by understanding emerging AI trends</li>
        <li>Identify opportunities to integrate AI into your business model</li>
        <li>Prepare for the future of work and automation</li>
      </ul>
      <h3>Action Steps</h3>
      <p>To capitalize on this trend, consider how AI can enhance your current business processes and explore new opportunities in the AI space.</p>
    `,
    category: 'ai',
    tags: ['AI', 'technology', 'trending', 'business', 'innovation'],
    read_time: 5
  };
}

async function getUnsplashImage(category, title) {
  try {
    const keywords = {
      'ai': ['artificial intelligence', 'technology', 'digital', 'futuristic'],
      'entrepreneurship': ['business', 'entrepreneur', 'startup', 'office'],
      'online-business': ['online business', 'digital business', 'ecommerce'],
      'digital-marketing': ['digital marketing', 'social media', 'advertising'],
      'tools': ['tools', 'software', 'technology', 'productivity']
    };
    
    const searchQuery = `${title.split(' ').slice(0, 3).join(' ')} ${keywords[category]?.[0] || 'business'}`;
    
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchQuery)}&orientation=landscape&per_page=1`, {
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
}

async function createAndPublishPost(blogData, trendingTopic) {
  try {
    console.log(`📝 Creating blog post: "${blogData.title}"`);
    
    // Get image for the post
    const imageUrl = await getUnsplashImage(blogData.category, blogData.title);
    
    // Create the blog post
    const postData = {
      title: blogData.title,
      excerpt: blogData.excerpt,
      content: blogData.content,
      category: blogData.category,
      tags: blogData.tags,
      read_time: blogData.read_time,
      image_url: imageUrl,
      seo_title: blogData.title,
      seo_description: blogData.excerpt,
      is_published: true,
      ai_generated: true,
      source_title: trendingTopic.title,
      source_url: trendingTopic.url,
      published_at: new Date().toISOString()
    };

    const post = await BlogPost.create(postData);
    
    console.log(`✅ Published: "${post.title}"`);
    console.log(`   📸 Image: ${imageUrl ? 'Added' : 'None'}`);
    console.log(`   📊 Category: ${post.category}`);
    console.log(`   🏷️  Tags: ${post.tags.join(', ')}`);
    
    return post;
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
}

async function checkForDuplicatePosts(title) {
  try {
    const posts = await BlogPost.find({}, 0, 50);
    const normalizedTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    return posts.some(post => {
      const normalizedPostTitle = post.title.toLowerCase().replace(/[^a-z0-9]/g, '');
      return normalizedPostTitle.includes(normalizedTitle) || normalizedTitle.includes(normalizedPostTitle);
    });
  } catch (error) {
    console.error('Error checking for duplicates:', error);
    return false;
  }
}

async function runAutoPoster() {
  try {
    console.log('🚀 Starting Auto-Poster System...');
    console.log('📅 Current time:', new Date().toLocaleString());
    
    // Fetch trending news
    const trendingNews = await fetchTrendingNews();
    
    if (trendingNews.length === 0) {
      console.log('❌ No trending news found');
      return;
    }
    
    let publishedCount = 0;
    const maxPosts = 3; // Limit to 3 posts per run
    
    for (const news of trendingNews.slice(0, maxPosts)) {
      try {
        // Check for duplicates
        const isDuplicate = await checkForDuplicatePosts(news.title);
        if (isDuplicate) {
          console.log(`⏭️  Skipping duplicate: "${news.title}"`);
          continue;
        }
        
        // Generate blog post
        const blogData = await generateBlogPost(news);
        
        // Create and publish
        await createAndPublishPost(blogData, news);
        publishedCount++;
        
        // Rate limiting between posts
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } catch (error) {
        console.error(`❌ Error processing "${news.title}":`, error.message);
      }
    }
    
    console.log(`\n🎉 Auto-poster completed!`);
    console.log(`✅ Published: ${publishedCount} new blog posts`);
    console.log(`📊 Total posts in database: ${await BlogPost.countDocuments()}`);
    
  } catch (error) {
    console.error('❌ Auto-poster failed:', error);
  }
}

// Run the auto-poster
if (require.main === module) {
  runAutoPoster().then(() => {
    console.log('🏁 Auto-poster finished');
    process.exit(0);
  }).catch((error) => {
    console.error('💥 Auto-poster failed:', error);
    process.exit(1);
  });
}

module.exports = { runAutoPoster }; 