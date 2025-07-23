require('dotenv').config();

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

console.log('🔍 Testing Unsplash API connection...');
console.log(`API Key: ${UNSPLASH_ACCESS_KEY ? '✅ Set' : '❌ Not set'}`);

if (!UNSPLASH_ACCESS_KEY || UNSPLASH_ACCESS_KEY === 'your_unsplash_access_key_here') {
  console.log('\n❌ Please set up your Unsplash API key:');
  console.log('1. Go to https://unsplash.com/developers');
  console.log('2. Sign up for a free account');
  console.log('3. Create a new application');
  console.log('4. Copy your Access Key');
  console.log('5. Add it to your .env file:');
  console.log('   UNSPLASH_ACCESS_KEY=your_actual_key_here');
  process.exit(1);
}

// Test the API
async function testUnsplashAPI() {
  try {
    const response = await fetch('https://api.unsplash.com/search/photos?query=business&per_page=1', {
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ Unsplash API connection successful!');
    console.log(`📸 Found ${data.total} photos for "business" query`);
    
    if (data.results && data.results.length > 0) {
      const photo = data.results[0];
      console.log(`📷 Sample photo: ${photo.urls.regular}`);
      console.log(`👤 Photographer: ${photo.user.name}`);
    }
    
  } catch (error) {
    console.error('❌ Unsplash API test failed:', error.message);
    process.exit(1);
  }
}

testUnsplashAPI(); 