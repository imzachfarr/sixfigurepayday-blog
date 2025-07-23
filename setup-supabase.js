#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Supabase Setup for SixFigurePayday\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, 'env.example');

if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file from template...');
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ .env file created from template');
  } else {
    console.log('❌ env.example not found. Please create a .env file manually.');
    process.exit(1);
  }
}

console.log('\n📋 Please provide your Supabase credentials:');

rl.question('Enter your SupABASE_URL (e.g., https://your-project.supabase.co): ', (supabaseUrl) => {
  rl.question('Enter your SUPABASE_ANON_KEY (starts with eyJ...): ', (supabaseKey) => {
    rl.close();

    // Read current .env file
    let envContent = fs.readFileSync(envPath, 'utf8');

    // Update Supabase variables
    envContent = envContent.replace(
      /SUPABASE_URL=.*/,
      `SUPABASE_URL=${supabaseUrl}`
    );
    envContent = envContent.replace(
      /SUPABASE_ANON_KEY=.*/,
      `SUPABASE_ANON_KEY=${supabaseKey}`
    );

    // Write updated .env file
    fs.writeFileSync(envPath, envContent);

    console.log('\n✅ Environment variables updated!');
    console.log('\n📋 Next steps:');
    console.log('1. Go to your Supabase dashboard → SQL Editor');
    console.log('2. Copy and run the contents of supabase-setup.sql');
    console.log('3. Start your server: cd server && npm run dev');
    console.log('4. Test the API: curl http://localhost:5000/api/blog');
    console.log('\n📖 For detailed instructions, see SUPABASE_SETUP.md');
  });
}); 