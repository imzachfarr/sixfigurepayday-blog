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

// New Zephryx Labs Legit Review post
const zephryxLegitPost = {
  id: 'zephryx-legit-1',
  title: 'Is Zephryx Labs Legit? An Honest Look at 2025\'s Most Talked-About AI Opportunity',
  slug: 'is-zephryx-labs-legit-honest-look-2025',
  excerpt: 'Discover if Zephryx Labs is legit or a scam. Our comprehensive 2025 review covers the AI business opportunity, founders Zach Farr and Ethan, and real user testimonials.',
  content: `
    <h2>What Exactly is Zephryx Labs?</h2>
    
    <p>Zephryx Labs is gaining rapid traction as one of the most promising AI business opportunities of 2025. Primarily targeted toward creators, entrepreneurs, and non-technical founders, Zephryx Labs offers an innovative pathway to launching fully functional AI software businesses without requiring technical expertise.</p>
    
    <p>If you've scrolled through social media recently, you might have noticed creators showcasing new AI-powered apps generating significant passive income. Behind many of these successful launches is Zephryx Labs. Unlike typical AI courses flooding the market, Zephryx provides users with a complete, custom-built AI solution along with comprehensive marketing strategies.</p>
    
    <h2>Is Zephryx Labs a Scam or the Real Deal?</h2>
    
    <p>Given the abundance of online gurus and questionable offers, skepticism is natural. But here's the truth about Zephryx Labs:</p>
    
    <ul>
      <li><strong>Done-for-You Model:</strong> Zephryx Labs builds and delivers your entire AI software, fully customized and ready to launch.</li>
      <li><strong>Complete Ownership:</strong> You retain 100% control over branding, intellectual property, and revenues generated by your AI app.</li>
      <li><strong>Full Marketing Support:</strong> Ongoing live support, tactical marketing training, and funnel setups ensure you're not left navigating the market alone.</li>
      <li><strong>Transparent Business Model:</strong> Zephryx Labs clearly defines the process without hidden fees or profit-sharing schemes.</li>
    </ul>
    
    <p>Unlike typical low-cost, low-value courses, Zephryx Labs positions itself as a premium offer—appealing specifically to serious entrepreneurs ready to build tangible assets.</p>
    
    <h2>The Entrepreneurs Behind Zephryx Labs</h2>
    
    <p>Zephryx Labs is driven by founders Zach Farr and Ethan, seasoned entrepreneurs and cousins with a history of launching successful ventures. This isn't their first rodeo; they've navigated multiple business cycles, from initial failures to substantial successes, building trust and expertise along the way.</p>
    
    <p>Zach brings extensive expertise in AI development, system architecture, automation, and sales strategy. Ethan complements this with powerful marketing strategies, driving aggressive growth campaigns that consistently deliver measurable results. Together, their combined skills ensure Zephryx Labs stands out as more than just another online business opportunity.</p>
    
    <h2>What Does Zephryx Labs Actually Deliver?</h2>
    
    <p>Zephryx Labs isn't just a course—it's a complete business-in-a-box solution. Here's exactly what you'll receive:</p>
    
    <ul>
      <li><strong>Custom AI App Development:</strong> A fully tailored AI software built around your unique niche, audience, and goals.</li>
      <li><strong>Professional Branding and Funnels:</strong> Market-ready branding materials, landing pages, conversion scripts, and strategic funnels.</li>
      <li><strong>Marketing and Growth Training:</strong> Step-by-step, tactical training designed for both organic and paid strategies, accessible even for complete marketing beginners.</li>
      <li><strong>Weekly Expert Support Calls:</strong> Continuous access to live support and strategy calls, ensuring your AI business grows and adapts effectively.</li>
      <li><strong>Complete Ownership and Control:</strong> No hidden costs or revenue shares; this is entirely your business from day one.</li>
    </ul>
    
    <h2>Why Choose Zephryx Labs Over Dropshipping, Amazon FBA, or Agencies?</h2>
    
    <p>Traditional online business models like dropshipping and Amazon FBA are increasingly saturated and often offer limited long-term sustainability. Agencies face continuous client turnover and high competition.</p>
    
    <p>Zephryx Labs differentiates itself by:</p>
    
    <ul>
      <li><strong>Creating Genuine Assets:</strong> An AI SaaS product is a long-term asset, scalable and potentially sellable.</li>
      <li><strong>Recurring Revenue Streams:</strong> Subscription-based SaaS models deliver steady, predictable income.</li>
      <li><strong>High Barrier to Entry:</strong> AI apps are technically complex, naturally limiting competition and enhancing profitability.</li>
    </ul>
    
    <p>For those seeking sustainability, equity growth, and recurring revenue, Zephryx Labs provides a compelling alternative.</p>
    
    <h2>What Are Users Actually Saying?</h2>
    
    <p>Feedback from Zephryx Labs users consistently highlights its effectiveness and authenticity:</p>
    
    <blockquote>
      <p>"Zephryx Labs developed my AI financial coaching app in under three weeks. Within the first month, I had dozens of paying customers—it's genuinely transformative."</p>
      <cite>– Nick T.</cite>
    </blockquote>
    
    <blockquote>
      <p>"Initially, I hesitated about the investment, but my AI-powered niche app took off almost immediately. I recouped my investment quickly and now have predictable monthly income."</p>
      <cite>– Avery G.</cite>
    </blockquote>
    
    <blockquote>
      <p>"The value Zephryx Labs delivers isn't just an app; it's the entire business structure and support. It's like owning a franchise in the AI space."</p>
      <cite>– Kayla R.</cite>
    </blockquote>
    
    <h2>Can Zephryx Labs Actually Make You Money?</h2>
    
    <p>Realistically, success with Zephryx Labs depends on your commitment. The infrastructure and strategy are fully provided, but it's ultimately your responsibility to drive the growth and scale your AI business.</p>
    
    <p>If you:</p>
    
    <ul>
      <li>Have or are building a dedicated audience,</li>
      <li>Desire full product ownership rather than managing ongoing client work,</li>
      <li>Want sustainable business growth over quick fixes,</li>
    </ul>
    
    <p>Then Zephryx Labs could realistically help you scale from $5,000 to potentially over $50,000 monthly. The company provides frequent real-world success stories, proving its effectiveness.</p>
    
    <h2>Final Verdict: Is Zephryx Labs Legit?</h2>
    
    <p>The straightforward answer: <strong>Yes, Zephryx Labs is absolutely legit.</strong></p>
    
    <p>It's not a magic ticket to instant riches, nor is it another forgettable digital course. Instead, it's a highly structured, comprehensive platform specifically crafted to help ambitious entrepreneurs enter the lucrative AI market—without the typical technical barriers.</p>
    
    <p>For individuals ready to move beyond oversaturated business models and create a meaningful, scalable, and equity-building asset, Zephryx Labs offers a solid path.</p>
    
    <p>To explore Zephryx Labs further, visit their <a href="https://www.zephryxlabs.com" target="_blank" rel="noopener">official website</a> or check out their targeted AI business accelerator program, the <a href="https://www.zephryxlabs.com/aiassetaccelerator" target="_blank" rel="noopener">AI Asset Accelerator</a>.</p>
  `,
  publishedAt: new Date('2025-01-15'),
  readTime: 12,
  category: 'ai-business',
  tags: ['Zephryx Labs review', 'is Zephryx Labs legit', 'Zephryx Labs scam', 'AI business opportunity 2025', 'start your own AI software business', 'AI app builder', 'how to make money with AI', 'done-for-you AI SaaS', 'Zephryx Labs real reviews', 'Zephryx Labs success', 'passive income with AI apps', 'Zephryx founder Zach Farr', 'Zephryx Labs Ethan CMO', 'best AI business model 2025', 'DFY AI app business'],
  viewCount: 0,
  isPublished: true
};

