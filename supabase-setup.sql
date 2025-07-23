-- Create blog_posts table for Supabase
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt VARCHAR(300) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('ai', 'money-making', 'entrepreneurship', 'digital-marketing', 'passive-income', 'online-business', 'tools')),
  tags TEXT[] DEFAULT '{}',
  image_url TEXT,
  seo_title VARCHAR(60),
  seo_description VARCHAR(300),
  keywords TEXT[] DEFAULT '{}',
  read_time INTEGER DEFAULT 5,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_published BOOLEAN DEFAULT true,
  view_count INTEGER DEFAULT 0,
  has_backlink BOOLEAN DEFAULT false,
  backlink_url TEXT DEFAULT 'https://www.zephryxlabs.com/aiassetaccelerator',
  source_url TEXT,
  source_title TEXT,
  ai_generated BOOLEAN DEFAULT true,
  generation_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_published ON blog_posts(is_published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_blog_posts_keywords ON blog_posts USING GIN(keywords);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_blog_posts_updated_at 
    BEFORE UPDATE ON blog_posts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access" ON blog_posts
    FOR SELECT USING (is_published = true);

-- Create policy for admin full access (you'll need to adjust this based on your auth setup)
CREATE POLICY "Admin full access" ON blog_posts
    FOR ALL USING (true); -- This is a placeholder - adjust based on your auth requirements

-- Insert a sample blog post for testing
INSERT INTO blog_posts (
  title,
  slug,
  excerpt,
  content,
  category,
  tags,
  seo_title,
  seo_description,
  read_time,
  published_at,
  is_published,
  view_count,
  ai_generated
) VALUES (
  'How AI is Revolutionizing Online Money Making in 2024',
  'how-ai-revolutionizing-online-money-making-2024',
  'Discover the latest AI tools and strategies that are transforming how entrepreneurs make money online.',
  '<h2>The AI Revolution in Online Business</h2><p>Artificial intelligence is no longer just a buzzword—it''s actively transforming how entrepreneurs and digital nomads make money online. In 2024, we''re seeing unprecedented integration of AI tools across every aspect of online business.</p><h3>Content Creation at Scale</h3><p>One of the most significant impacts of AI on online money making is in content creation. Tools like ChatGPT, Claude, and other advanced language models are enabling entrepreneurs to create high-quality content at unprecedented speeds.</p><p>This isn''t just about writing blog posts—it''s about creating entire content ecosystems that can generate consistent revenue streams. From automated social media posts to personalized email sequences, AI is making it possible to maintain multiple income streams with minimal manual effort.</p><h3>Intelligent Marketing Systems</h3><p>AI-powered marketing tools are revolutionizing how businesses reach their target audiences. Machine learning algorithms can now predict customer behavior, optimize ad campaigns in real-time, and personalize user experiences at scale.</p><p>For online entrepreneurs, this means more efficient ad spend, higher conversion rates, and the ability to compete with larger companies despite having smaller budgets.</p><h3>The Future of Online Entrepreneurship</h3><p>As we move deeper into 2024, the entrepreneurs who embrace AI tools will have a significant competitive advantage. The key is not to replace human creativity and strategy, but to augment it with intelligent automation.</p><p>Whether you''re running an e-commerce store, a content-based business, or a service-based company, AI tools can help you scale faster, work more efficiently, and ultimately increase your online income.</p>',
  'ai',
  ARRAY['AI', 'artificial intelligence', 'make money online', 'entrepreneurship', 'digital marketing'],
  'How AI is Revolutionizing Online Money Making in 2024',
  'Discover the latest AI tools and strategies that are transforming how entrepreneurs make money online.',
  5,
  NOW(),
  true,
  0,
  true
) ON CONFLICT (slug) DO NOTHING; 