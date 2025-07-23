# Supabase Setup Guide

This guide will help you set up Supabase as your database for the SixFigurePayday blog system.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `sixfigurepayday` (or your preferred name)
   - Database Password: Create a strong password
   - Region: Choose the closest region to your users
5. Click "Create new project"

## 2. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

## 3. Set Up the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the contents of `supabase-setup.sql` and paste it into the SQL editor
3. Click "Run" to execute the script

This will create:
- The `blog_posts` table with all necessary columns
- Indexes for optimal performance
- Row Level Security (RLS) policies
- A sample blog post for testing

## 4. Configure Environment Variables

1. Copy `.env.example` to `.env` in your project root
2. Update the following variables:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
```

## 5. Test the Connection

1. Start your server: `cd server && npm run dev`
2. You should see: `📦 Supabase Connected Successfully`
3. Test the API: `curl http://localhost:5000/api/blog`

## 6. Row Level Security (RLS)

The setup includes basic RLS policies:
- **Public read access**: Anyone can read published blog posts
- **Admin full access**: Full CRUD access (you may need to adjust this based on your auth requirements)

### Customizing RLS Policies

If you want to restrict access further, you can modify the policies in the SQL script or add new ones through the Supabase dashboard.

## 7. Database Features

### Automatic Timestamps
- `created_at` and `updated_at` are automatically managed
- `updated_at` is automatically updated when a record is modified

### Data Types
- **UUID**: Primary keys for better security
- **Text Arrays**: Tags and keywords are stored as PostgreSQL arrays
- **Timestamps**: All date fields use timezone-aware timestamps
- **Constraints**: Category field has a check constraint for valid values

### Indexes
- Optimized for common queries (slug, category, published date)
- GIN indexes for array fields (tags, keywords)

## 8. Migration from MongoDB

If you're migrating from MongoDB:
1. Export your existing data
2. Transform the data to match the new schema
3. Import using the Supabase dashboard or API
4. Update any hardcoded MongoDB-specific queries

## 9. Troubleshooting

### Connection Issues
- Verify your `SUPABASE_URL` and `SUPABASE_ANON_KEY` are correct
- Check that your IP is not blocked by Supabase
- Ensure the `blog_posts` table exists

### Permission Issues
- Check RLS policies in the Supabase dashboard
- Verify your API key has the correct permissions
- Test with the Supabase dashboard SQL editor

### Performance Issues
- Check that indexes are created properly
- Monitor query performance in the Supabase dashboard
- Consider using connection pooling for high-traffic applications

## 10. Production Deployment

For production:
1. Use environment-specific Supabase projects
2. Set up proper RLS policies for your use case
3. Configure backup strategies
4. Monitor performance and costs
5. Set up proper error handling and logging

## Support

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [GitHub Issues](https://github.com/supabase/supabase/issues) 