# Production Build Fix - Posts Fetching Issue

## Problem
The ecommerce and home page lower sections were failing to fetch posts in production due to environment variable configuration issues.

## Root Cause
The application was using inconsistent API call patterns between client-side and server-side components in a separate deployment setup (Vercel frontend + Railway backend).

## Solution
Updated all API routes to use the correct environment variable pattern for separate deployments:

### Changes Made

1. **API Routes Updated** - All server-side API routes now use `NEXT_PUBLIC_BACKEND_URL`:
   - `frontend/app/api/posts/route.ts`
   - `frontend/app/api/blog/route.ts`
   - `frontend/app/api/blog/category/[category]/route.ts`
   - `frontend/app/api/blog/[slug]/route.ts`

2. **Client Components** - Already correctly using `NEXT_PUBLIC_BACKEND_URL`:
   - `frontend/app/ecommerce/page.tsx`
   - `frontend/app/category/[category]/page.tsx`
   - `frontend/app/blog/[slug]/page.tsx`
   - `frontend/components/BlogList.tsx`

### Environment Variable Pattern
```javascript
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'http://localhost:5001'
```

This ensures compatibility with both separate deployments and local development.

## Environment Variables for Production

### Vercel (Frontend) Environment Variables
```
NEXT_PUBLIC_BACKEND_URL=https://your-backend-railway-app.railway.app
```

### Railway (Backend) Environment Variables
```
DATABASE_URL=your_supabase_database_url
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
ENABLE_AUTO_POSTER=true
```

## Benefits of This Fix

1. **Consistent Environment Variables**: All components use the same environment variable pattern
2. **Separate Deployment Support**: Works correctly with Vercel frontend + Railway backend
3. **Local Development**: Still works with local development setup
4. **Fallback Support**: Multiple fallback options for environment variables

## Testing

After deployment, verify that:
1. Home page loads posts correctly
2. Ecommerce page loads and filters posts correctly
3. Category pages load posts correctly
4. Individual blog posts load correctly
5. All API routes return proper responses

## Deployment Steps

1. Deploy backend to Railway with proper environment variables
2. Deploy frontend to Vercel with `NEXT_PUBLIC_BACKEND_URL` environment variable
3. Ensure the Railway URL is correct and accessible
4. Test all pages to ensure posts are loading correctly
5. Monitor logs for any remaining API errors

## Troubleshooting

If posts still don't load:
1. Check that `NEXT_PUBLIC_BACKEND_URL` is set correctly in Vercel
2. Verify the Railway backend is running and accessible
3. Check browser network tab for failed API requests
4. Verify CORS settings on the Railway backend 