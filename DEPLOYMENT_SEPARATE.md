# Separate Backend & Frontend Deployment

This project is now configured for separate deployments:
- **Backend**: Railway (Express.js API)
- **Frontend**: Vercel (Next.js)

## Backend Deployment (Railway)

### 1. Deploy Backend to Railway

```bash
# Navigate to server directory
cd server

# Deploy to Railway
railway up
```

### 2. Set Environment Variables in Railway

Set these environment variables in your Railway project:

```
DATABASE_URL=your_supabase_database_url
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
ENABLE_AUTO_POSTER=true
```

### 3. Get Backend URL

After deployment, note your Railway backend URL (e.g., `https://your-app.railway.app`)

## Frontend Deployment (Vercel)

### 1. Deploy Frontend to Vercel

```bash
# Navigate to frontend directory
cd frontend

# Deploy to Vercel
vercel --prod
```

### 2. Set Environment Variables in Vercel

Set this environment variable in your Vercel project:

```
NEXT_PUBLIC_BACKEND_URL=https://your-app.railway.app
```

**Important**: Make sure to use the exact Railway URL from your backend deployment.

## Architecture

- **Backend (Railway)**: Handles all API requests, database operations, and automation
- **Frontend (Vercel)**: Serves the Next.js application with server-side rendering
- **Communication**: Frontend fetches data from backend via API calls

## Benefits

1. **No Static Export Issues**: Frontend can use full Next.js features
2. **Better Performance**: Vercel's edge network for frontend, Railway for backend
3. **Scalability**: Each service can scale independently
4. **Development**: Easier local development with separate services

## Local Development

```bash
# Start backend
cd server && npm run dev

# Start frontend (in new terminal)
cd frontend && npm run dev
```

The frontend will automatically connect to the local backend on port 5001. 