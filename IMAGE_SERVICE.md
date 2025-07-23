# Image Service Documentation

## Overview

The image service automatically finds high-quality, relevant images for your generated blog posts using the Unsplash API. It analyzes the blog post content and keywords to find the most appropriate images.

## Features

- **Automatic Image Discovery**: Finds relevant images based on blog post title, content, and keywords
- **Fallback System**: Provides reliable fallback images when API is unavailable
- **Category-Based Search**: Optimized search queries for different blog categories
- **High-Quality Images**: Uses Unsplash's curated collection of professional photos
- **No Manual Work**: Fully automated integration with the blog generation system

## Setup

### 1. Get Unsplash API Key

1. Go to [Unsplash Developers](https://unsplash.com/developers)
2. Create a new application
3. Copy your Access Key

### 2. Configure Environment

Add your Unsplash API key to your `.env` file:

```bash
UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
```

### 3. Install Dependencies

The service uses `axios` which is already included in the project dependencies.

## How It Works

### Automatic Integration

The image service is automatically called when:
- New blog posts are generated via the cron service
- Posts are regenerated via the automation API
- AI content is generated

### Image Selection Process

1. **Content Analysis**: Extracts relevant keywords from title and content
2. **Query Generation**: Creates optimized search queries for Unsplash
3. **Image Search**: Searches Unsplash for relevant, high-quality images
4. **Fallback**: Uses curated fallback images if no suitable image is found

### Search Query Examples

- **AI Content**: "artificial intelligence technology business"
- **Money-Making**: "business success money"
- **Entrepreneurship**: "entrepreneur business startup"
- **Digital Marketing**: "digital marketing social media"

## API Endpoints

### Test Image Service

```bash
POST /api/automation/test-image
Headers: { "apiKey": "your_admin_api_key" }
Body: {
  "title": "How AI is Revolutionizing Online Business",
  "content": "Artificial intelligence is transforming...",
  "keywords": ["AI", "business", "technology"]
}
```

Response:
```json
{
  "message": "Image service test completed",
  "imageUrl": "https://images.unsplash.com/photo-...",
  "searchQuery": "artificial intelligence technology business"
}
```

## Fallback Images

When the Unsplash API is unavailable or no suitable images are found, the service provides curated fallback images:

- Business meetings and office environments
- Technology and digital workspaces
- Professional business settings
- Modern office spaces

## Usage Examples

### In Blog Generation

The image service is automatically integrated into the blog generation process:

```javascript
// In aiService.js
const imageUrl = await imageService.findImageForBlogPost(title, content, keywords);

// The imageUrl is automatically included in the generated blog post
```

### Manual Image Search

```javascript
const imageService = require('./services/imageService');

// Find image by category
const imageUrl = await imageService.getImageByCategory('ai');

// Find image by keywords
const imageUrl = await imageService.getImageByKeywords(['AI', 'technology', 'business']);
```

## Configuration Options

### Environment Variables

- `UNSPLASH_ACCESS_KEY`: Your Unsplash API access key
- `ENABLE_IMAGE_GENERATION`: Set to `false` to use real images instead of DALL-E

### Image Quality Settings

The service uses Unsplash's "regular" size images (1080px width) for optimal quality and file size balance.

## Troubleshooting

### Common Issues

1. **No Images Found**: Check your Unsplash API key and internet connection
2. **Poor Image Relevance**: The service will use fallback images
3. **API Rate Limits**: Unsplash has generous rate limits, but monitor usage

### Debug Mode

Enable debug logging by checking the console output when testing the image service.

## Cost Considerations

- **Unsplash API**: Free tier includes 50 requests per hour
- **Image Downloads**: Free for commercial use with attribution
- **No Storage Costs**: Images are served directly from Unsplash CDN

## Best Practices

1. **Keep API Key Secure**: Never commit your API key to version control
2. **Monitor Usage**: Check your Unsplash API usage dashboard
3. **Test Regularly**: Use the test endpoint to verify service functionality
4. **Fallback Strategy**: The service includes reliable fallback images

## Integration with Frontend

The `imageUrl` field is automatically included in blog post data and can be displayed in your frontend components:

```javascript
// In your React component
{post.imageUrl && (
  <img 
    src={post.imageUrl} 
    alt={post.title}
    className="blog-post-image"
  />
)}
``` 