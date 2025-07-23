require('dotenv').config();
const { runAutoPoster } = require('./auto-poster');

console.log('🧪 Testing Auto-Poster System...');
console.log('📅 Current time:', new Date().toLocaleString());

// Check required environment variables
const requiredVars = ['OPENAI_API_KEY', 'UNSPLASH_ACCESS_KEY'];
const missingVars = requiredVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingVars.forEach(varName => {
    console.error(`   - ${varName}`);
  });
  console.log('\n💡 Please add these to your .env file');
  process.exit(1);
}

console.log('✅ Environment variables check passed');

// Test the auto-poster
async function testAutoPoster() {
  try {
    console.log('\n🚀 Running auto-poster test...');
    await runAutoPoster();
    console.log('\n✅ Auto-poster test completed successfully!');
  } catch (error) {
    console.error('\n❌ Auto-poster test failed:', error.message);
    process.exit(1);
  }
}

testAutoPoster(); 