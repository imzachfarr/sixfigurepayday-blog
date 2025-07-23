# 🤖 Auto-Poster System Setup Guide

The Auto-Poster system automatically monitors trending AI news and creates blog posts using GPT-4, then publishes them to your blog with relevant Unsplash images.

## 🚀 Features

- **📰 Trending News Monitoring**: Fetches latest AI news from multiple sources
- **🤖 AI Content Generation**: Creates engaging blog posts using GPT-4
- **🖼️ Automatic Image Selection**: Adds relevant Unsplash images to each post
- **⏰ Scheduled Publishing**: Runs every 6 hours automatically
- **🔄 Duplicate Detection**: Prevents duplicate posts
- **📊 Analytics**: Tracks performance and generates reports
- **🔧 Manual Control**: API endpoints for manual triggering

## 📋 Prerequisites

1. **OpenAI API Key**: For GPT-4 content generation
2. **Unsplash API Key**: For blog post images
3. **News API Key** (Optional): For real-time trending news
4. **Admin API Key**: For controlling the system

## 🔧 Setup Instructions

### Step 1: Get API Keys

#### OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up/login and navigate to API Keys
3. Create a new API key
4. Copy the key (starts with `sk-`)

#### Unsplash API Key
1. Go to [Unsplash Developers](https://unsplash.com/developers)
2. Sign up for a free account
3. Create a new application
4. Copy your Access Key

#### News API Key (Optional)
1. Go to [NewsAPI.org](https://newsapi.org/)
2. Sign up for a free account
3. Copy your API key
4. Free tier allows 1,000 requests/day

### Step 2: Configure Environment Variables

Add these to your `.env` file:

```bash
# Required
OPENAI_API_KEY=sk-your_openai_api_key_here
UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
ADMIN_API_KEY=your_secure_admin_api_key_here

# Auto-Poster Configuration
ENABLE_AUTO_POSTER=true
NEWS_API_KEY=your_news_api_key_here  # Optional

# Optional: Image Generation
ENABLE_IMAGE_GENERATION=false
```

### Step 3: Install Dependencies

```bash
cd server
npm install node-cron
```

### Step 4: Test the System

```bash
# Test the auto-poster with mock data
node scripts/test-auto-poster.js

# Test with real news (if you have NEWS_API_KEY)
node scripts/auto-poster.js
```

## ⏰ Scheduling

The auto-poster runs on the following schedule:

- **Auto-Poster**: Every 6 hours (4 times per day)
- **Daily Maintenance**: 2:00 AM daily
- **Weekly Analytics**: 3:00 AM Sundays

## 🎛️ Manual Control

### API Endpoints

All endpoints require the `ADMIN_API_KEY` in the header:

```bash
# Trigger auto-poster manually
curl -X POST http://localhost:5001/api/automation/trigger-auto-poster \
  -H "apiKey: your_admin_api_key"

# Get auto-poster status
curl http://localhost:5001/api/automation/auto-poster-status \
  -H "apiKey: your_admin_api_key"

# Test auto-poster with mock data
curl -X POST http://localhost:5001/api/automation/test-auto-poster \
  -H "apiKey: your_admin_api_key"

# Start/stop cron service
curl -X POST http://localhost:5001/api/automation/cron-control \
  -H "apiKey: your_admin_api_key" \
  -H "Content-Type: application/json" \
  -d '{"action": "start"}'
```

### Command Line

```bash
# Run auto-poster manually
node scripts/auto-poster.js

# Test the system
node scripts/test-auto-poster.js

# Check database contents
node scripts/check-db.js
```

## 📊 Monitoring

### Status Dashboard

The system provides real-time status information:

```json
{
  "cronJobs": {
    "autoPoster": {
      "running": true,
      "nextDate": "2024-01-15T12:00:00.000Z",
      "lastDate": "2024-01-15T06:00:00.000Z"
    }
  },
  "weeklyStats": {
    "totalPosts": 45,
    "newPosts": 12,
    "totalViews": 1250,
    "avgViews": 104
  },
  "autoPosterEnabled": true
}
```

### Logs

View recent automation activity:

```bash
curl http://localhost:5001/api/automation/logs \
  -H "apiKey: your_admin_api_key"
```

## 🔍 How It Works

### 1. News Fetching
- Monitors multiple AI news sources
- Filters for trending topics (ChatGPT, OpenAI, AI tools, etc.)
- Falls back to mock data if no news API key

### 2. Content Generation
- Uses GPT-4 to create engaging blog posts
- Optimizes for SEO and readability
- Includes practical insights for entrepreneurs

### 3. Image Selection
- Searches Unsplash for relevant images
- Matches images to post category and title
- Ensures proper attribution

### 4. Publishing
- Creates posts with proper metadata
- Sets appropriate categories and tags
- Publishes immediately (no draft mode)

## 🛠️ Customization

### Trending Topics

Edit `TRENDING_TOPICS` in `auto-poster.js`:

```javascript
const TRENDING_TOPICS = [
  'AI agents', 'ChatGPT', 'OpenAI', 'Google AI', 'Microsoft AI',
  'AI automation', 'AI tools', 'machine learning', 'deep learning',
  'AI business', 'AI startup', 'AI investment', 'AI regulation'
];
```

### News Sources

Add more sources in `NEWS_SOURCES`:

```javascript
const NEWS_SOURCES = [
  'https://newsapi.org/v2/everything?q=artificial+intelligence&sortBy=popularity&apiKey=',
  'https://newsapi.org/v2/everything?q=AI+technology&sortBy=popularity&apiKey=',
  // Add more sources here
];
```

### Scheduling

Modify cron schedules in `cronService.js`:

```javascript
// Every 4 hours instead of 6
cron.schedule('0 */4 * * *', async () => {
  // Auto-poster logic
});

// Daily at 9 AM instead of 2 AM
cron.schedule('0 9 * * *', async () => {
  // Daily maintenance
});
```

## 🚨 Troubleshooting

### Common Issues

1. **"OpenAI API error"**
   - Check your OpenAI API key
   - Ensure you have GPT-4 access
   - Check your API usage limits

2. **"Unsplash API error"**
   - Verify your Unsplash API key
   - Check your API rate limits

3. **"No trending news found"**
   - Add a NEWS_API_KEY for real news
   - System will use mock data as fallback

4. **"Duplicate posts"**
   - System automatically detects duplicates
   - Check existing posts in database

### Debug Mode

Enable detailed logging:

```bash
NODE_ENV=development node scripts/auto-poster.js
```

### Manual Testing

Test individual components:

```bash
# Test OpenAI connection
curl -X POST https://api.openai.com/v1/chat/completions \
  -H "Authorization: Bearer your_openai_key" \
  -H "Content-Type: application/json" \
  -d '{"model":"gpt-4","messages":[{"role":"user","content":"Hello"}]}'

# Test Unsplash connection
curl "https://api.unsplash.com/search/photos?query=technology&per_page=1" \
  -H "Authorization: Client-ID your_unsplash_key"
```

## 📈 Performance

### Expected Output

- **Posts per run**: 1-3 (configurable)
- **Posts per day**: 4-12 (depending on schedule)
- **Content quality**: High-quality, SEO-optimized
- **Image relevance**: Category-matched, professional

### Optimization Tips

1. **Rate Limiting**: System includes built-in delays to respect API limits
2. **Error Handling**: Graceful fallbacks for API failures
3. **Duplicate Prevention**: Smart title matching
4. **Resource Management**: Efficient database queries

## 🔒 Security

- All endpoints require admin authentication
- API keys are stored securely in environment variables
- Rate limiting prevents abuse
- Input validation on all endpoints

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Verify all API keys are correct
3. Check server logs for detailed error messages
4. Test individual components manually

## 🎯 Next Steps

Once the auto-poster is running:

1. **Monitor Performance**: Check weekly analytics
2. **Optimize Content**: Review generated posts
3. **Scale Up**: Increase posting frequency if needed
4. **Customize**: Adjust topics and sources
5. **Integrate**: Connect with social media auto-posting

The auto-poster will now automatically keep your blog updated with fresh, trending AI content! 🚀 