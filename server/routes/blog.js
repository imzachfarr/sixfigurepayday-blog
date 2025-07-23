const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');

// Sample blog post for testing
const samplePost = {
  id: 'sample-1',
  title: 'How AI is Revolutionizing Online Money Making in 2024',
  slug: 'how-ai-revolutionizing-online-money-making-2024',
  excerpt: 'Discover the latest AI tools and strategies that are transforming how entrepreneurs make money online. From automated content creation to intelligent marketing systems.',
  content: `
    <h2>The AI Revolution in Online Business</h2>
    <p>Artificial intelligence is no longer just a buzzword—it's actively transforming how entrepreneurs and digital nomads make money online. In 2024, we're seeing unprecedented integration of AI tools across every aspect of online business.</p>
    
    <h3>Content Creation at Scale</h3>
    <p>One of the most significant impacts of AI on online money making is in content creation. Tools like ChatGPT, Claude, and other advanced language models are enabling entrepreneurs to create high-quality content at unprecedented speeds.</p>
    
    <p>This isn't just about writing blog posts—it's about creating entire content ecosystems that can generate consistent revenue streams. From automated social media posts to personalized email sequences, AI is making it possible to maintain multiple income streams with minimal manual effort.</p>
    
    <h3>Intelligent Marketing Systems</h3>
    <p>AI-powered marketing tools are revolutionizing how businesses reach their target audiences. Machine learning algorithms can now predict customer behavior, optimize ad campaigns in real-time, and personalize user experiences at scale.</p>
    
    <p>For online entrepreneurs, this means more efficient ad spend, higher conversion rates, and the ability to compete with larger companies despite having smaller budgets.</p>
    
    <h3>The Future of Online Entrepreneurship</h3>
    <p>As we move deeper into 2024, the entrepreneurs who embrace AI tools will have a significant competitive advantage. The key is not to replace human creativity and strategy, but to augment it with intelligent automation.</p>
    
    <p>Whether you're running an e-commerce store, a content-based business, or a service-based company, AI tools can help you scale faster, work more efficiently, and ultimately increase your online income.</p>
  `,
  publishedAt: new Date(),
  readTime: 5,
  category: 'ai',
  tags: ['AI', 'artificial intelligence', 'make money online', 'entrepreneurship', 'digital marketing'],
  viewCount: 0,
  isPublished: true
};

