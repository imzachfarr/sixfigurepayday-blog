require('dotenv').config();
const BlogPost = require('../models/BlogPost');

const samplePosts = [
  {
    title: 'Building a 6-Figure Online Business from Scratch',
    excerpt: 'Learn the step-by-step process of building a profitable online business that generates six figures annually. From idea validation to scaling strategies.',
    content: `
    <h2>The Blueprint for Online Business Success</h2>
    <p>Building a six-figure online business isn't about luck—it's about following a proven system and executing consistently. In this comprehensive guide, we'll walk through the exact steps that successful entrepreneurs use to build profitable online ventures.</p>
    
    <h3>Step 1: Idea Validation</h3>
    <p>Before investing time and money, you need to validate your business idea. This involves researching your target market, understanding customer pain points, and ensuring there's sufficient demand for your solution.</p>
    
    <p>Use tools like Google Trends, social media listening, and competitor analysis to gauge market interest. The goal is to find a profitable niche with manageable competition.</p>
    
    <h3>Step 2: Building Your MVP</h3>
    <p>Your Minimum Viable Product (MVP) should solve the core problem for your target audience. Focus on essential features first, then iterate based on user feedback.</p>
    
    <p>Whether you're building a SaaS product, an e-commerce store, or a content platform, start simple and improve over time.</p>
    
    <h3>Step 3: Marketing and Customer Acquisition</h3>
    <p>Develop a multi-channel marketing strategy that includes content marketing, social media, email marketing, and paid advertising. Focus on channels where your target audience spends time.</p>
    
    <p>Track your customer acquisition cost (CAC) and lifetime value (LTV) to ensure sustainable growth.</p>
    
    <h3>Step 4: Scaling and Optimization</h3>
    <p>Once you have a proven business model, focus on scaling through automation, team building, and process optimization. Continuously test and improve every aspect of your business.</p>
    
    <p>Remember, building a six-figure business is a marathon, not a sprint. Stay focused, be patient, and keep learning from both successes and failures.</p>
  `,
    read_time: 8,
    category: 'entrepreneurship',
    tags: ['online business', 'entrepreneurship', 'startup', 'business strategy', 'scaling'],
    seo_title: 'Building a 6-Figure Online Business from Scratch',
    seo_description: 'Learn the step-by-step process of building a profitable online business that generates six figures annually.',
    is_published: true,
    ai_generated: true
  },
  {
    title: 'Top 10 AI Tools Every Entrepreneur Should Use in 2024',
    excerpt: 'Discover the most powerful AI tools that can help you automate tasks, improve productivity, and grow your business faster than ever before.',
    content: `
    <h2>The AI Tool Revolution</h2>
    <p>Artificial intelligence tools are becoming essential for modern entrepreneurs. These tools can automate repetitive tasks, provide insights, and help you make better business decisions. Here are the top 10 AI tools you should be using in 2024.</p>
    
    <h3>1. ChatGPT for Content Creation</h3>
    <p>ChatGPT has revolutionized content creation. Use it for writing blog posts, social media content, email sequences, and even code. It's particularly effective for brainstorming and overcoming writer's block.</p>
    
    <h3>2. Claude for Complex Analysis</h3>
    <p>Claude excels at analyzing large documents, summarizing research, and providing detailed insights. It's perfect for market research and competitive analysis.</p>
    
    <h3>3. Midjourney for Visual Content</h3>
    <p>Create stunning visuals for your marketing materials, social media posts, and website. Midjourney generates high-quality images from text descriptions.</p>
    
    <h3>4. Grammarly for Writing Enhancement</h3>
    <p>Improve your writing with AI-powered grammar checking, tone analysis, and style suggestions. Essential for professional communication.</p>
    
    <h3>5. Zapier for Workflow Automation</h3>
    <p>Connect your apps and automate workflows. Save hours by automating repetitive tasks between different software platforms.</p>
    
    <h3>6. Notion AI for Organization</h3>
    <p>Organize your business with AI-powered note-taking, project management, and knowledge base creation.</p>
    
    <h3>7. Jasper for Marketing Copy</h3>
    <p>Generate high-converting marketing copy for ads, landing pages, and email campaigns.</p>
    
    <h3>8. Otter.ai for Meeting Transcription</h3>
    <p>Automatically transcribe meetings and interviews, saving time and ensuring nothing is missed.</p>
    
    <h3>9. Loom for Video Communication</h3>
    <p>Create quick video messages and tutorials with AI-powered editing features.</p>
    
    <h3>10. Synthesia for Video Creation</h3>
    <p>Create professional videos with AI avatars, perfect for training, marketing, and educational content.</p>
    
    <h3>Getting Started</h3>
    <p>Start with 2-3 tools that address your most pressing needs. Learn them thoroughly before adding more. The key is to use AI tools to enhance your productivity, not replace your creativity.</p>
  `,
    read_time: 6,
    category: 'tools',
    tags: ['AI tools', 'productivity', 'automation', 'business tools', 'technology'],
    seo_title: 'Top 10 AI Tools Every Entrepreneur Should Use in 2024',
    seo_description: 'Discover the most powerful AI tools that can help you automate tasks and grow your business.',
    is_published: true,
    ai_generated: true
  },
  {
    title: 'Digital Marketing Strategies That Actually Work in 2024',
    excerpt: 'Cut through the noise and focus on digital marketing strategies that deliver real results. From SEO to social media, learn what works now.',
    content: `
    <h2>The State of Digital Marketing in 2024</h2>
    <p>Digital marketing is constantly evolving, and what worked last year might not work today. In this comprehensive guide, we'll explore the strategies that are actually delivering results in 2024.</p>
    
    <h3>SEO: Still King, But Different</h3>
    <p>Search engine optimization remains the most cost-effective marketing channel, but the rules have changed. Google's algorithm updates now prioritize user experience, content quality, and technical performance.</p>
    
    <p>Focus on creating comprehensive, valuable content that answers user questions. Use long-tail keywords, optimize for featured snippets, and ensure your site loads quickly on mobile devices.</p>
    
    <h3>Content Marketing: Quality Over Quantity</h3>
    <p>Gone are the days of publishing mediocre content daily. Today's successful content marketers focus on creating fewer, higher-quality pieces that provide real value to their audience.</p>
    
    <p>Develop content clusters around your main topics, create comprehensive guides, and repurpose content across multiple formats (blog posts, videos, podcasts, infographics).</p>
    
    <h3>Social Media: Authenticity Wins</h3>
    <p>Social media algorithms now favor authentic, engaging content over polished, overly-produced posts. Focus on building genuine connections with your audience.</p>
    
    <p>Use stories, live videos, and user-generated content to increase engagement. Don't try to be everywhere—focus on 2-3 platforms where your audience is most active.</p>
    
    <h3>Email Marketing: Personalization is Key</h3>
    <p>Email marketing continues to deliver the highest ROI of any marketing channel. The key is personalization and segmentation.</p>
    
    <p>Use behavioral triggers, dynamic content, and advanced segmentation to deliver relevant messages to the right people at the right time.</p>
    
    <h3>Paid Advertising: Precision Targeting</h3>
    <p>With rising ad costs, precision targeting is more important than ever. Use lookalike audiences, retargeting, and advanced bidding strategies to maximize your ad spend.</p>
    
    <p>Test different ad formats, creative approaches, and landing pages to find what works best for your audience.</p>
    
    <h3>Measuring Success</h3>
    <p>Focus on metrics that matter: customer acquisition cost, lifetime value, conversion rates, and revenue attribution. Don't get caught up in vanity metrics like likes and shares.</p>
    
    <p>Use tools like Google Analytics, Facebook Pixel, and marketing automation platforms to track your results and optimize your campaigns.</p>
  `,
    read_time: 7,
    category: 'digital-marketing',
    tags: ['digital marketing', 'SEO', 'content marketing', 'social media', 'email marketing'],
    seo_title: 'Digital Marketing Strategies That Actually Work in 2024',
    seo_description: 'Cut through the noise and focus on digital marketing strategies that deliver real results.',
    is_published: true,
    ai_generated: true
  }
];

async function populateDatabase() {
  try {
    console.log('🚀 Starting database population...');
    
    for (const postData of samplePosts) {
      try {
        const post = await BlogPost.create(postData);
        console.log(`✅ Created post: "${post.title}"`);
      } catch (error) {
        console.error(`❌ Error creating post "${postData.title}":`, error.message);
      }
    }
    
    console.log('🎉 Database population completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error populating database:', error);
    process.exit(1);
  }
}

populateDatabase(); 