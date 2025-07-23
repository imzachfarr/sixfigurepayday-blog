const OpenAI = require('openai');
const readingTime = require('reading-time');

let openai = null;

// Only initialize OpenAI if API key is provided
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

class AIService {
  constructor() {
    this.backlinkCounter = 0; // Track posts to ensure 1 in 3 has backlink
  }

  async generateBlogPost(sourceContent, sourceUrl, sourceTitle) {
    try {
      if (!openai) {
        throw new Error('OpenAI API key not configured');
      }

      this.backlinkCounter++;
      const shouldIncludeBacklink = this.backlinkCounter % 3 === 0;

      const prompt = this.buildPrompt(sourceContent, sourceTitle, shouldIncludeBacklink);
      
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an expert content writer specializing in AI and online money-making strategies. Write engaging, informative content that provides real value to entrepreneurs and digital nomads."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.7,
      });

      const generatedContent = completion.choices[0].message.content;
      
      // Parse the generated content to extract title, excerpt, and content
      const parsed = this.parseGeneratedContent(generatedContent);
      
      // Calculate reading time
      const stats = readingTime(parsed.content);
      const readTime = Math.ceil(stats.minutes);

      // Generate SEO keywords
      const keywords = await this.generateKeywords(parsed.title, parsed.content);

      return {
        title: parsed.title,
        excerpt: parsed.excerpt,
        content: parsed.content,
        readTime,
        keywords,
        hasBacklink: shouldIncludeBacklink,
        sourceUrl,
        sourceTitle,
        aiGenerated: true
      };
    } catch (error) {
      console.error('Error generating blog post:', error);
      throw new Error('Failed to generate blog post');
    }
  }

  buildPrompt(sourceContent, sourceTitle, includeBacklink) {
    const backlinkInstruction = includeBacklink 
      ? `IMPORTANT: This post MUST include a natural backlink to https://zephryxlabs.com/aiassetaccelerator. Frame it as a valuable resource or next step for readers.`
      : '';

    return `Rewrite the following content about "${sourceTitle}" in an engaging, slightly irreverent tone aimed at entrepreneurs interested in AI and online money-making.

${backlinkInstruction}

Requirements:
- Make it 800-1200 words
- Include relevant keywords for SEO (AI, artificial intelligence, make money online, passive income, digital marketing, entrepreneurship)
- Write in an engaging, conversational tone
- Provide actionable insights and strategies
- Include specific examples and case studies when possible
- Structure with clear headings and subheadings
- End with a compelling call-to-action

Format your response as:
TITLE: [Your engaging title here]
EXCERPT: [150-200 word excerpt that hooks the reader]
CONTENT: [Full article content with proper formatting]

Source content:
${sourceContent}

${backlinkInstruction}`;
  }

  parseGeneratedContent(content) {
    const lines = content.split('\n');
    let title = '';
    let excerpt = '';
    let articleContent = '';
    let currentSection = '';

    for (const line of lines) {
      if (line.startsWith('TITLE:')) {
        title = line.replace('TITLE:', '').trim();
      } else if (line.startsWith('EXCERPT:')) {
        currentSection = 'excerpt';
      } else if (line.startsWith('CONTENT:')) {
        currentSection = 'content';
      } else if (currentSection === 'excerpt' && line.trim()) {
        excerpt += line.trim() + ' ';
      } else if (currentSection === 'content') {
        articleContent += line + '\n';
      }
    }

    return {
      title: title || 'AI-Powered Insights for Entrepreneurs',
      excerpt: excerpt.trim() || 'Discover the latest strategies and tools to boost your online income with AI.',
      content: articleContent.trim()
    };
  }

  async generateKeywords(title, content) {
    try {
      if (!openai) {
        return ['AI', 'artificial intelligence', 'make money online', 'entrepreneurship'];
      }

      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "Extract 5-8 relevant SEO keywords from the given content. Return only the keywords separated by commas."
          },
          {
            role: "user",
            content: `Title: ${title}\n\nContent: ${content.substring(0, 1000)}`
          }
        ],
        max_tokens: 100,
        temperature: 0.3,
      });

      const keywords = completion.choices[0].message.content
        .split(',')
        .map(k => k.trim())
        .filter(k => k.length > 0);

      return keywords;
    } catch (error) {
      console.error('Error generating keywords:', error);
      return ['AI', 'artificial intelligence', 'make money online', 'entrepreneurship'];
    }
  }

  async generateImagePrompt(title, content) {
    try {
      if (!openai) {
        return 'modern business technology AI artificial intelligence';
      }

      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "Generate a short, descriptive image prompt for a blog post. Focus on modern, professional imagery related to AI, technology, or business."
          },
          {
            role: "user",
            content: `Title: ${title}\n\nContent: ${content.substring(0, 500)}`
          }
        ],
        max_tokens: 100,
        temperature: 0.7,
      });

      return completion.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error generating image prompt:', error);
      return 'modern business technology AI artificial intelligence';
    }
  }

  async generateImage(imagePrompt) {
    try {
      if (!openai) {
        return null;
      }

      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: `${imagePrompt}, professional, modern, business, technology, high quality, 16:9 aspect ratio`,
        n: 1,
        size: "1024x1024",
      });

      return response.data[0].url;
    } catch (error) {
      console.error('Error generating image:', error);
      return null;
    }
  }
}

module.exports = new AIService(); 