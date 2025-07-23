const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Please set SUPABASE_URL and SUPABASE_ANON_KEY in your .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const connectDB = async () => {
  try {
    // Test the connection by making a simple query
    const { data, error } = await supabase
      .from('blog_posts')
      .select('count')
      .limit(1);

    if (error) {
      throw error;
    }

    console.log('📦 Supabase Connected Successfully');
  } catch (error) {
    console.error('❌ Supabase connection error:', error);
    process.exit(1);
  }
};

module.exports = { supabase, connectDB }; 