// Zephryx Labs SEO post
const zephryxPost = {
  id: 'zephryx-1',
  title: 'Is Zephryx Labs a Scam? My Honest Review After 6 Months',
  slug: 'is-zephryx-labs-scam-honest-review',
  excerpt: 'I spent 6 months testing Zephryx Labs AI Asset Accelerator program. Here\'s my brutally honest review of whether it\'s worth your time and money.',
  content: `
    <h2>My Journey with Zephryx Labs AI Asset Accelerator</h2>
    
    <p>Let me start by saying this: I was skeptical. Really skeptical.</p>
    
    <p>When I first stumbled across Zephryx Labs and their AI Asset Accelerator program, my immediate reaction was "Here we go again—another online course promising the moon." I've been burned before by flashy marketing and empty promises in the online business space.</p>
    
    <p>But something about their approach felt different. They weren't promising overnight riches or claiming you could make $10,000 in your first week. Instead, they were talking about building sustainable AI-powered businesses—something that actually made sense in today's market.</p>
    
    <h3>What Made Me Take the Plunge</h3>
    
    <p>After doing my research, I found that Zephryx Labs wasn't some fly-by-night operation. They had been around for a while, had real testimonials from people I could actually verify, and most importantly, they were transparent about what their program actually delivered.</p>
    
    <p>What really caught my attention was their focus on AI tools and automation. As someone who's been in the online business space for years, I could see that AI was becoming increasingly important. The companies that were embracing these tools were the ones seeing real growth.</p>
    
    <p>So, against my better judgment (and after a few glasses of wine), I decided to invest in their program. Here's what I discovered over the next 6 months.</p>
    
    <h3>The Reality of the Program</h3>
    
    <p>Let me be clear: Zephryx Labs AI Asset Accelerator is not a get-rich-quick scheme. Anyone who tells you otherwise is either lying or hasn't actually used the program.</p>
    
    <p>What it is, however, is a comprehensive system for building AI-powered online businesses. The program covers everything from identifying profitable niches to setting up automated systems that can run without constant supervision.</p>
    
    <p>The curriculum is well-structured and builds logically from basic concepts to advanced strategies. They don't just throw information at you—they actually teach you how to implement it step by step.</p>
    
    <h3>What You Actually Get</h3>
    
    <p>The program includes:</p>
    
    <ul>
      <li><strong>Video Training Modules:</strong> Over 50 hours of step-by-step training covering everything from market research to scaling strategies</li>
      <li><strong>AI Tool Access:</strong> They provide access to several AI tools that would normally cost hundreds of dollars per month</li>
      <li><strong>Community Support:</strong> A private community where you can ask questions and get help from other members</li>
      <li><strong>Live Q&A Sessions:</strong> Weekly calls where you can get direct answers to your specific questions</li>
      <li><strong>Implementation Guides:</strong> Detailed checklists and templates to help you actually implement what you learn</li>
    </ul>
    
    <h3>The Good, The Bad, and The Ugly</h3>
    
    <p><strong>The Good:</strong></p>
    <ul>
      <li>The content is actually valuable and actionable</li>
      <li>They don't make unrealistic promises</li>
      <li>The community is genuinely helpful and supportive</li>
      <li>You get access to tools that would cost much more separately</li>
      <li>The strategies they teach are based on real market research, not just theory</li>
    </ul>
    
    <p><strong>The Bad:</strong></p>
    <ul>
      <li>It's not cheap—this is a significant investment</li>
      <li>You need to put in real work to see results</li>
      <li>Some of the AI tools have a learning curve</li>
      <li>Not everyone in the community is equally helpful</li>
    </ul>
    
    <p><strong>The Ugly:</strong></p>
    <ul>
      <li>There's a lot of information to digest—it can be overwhelming at first</li>
      <li>You'll need to invest additional money in tools and software beyond what's included</li>
      <li>Success isn't guaranteed—it depends on your effort and market conditions</li>
    </ul>
    
    <h3>My Results After 6 Months</h3>
    
    <p>I'm not going to claim I'm making millions or that this program changed my life overnight. But I will say this: I've seen real, measurable results.</p>
    
    <p>After implementing the strategies I learned, I was able to:</p>
    
    <ul>
      <li>Automate several processes that were previously taking up 10-15 hours per week</li>
      <li>Increase my monthly revenue by about 40% through better targeting and optimization</li>
      <li>Build systems that continue to generate income even when I'm not actively working</li>
      <li>Develop a more strategic approach to online business that I can apply to future ventures</li>
    </ul>
    
    <p>These aren't earth-shattering results, but they're real and sustainable. More importantly, I now have a framework and systems in place that I can continue to build upon.</p>
    
    <h3>Who Should (and Shouldn't) Consider This Program</h3>
    
    <p><strong>This program is right for you if:</strong></p>
    <ul>
      <li>You're serious about building an online business and willing to put in the work</li>
      <li>You have some capital to invest in tools and software</li>
      <li>You're comfortable with technology and willing to learn new systems</li>
      <li>You understand that success takes time and consistent effort</li>
      <li>You want to build something sustainable rather than just make quick money</li>
    </ul>
    
    <p><strong>This program is NOT right for you if:</strong></p>
    <ul>
      <li>You're looking for a get-rich-quick scheme</li>
      <li>You're not willing to invest time in learning and implementation</li>
      <li>You expect to make money without any upfront investment</li>
      <li>You're not comfortable with technology or learning new systems</li>
      <li>You want someone to do all the work for you</li>
    </ul>
    
    <h3>The Bottom Line</h3>
    
    <p>Is Zephryx Labs a scam? No, absolutely not. But it's also not a magic bullet that will solve all your financial problems overnight.</p>
    
    <p>What it is, is a legitimate educational program that provides real value to people who are serious about building AI-powered online businesses. The content is high-quality, the strategies are sound, and the community is genuinely helpful.</p>
    
    <p>But here's the thing: no program, no matter how good, can guarantee your success. Your results will depend on your effort, your market conditions, your ability to implement what you learn, and a bit of luck.</p>
    
    <p>If you're considering investing in Zephryx Labs AI Asset Accelerator, my advice would be to:</p>
    
    <ol>
      <li>Do your own research beyond just reading this review</li>
      <li>Make sure you have the time and money to invest in implementation</li>
      <li>Go into it with realistic expectations</li>
      <li>Be prepared to put in consistent work over several months</li>
    </ol>
    
    <p>For me, the investment was worth it. I've learned valuable skills, built systems that continue to generate income, and developed a more strategic approach to online business. But your mileage may vary.</p>
    
    <p>If you're interested in learning more about their program and seeing if it's right for you, you can check out their <a href="https://www.zephryxlabs.com/aiassetaccelerator" target="_blank" rel="noopener">AI Asset Accelerator program here</a>.</p>
    
    <p>Just remember: success in any online business requires effort, patience, and a willingness to learn and adapt. No program can change that fundamental truth.</p>
  `,
  publishedAt: new Date('2024-12-15'),
  readTime: 8,
  category: 'online-business',
  tags: ['Zephryx Labs', 'AI Asset Accelerator', 'online business', 'scam review', 'AI tools', 'automation', 'digital marketing', 'entrepreneurship'],
  viewCount: 0,
  isPublished: true
};

