require('dotenv').config();
const BlogPost = require('../models/BlogPost');
const { supabase } = require('../config/database');

// Unsplash API configuration
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

if (!UNSPLASH_ACCESS_KEY) {
  console.error('❌ UNSPLASH_ACCESS_KEY is required in your .env file');
  console.log('💡 Get your free API key from: https://unsplash.com/developers');
  process.exit(1);
}

// Keywords for different categories to get relevant images
const categoryKeywords = {
  'ai': ['artificial intelligence', 'technology', 'digital', 'futuristic'],
  'entrepreneurship': ['business', 'entrepreneur', 'startup', 'office'],
  'online-business': ['online business', 'digital business', 'ecommerce'],
  'digital-marketing': ['digital marketing', 'social media', 'advertising'],
  'tools': ['tools', 'software', 'technology', 'productivity'],
  'money-making': ['money', 'wealth', 'business', 'success'],
  'passive-income': ['passive income', 'freedom', 'lifestyle', 'business']
};

async function getUnsplashImage(category, title) {
  try {
    // Get keywords for the category
    const keywords = categoryKeywords[category] || ['business', 'technology'];
    
    // Create search query from title and category keywords
    const searchQuery = `${title.split(' ').slice(0, 3).join(' ')} ${keywords[0]}`;
    
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
      const photo = data.results[0];
      return {
        url: photo.urls.regular,
        alt: photo.alt_description || title,
        photographer: photo.user.name,
        unsplash_url: photo.links.html
      };
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching image for "${title}":`, error.message);
    return null;
  }
}

async function updatePostImage(postId, imageUrl) {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .update({ 
        image_url: imageUrl,
        updated_at: new Date().toISOString()
      })
      .eq('id', postId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error updating post ${postId}:`, error.message);
    throw error;
  }
}

async function addImagesToPosts() {
  try {
    console.log('🖼️  Starting to add Unsplash images to blog posts...');
    
    // Get all posts that don't have images
    const posts = await BlogPost.find({}, 0, 100);
    
    console.log(`📊 Found ${posts.length} posts to process`);
    
    let updatedCount = 0;
    let skippedCount = 0;
    
    for (const post of posts) {
      try {
        // Skip if already has an image
        if (post.image_url) {
          console.log(`⏭️  Skipping "${post.title}" - already has image`);
          skippedCount++;
          continue;
        }
        
        console.log(`🔄 Processing: "${post.title}" (${post.category})`);
        
        // Get image from Unsplash
        const imageData = await getUnsplashImage(post.category, post.title);
        
        if (imageData) {
          // Update the post with the image URL
          await updatePostImage(post.id, imageData.url);
          
          console.log(`✅ Added image to "${post.title}"`);
          console.log(`   📸 Image: ${imageData.url}`);
          console.log(`   👤 Photographer: ${imageData.photographer}`);
          updatedCount++;
          
          // Add a small delay to be respectful to the API
          await new Promise(resolve => setTimeout(resolve, 100));
        } else {
          console.log(`❌ No image found for "${post.title}"`);
        }
        
      } catch (error) {
        console.error(`❌ Error processing "${post.title}":`, error.message);
      }
    }
    
    console.log('\n🎉 Image addition complete!');
    console.log(`✅ Updated: ${updatedCount} posts`);
    console.log(`⏭️  Skipped: ${skippedCount} posts (already had images)`);
    
  } catch (error) {
    console.error('❌ Error adding images:', error);
  }
}

// Run the script
addImagesToPosts().then(() => {
  console.log('🏁 Script finished');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Script failed:', error);
  process.exit(1);
}); 