// Apple AI Strategy 2025 post
const appleAIStrategyPost = {
  id: 'apple-ai-strategy-1',
  title: 'Apple AI Strategy 2025: Tim Cook Reveals Massive AI Investment Plans',
  slug: 'apple-ai-strategy-2025-earnings-call',
  excerpt: 'Apple CEO Tim Cook announces major AI investments and strategy shift in Q3 2025 earnings call. Discover how Apple plans to catch up in the AI race with new acquisitions and features.',
  content: `
    <h2>Apple's AI Strategy: A Fundamental Shift in 2025</h2>
    
    <p>"We see AI as one of the most profound technologies of our lifetime. We are embedding it across our devices and platforms and across the company. We are also significantly growing our investments," CEO Tim Cook said on the Q3 2025 earnings call with investors.</p>
    
    <p>"Apple has always been about taking the most advanced technologies and making them easy to use and accessible for everyone, and that's at the heart of our AI strategy," he added.</p>
    
    <h2>Major AI Investment and Resource Reallocation</h2>
    
    <p>Cook expanded on those comments on the call, noting that Apple was "reallocating a fair number of people" to focus on AI development and implementation across all product lines.</p>
    
    <p>"We have a great, great team and we're putting all of our energy behind it," he added, signaling a company-wide commitment to AI innovation that could reshape Apple's competitive position in the technology landscape.</p>
    
    <h2>Apple's AI Investment Strategy: CapEx and Acquisitions</h2>
    
    <p>AI investments are also driving increased CapEx spending, which was up year-to-date, the company said. However, Apple pointed out that it still employed a hybrid model where it relies on third parties to make capital investments, which is why the figure won't grow exponentially.</p>
    
    <p>Ahead of its call, the company shared in an interview with CNBC that it's open to M&A to accelerate its AI roadmap. The company told the outlet that it has already acquired seven companies this year, with Cook noting that none was "huge" in terms of dollar amount.</p>
    
    <p>On the call, he added that Apple was making acquisitions at the rate of one every several weeks, indicating an aggressive acquisition strategy to bolster its AI capabilities and talent pool.</p>
    
    <h2>Apple's AI Features: Current State and Future Plans</h2>
    
    <p>Apple has been criticized for having been caught off guard by the AI era; it has announced a number of AI features that it has, so far, failed to ship. The company was even accused of showing off an improved AI-powered version of Siri that wasn't close to being ready to launch.</p>
    
    <p>But Apple has defended itself by saying that it doesn't need to rush — that launching the wrong features or the wrong products just to be first would be a mistake. That's especially true if those products don't work as promised.</p>
    
    <p>So far, Apple says it has launched more than 20 Apple Intelligence features, including visual intelligence, cleanup, and writing tools that integrate seamlessly across the Apple ecosystem.</p>
    
    <h2>Apple's AI Roadmap: What's Coming in 2025-2026</h2>
    
    <p>Later this year, Apple plans to launch AI features like live translation and an AI-powered workout buddy, but the more personalized Siri's improvements have been delayed to 2026. On the call with investors, Cook said the company was "making good progress" on the Siri update, which could represent a significant leap forward in AI assistant capabilities.</p>
    
    <h2>Apple's Vision for AI Hardware: iPhone vs. AI Glasses</h2>
    
    <p>He also shared his thoughts on how AI may impact the iPhone business if new hardware were to emerge. For instance, Meta CEO Mark Zuckerberg earlier this week suggested that AI glasses would be the form factor for interacting with the new technology, and those without them would be left behind.</p>
    
    <p>Cook, naturally, disagreed with this assessment, emphasizing Apple's confidence in the iPhone's continued relevance.</p>
    
    <p>"It's difficult to see a world where iPhone's not living in it," he said. "That doesn't mean that we are not thinking about other things, as well, but I think that the [AI] devices are likely to be complementary devices, not substitutions."</p>
    
    <h2>Apple's AI Competitive Strategy</h2>
    
    <p>The exec declined to answer a question about which AI technologies it believed would ultimately be commoditized, saying that would give away part of its strategy. This strategic silence suggests Apple is carefully positioning itself in the AI landscape, potentially focusing on proprietary AI solutions that differentiate its ecosystem.</p>
    
    <h2>Financial Performance and AI Investment Impact</h2>
    
    <p>Apple delivered better-than-expected iPhone sales and record revenue in Q3, which saw its stock pop in after-hours trading. This strong financial performance provides the foundation for continued AI investment and development, allowing Apple to compete effectively in the rapidly evolving AI market.</p>
    
    <h2>What This Means for Apple's AI Future</h2>
    
    <p>Apple's aggressive AI strategy shift in 2025 represents a fundamental change in the company's approach to artificial intelligence. With increased investments, strategic acquisitions, and a focus on user-friendly AI implementation, Apple is positioning itself to be a major player in the AI landscape.</p>
    
    <p>The company's emphasis on making AI accessible and easy to use aligns with its historical approach to technology, suggesting that Apple's AI features will be deeply integrated into the user experience rather than standalone applications.</p>
  `,
  publishedAt: new Date('2025-01-15'),
  readTime: 12,
  category: 'ai',
  tags: ['Apple AI strategy 2025', 'Tim Cook AI investment', 'Apple earnings call 2025', 'Apple AI features', 'Apple Intelligence', 'Siri AI improvements', 'Apple AI acquisitions', 'iPhone AI future', 'Apple AI roadmap', 'Apple AI technology', 'Apple AI investments', 'Apple AI development', 'Apple AI features 2025', 'Apple AI strategy', 'Apple AI race', 'Apple AI capabilities', 'Apple AI innovation', 'Apple AI market position', 'Apple AI competitive advantage', 'Apple AI business model'],
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
      query.tags = tag;
    }

    // Search functionality
    if (search) {
      query.search = search;
    }

    const posts = await BlogPost.find(query, skip, parseInt(limit));

    const total = await BlogPost.countDocuments(query);

    // If no posts found, return sample posts for testing
    if (posts.length === 0 && page == 1) {
      return res.json({
        posts: [appleAIStrategyPost, zephryxLegitPost, samplePost, zephryxPost],
        pagination: {
          current: parseInt(page),
          total: 4,
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
        relatedPosts: [zephryxPost, zephryxLegitPost]
      });
    }
    
    if (slug === 'is-zephryx-labs-scam-honest-review') {
      return res.json({
        post: zephryxPost,
        relatedPosts: [samplePost, zephryxLegitPost]
      });
    }
    
    if (slug === 'is-zephryx-labs-legit-honest-look-2025') {
      return res.json({
        post: zephryxLegitPost,
        relatedPosts: [samplePost, zephryxPost]
      });
    }
    
    if (slug === 'apple-ai-strategy-2025-earnings-call') {
      return res.json({
        post: appleAIStrategyPost,
        relatedPosts: [zephryxLegitPost, samplePost, zephryxPost]
      });
    }
    
    const post = await BlogPost.findOne({ 
      slug, 
      isPublished: true 
    });

    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Increment view count
    await BlogPost.incrementViews(post.id);

    // Get related posts
    const relatedPosts = await BlogPost.getRelated(
      post.id,
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
    }, skip, parseInt(limit));

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

    // If no posts found and it's the ai-business category, return zephryx legit post
    if (posts.length === 0 && category === 'ai-business' && page == 1) {
      return res.json({
        posts: [zephryxLegitPost],
        category,
        pagination: {
          current: parseInt(page),
          total: 1,
          hasNext: false,
          hasPrev: false
        }
      });
    }
    
    // If no posts found and it's the ai category, return apple ai strategy post
    if (posts.length === 0 && category === 'ai' && page == 1) {
      return res.json({
        posts: [appleAIStrategyPost],
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
    }, skip, parseInt(limit));

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

    const posts = await BlogPost.find({ isPublished: true }, 0, limit);

    // If no posts found, return sample posts
    if (posts.length === 0) {
      return res.json({ posts: [appleAIStrategyPost, zephryxLegitPost, samplePost, zephryxPost] });
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
    }, 0, limit);

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
      search: query
    };

    const posts = await BlogPost.find(searchQuery, skip, parseInt(limit));

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