# 🚀 Deployment Guide - SixFigurePayday Blog

## Quick Start (5 Minutes)

### 1. Environment Setup
```bash
# Copy environment file
cp env.example .env

# Edit with your settings
nano .env
```

**Required Environment Variables:**
```env
# OpenAI API Key (Get from: https://platform.openai.com/)
OPENAI_API_KEY=sk-your-key-here

# MongoDB URI (Use MongoDB Atlas for production)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sixfigurepayday

# Admin API Key (Generate a secure random string)
ADMIN_API_KEY=your-secure-admin-key-here

# Frontend URL (for production)
FRONTEND_URL=https://sixfigurepayday.com
```

### 2. Install Dependencies
```bash
# Run the setup script
./setup.sh

# Or manually:
npm run install:all
```

### 3. Start Development
```bash
# Start both frontend and backend
npm run dev

# Frontend: http://localhost:3000
# Backend: http://localhost:5000
```

## 🏗️ Production Deployment

### Frontend Deployment (Vercel - Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy Frontend**
   ```bash
   cd frontend
   vercel --prod
   ```

3. **Set Environment Variables in Vercel**
   - `BACKEND_URL`: Your backend API URL
   - `NEXT_PUBLIC_SITE_URL`: Your domain

### Backend Deployment (Railway/Heroku)

#### Option A: Railway (Recommended)
1. **Connect GitHub repository**
2. **Set environment variables:**
   - `MONGODB_URI`
   - `OPENAI_API_KEY`
   - `ADMIN_API_KEY`
   - `NODE_ENV=production`
3. **Deploy automatically**

#### Option B: Heroku
1. **Create Heroku app**
   ```bash
   heroku create sixfigurepayday-backend
   ```

2. **Set environment variables**
   ```bash
   heroku config:set MONGODB_URI=your-mongodb-uri
   heroku config:set OPENAI_API_KEY=your-openai-key
   heroku config:set ADMIN_API_KEY=your-admin-key
   heroku config:set NODE_ENV=production
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

### Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas account**
2. **Create new cluster**
3. **Get connection string**
4. **Add to environment variables**

## 🔧 Domain Configuration

### 1. Point Domain to Vercel
- Add domain in Vercel dashboard
- Update DNS records

### 2. Update Environment Variables
```env
FRONTEND_URL=https://sixfigurepayday.com
BACKEND_URL=https://your-backend-url.com
```

## 🤖 Automation Setup

### 1. Enable Cron Jobs
The system automatically starts cron jobs in production mode:
- **Daily content generation**: 9 AM EST
- **RSS backup scraping**: 3 PM EST
- **Weekly cleanup**: Sundays 2 AM EST

### 2. Manual Testing
```bash
# Test scraping service
curl -H "apiKey: your-admin-key" \
  https://your-backend-url.com/api/automation/test-scraping

# Test AI service
curl -X POST -H "apiKey: your-admin-key" \
  -H "Content-Type: application/json" \
  -d '{"content":"test content","title":"test title"}' \
  https://your-backend-url.com/api/automation/test-ai

# Manual trigger generation
curl -X POST -H "apiKey: your-admin-key" \
  https://your-backend-url.com/api/automation/generate
```

## 📊 Monitoring & Analytics

### 1. Check System Status
```bash
curl -H "apiKey: your-admin-key" \
  https://your-backend-url.com/api/automation/status
```

### 2. View Recent Logs
```bash
curl -H "apiKey: your-admin-key" \
  https://your-backend-url.com/api/automation/logs
```

### 3. Admin Dashboard Access
Use the admin API key to access:
- `/api/admin/dashboard` - Analytics
- `/api/admin/posts` - Post management
- `/api/admin/categories` - Category stats

## 🔒 Security Checklist

- [ ] HTTPS enabled on all domains
- [ ] Environment variables secured
- [ ] Admin API key is strong and unique
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] Database access restricted

## 📈 SEO Optimization

### 1. Verify Meta Tags
- Check Open Graph tags
- Verify Twitter Card tags
- Test structured data

### 2. Submit to Search Engines
- Google Search Console
- Bing Webmaster Tools
- Submit sitemap

### 3. Monitor Performance
- Core Web Vitals
- Page load speed
- Mobile responsiveness

## 🚨 Troubleshooting

### Common Issues:

1. **Frontend not loading posts**
   - Check `BACKEND_URL` environment variable
   - Verify backend is running
   - Check CORS settings

2. **AI generation failing**
   - Verify OpenAI API key
   - Check API quota/limits
   - Review error logs

3. **Scraping not working**
   - Check internet connectivity
   - Verify source URLs are accessible
   - Review rate limiting

4. **Database connection issues**
   - Verify MongoDB URI
   - Check network connectivity
   - Review database permissions

### Debug Commands:
```bash
# Check backend health
curl https://your-backend-url.com/health

# View backend logs
heroku logs --tail  # (Heroku)
railway logs        # (Railway)

# Test database connection
curl -H "apiKey: your-admin-key" \
  https://your-backend-url.com/api/admin/dashboard
```

## 🎯 Post-Deployment Checklist

- [ ] Frontend loads correctly
- [ ] Backend API responds
- [ ] Database connection working
- [ ] AI generation tested
- [ ] Scraping service tested
- [ ] Cron jobs enabled
- [ ] SSL certificates active
- [ ] Domain DNS configured
- [ ] SEO meta tags verified
- [ ] Admin dashboard accessible

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section
2. Review error logs
3. Verify environment variables
4. Test individual services
5. Check the README.md for detailed documentation

---

**Your SixFigurePayday blog is now live and generating content automatically! 🎉** 