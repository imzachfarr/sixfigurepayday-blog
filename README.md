# SixFigurePayday Blog System 🚀

An automated AI-powered blog system for sixfigurepayday.com that generates, publishes, and manages content automatically.

## 🎯 Features

- **AI-Powered Content Generation**: Automated blog post creation using OpenAI
- **Smart SEO Optimization**: Built-in SEO features for better search rankings
- **Automated Publishing**: Scheduled content publishing with cron jobs
- **Image Integration**: Automatic Unsplash image fetching
- **Modern UI**: Beautiful, responsive frontend built with Next.js
- **Real-time Updates**: Live content updates and management
- **Database Integration**: Supabase-powered data management

## 🏗️ Architecture

- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **Backend**: Express.js with Node.js
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Railway (Full-stack deployment)
- **AI Services**: OpenAI API integration

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- OpenAI API key

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd sixfigurepayday
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your API keys and database URLs
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

### Railway Deployment

1. **Connect to Railway**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login to Railway
   railway login
   
   # Deploy to Railway
   railway up
   ```

2. **Set environment variables in Railway dashboard**

3. **Your app will be live at the provided Railway URL**

## 📁 Project Structure

```
sixfigurepayday/
├── frontend/          # Next.js frontend application
├── server/           # Express.js backend API
├── scripts/          # Utility and automation scripts
├── services/         # Business logic services
└── config/          # Configuration files
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Unsplash
UNSPLASH_ACCESS_KEY=your_unsplash_access_key

# App Configuration
NODE_ENV=production
PORT=5001
FRONTEND_URL=https://your-domain.com
ENABLE_AUTO_POSTER=true
```

## 🤖 Automation Features

- **Auto-poster**: Scheduled content generation and publishing
- **Image Service**: Automatic image fetching from Unsplash
- **SEO Optimization**: Built-in SEO features
- **Content Management**: Automated content curation

## 📊 API Endpoints

- `GET /api/health` - Health check
- `GET /api/blog` - Get all blog posts
- `POST /api/blog` - Create new blog post
- `GET /api/blog/:slug` - Get specific blog post
- `GET /api/admin` - Admin endpoints
- `POST /api/automation` - Automation triggers

## 🚀 Deployment

This project is configured for Railway deployment with:

- **railway.json**: Railway-specific configuration
- **Procfile**: Process management
- **Health checks**: Automatic health monitoring
- **Environment variables**: Secure configuration management

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Built with ❤️ for SixFigurePayday** 