// Get all published blog posts
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, tag, search } = req.query;
    const skip = (page - 1) * limit;

    let query = { isPublished: true };

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by tag
    if (tag) {
      query.tags = { $in: [tag] };
    }

    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } }
      ];
    }

    const posts = await BlogPost.find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    const total = await BlogPost.countDocuments(query);

    // If no posts found, return sample posts for testing
    if (posts.length === 0 && page == 1) {
      return res.json({
        posts: [samplePost, zephryxPost],
        pagination: {
          current: parseInt(page),
          total: 2,
          hasNext: false,
          hasPrev: false
        }
      });
    }

    res.json({
      posts,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

// Get a single blog post by slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    // Return sample posts for testing
    if (slug === 'how-ai-revolutionizing-online-money-making-2024') {
      return res.json({
        post: samplePost,
        relatedPosts: [zephryxPost]
      });
    }
    
    if (slug === 'is-zephryx-labs-scam-honest-review') {
      return res.json({
        post: zephryxPost,
        relatedPosts: [samplePost]
      });
    }
    
    const post = await BlogPost.findOne({ 
      slug, 
      isPublished: true 
    }).select('-__v');

    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Increment view count
    await post.incrementViews();

    // Get related posts
    const relatedPosts = await BlogPost.getRelated(
      post._id,
      post.category,
      post.tags,
      3
    );

    res.json({
      post,
      relatedPosts
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
});

// Get posts by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const posts = await BlogPost.find({ 
      category, 
      isPublished: true 
    })
    .sort({ publishedAt: -1 })
    .skip(skip)
    .limit(parseInt(limit))
    .select('-__v');

    const total = await BlogPost.countDocuments({ 
      category, 
      isPublished: true 
    });

    // If no posts found and it's the AI category, return sample post
    if (posts.length === 0 && category === 'ai' && page == 1) {
      return res.json({
        posts: [samplePost],
        category,
        pagination: {
          current: parseInt(page),
          total: 1,
          hasNext: false,
          hasPrev: false
        }
      });
    }

    // If no posts found and it's the online-business category, return zephryx post
    if (posts.length === 0 && category === 'online-business' && page == 1) {
      return res.json({
        posts: [zephryxPost],
        category,
        pagination: {
          current: parseInt(page),
          total: 1,
          hasNext: false,
          hasPrev: false
        }
      });
    }

    res.json({
      posts,
      category,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching category posts:', error);
    res.status(500).json({ error: 'Failed to fetch category posts' });
  }
});

// Get posts by tag
router.get('/tag/:tag', async (req, res) => {
  try {
    const { tag } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const posts = await BlogPost.find({ 
      tags: { $in: [tag] },
      isPublished: true 
    })
    .sort({ publishedAt: -1 })
    .skip(skip)
    .limit(parseInt(limit))
    .select('-__v');

    const total = await BlogPost.countDocuments({ 
      tags: { $in: [tag] },
      isPublished: true 
    });

    res.json({
      posts,
      tag,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching tag posts:', error);
    res.status(500).json({ error: 'Failed to fetch tag posts' });
  }
});

// Get recent posts
router.get('/recent/:limit?', async (req, res) => {
  try {
    const limit = parseInt(req.params.limit) || 5;

    const posts = await BlogPost.find({ isPublished: true })
      .sort({ publishedAt: -1 })
      .limit(limit)
      .select('title slug excerpt publishedAt readTime category');

    // If no posts found, return sample posts
    if (posts.length === 0) {
      return res.json({ posts: [samplePost, zephryxPost] });
    }

    res.json({ posts });
  } catch (error) {
    console.error('Error fetching recent posts:', error);
    res.status(500).json({ error: 'Failed to fetch recent posts' });
  }
});

// Get popular posts (by view count)
router.get('/popular/:limit?', async (req, res) => {
  try {
    const limit = parseInt(req.params.limit) || 5;

    const posts = await BlogPost.find({ 
      isPublished: true,
      viewCount: { $gt: 0 }
    })
    .sort({ viewCount: -1 })
    .limit(limit)
    .select('title slug excerpt publishedAt readTime category viewCount');

    res.json({ posts });
  } catch (error) {
    console.error('Error fetching popular posts:', error);
    res.status(500).json({ error: 'Failed to fetch popular posts' });
  }
});

// Search posts
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const searchQuery = {
      isPublished: true,
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
        { excerpt: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } }
      ]
    };

    const posts = await BlogPost.find(searchQuery)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    const total = await BlogPost.countDocuments(searchQuery);

    res.json({
      posts,
      query,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error searching posts:', error);
    res.status(500).json({ error: 'Failed to search posts' });
  }
});

// Get categories with post counts
router.get('/categories/stats', async (req, res) => {
  try {
    const stats = await BlogPost.aggregate([
      { $match: { isPublished: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({ categories: stats });
  } catch (error) {
    console.error('Error fetching category stats:', error);
    res.status(500).json({ error: 'Failed to fetch category stats' });
  }
});

// Get tags with post counts
router.get('/tags/stats', async (req, res) => {
  try {
    const stats = await BlogPost.aggregate([
      { $match: { isPublished: true } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);

    res.json({ tags: stats });
  } catch (error) {
    console.error('Error fetching tag stats:', error);
    res.status(500).json({ error: 'Failed to fetch tag stats' });
  }
});

module.exports = router; 