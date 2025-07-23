require('dotenv').config();
const BlogPost = require('../models/BlogPost');

async function checkDatabase() {
  try {
    console.log('🔍 Checking database contents...');
    
    // Get all posts
    const posts = await BlogPost.find({}, 0, 50);
    
    console.log(`📊 Found ${posts.length} posts in database:`);
    
    posts.forEach((post, index) => {
      console.log(`${index + 1}. "${post.title}" (${post.slug})`);
      console.log(`   Category: ${post.category}`);
      console.log(`   Published: ${post.is_published}`);
      console.log(`   Created: ${post.created_at}`);
      console.log('---');
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error checking database:', error);
    process.exit(1);
  }
}

checkDatabase(); 