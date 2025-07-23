# SixFigurePayday - AI & Online Money Making Blog

A fully functional, modern blog platform built with Next.js, Express.js, and Supabase. This application showcases AI-powered content creation and provides insights on entrepreneurship, digital marketing, and online business strategies.

## 🚀 Features

### Frontend (Next.js 14)
- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **Server-Side Rendering**: Optimized for SEO and performance
- **Dynamic Blog Posts**: Individual post pages with rich content
- **Category Filtering**: Browse posts by category
- **Search Functionality**: Find relevant content quickly
- **Newsletter Signup**: Email collection for marketing
- **Social Media Integration**: Share buttons and social links

### Backend (Express.js)
- **RESTful API**: Complete CRUD operations for blog posts
- **Database Integration**: Supabase PostgreSQL for data storage
- **Content Management**: Admin routes for post management
- **Automation Services**: AI-powered content generation
- **Image Service**: Automated image generation and optimization
- **Cron Jobs**: Scheduled content creation and updates

### Database (Supabase)
- **PostgreSQL**: Reliable, scalable database
- **Real-time Updates**: Live data synchronization
- **Row Level Security**: Secure data access
- **Automated Backups**: Data protection and recovery

## 📦 Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **date-fns**: Date formatting and manipulation
- **React Hooks**: State management and side effects

### Backend
- **Express.js**: Node.js web framework
- **Supabase**: Database and authentication
- **OpenAI API**: AI content generation
- **Puppeteer**: Web scraping and automation
- **Node-cron**: Scheduled task execution
- **Helmet**: Security middleware
- **CORS**: Cross-origin resource sharing

### Database
- **PostgreSQL**: Primary database
- **Supabase**: Database hosting and management
- **Row Level Security**: Data access control

## 🏗️ Project Structure

```
sixfigurepayday/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # App Router pages
│   │   ├── api/            # API routes
│   │   ├── blog/           # Blog post pages
│   │   └── globals.css     # Global styles
│   ├── components/         # React components
│   └── package.json        # Frontend dependencies
├── server/                  # Express.js backend
│   ├── config/             # Database configuration
│   ├── models/             # Data models
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   └── package.json        # Backend dependencies
├── .env                     # Environment variables
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sixfigurepayday
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Set up database**
   ```bash
   # Run the Supabase setup script
   node setup-supabase.js
   ```

5. **Start development servers**
   ```bash
   npm run dev
   ```

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5001
FRONTEND_URL=http://localhost:3000

# Database Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# Admin Authentication
ADMIN_API_KEY=your_secure_admin_api_key

# Optional: Image Generation
ENABLE_IMAGE_GENERATION=false
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```

## 📝 API Endpoints

### Blog Posts
- `GET /api/blog` - Get all published posts
- `GET /api/blog/:slug` - Get specific post by slug
- `GET /api/blog/category/:category` - Get posts by category
- `GET /api/blog/tag/:tag` - Get posts by tag
- `GET /api/blog/recent/:limit` - Get recent posts
- `GET /api/blog/popular/:limit` - Get popular posts
- `GET /api/blog/search/:query` - Search posts

### Admin (Protected)
- `POST /api/admin/posts` - Create new post
- `PUT /api/admin/posts/:id` - Update post
- `DELETE /api/admin/posts/:id` - Delete post
- `POST /api/admin/generate` - Generate AI content

### Automation
- `POST /api/automation/scrape` - Scrape content
- `POST /api/automation/generate` - Generate content
- `POST /api/automation/publish` - Publish content

## 🎨 Features in Detail

### Content Management
- **AI-Powered Content**: Automated article generation using OpenAI
- **SEO Optimization**: Built-in SEO fields and meta tags
- **Category System**: Organized content by topics
- **Tag System**: Flexible tagging for better discovery
- **Draft System**: Save posts as drafts before publishing

### User Experience
- **Responsive Design**: Works on all devices
- **Fast Loading**: Optimized images and code splitting
- **Search**: Find content quickly
- **Navigation**: Easy category and tag browsing
- **Social Sharing**: Share posts on social media

### Performance
- **Server-Side Rendering**: Fast initial page loads
- **Static Generation**: Pre-built pages for better performance
- **Image Optimization**: Automatic image compression
- **Caching**: Intelligent caching strategies

## 🔧 Development

### Running Locally

1. **Start backend server**
   ```bash
   cd server
   npm run dev
   ```

2. **Start frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001

### Database Management

The application uses Supabase for database management. Key tables:

- `blog_posts`: Main content storage
- `categories`: Content categorization
- `tags`: Content tagging system
- `users`: User management (if needed)

### Content Generation

The system includes automated content generation:

1. **Web Scraping**: Collect relevant content from the web
2. **AI Processing**: Use OpenAI to rewrite and enhance content
3. **SEO Optimization**: Add meta tags and keywords
4. **Image Generation**: Create relevant images
5. **Scheduling**: Automatically publish content

## 🚀 Deployment

### Frontend Deployment
- **Vercel**: Recommended for Next.js applications
- **Netlify**: Alternative hosting option
- **AWS Amplify**: Enterprise hosting solution

### Backend Deployment
- **Railway**: Easy Node.js deployment
- **Heroku**: Traditional hosting platform
- **AWS EC2**: Full control over server

### Database
- **Supabase**: Managed PostgreSQL hosting
- **AWS RDS**: Enterprise database solution

## 📊 Monitoring & Analytics

- **Performance Monitoring**: Track page load times
- **Error Tracking**: Monitor application errors
- **User Analytics**: Understand user behavior
- **SEO Tracking**: Monitor search engine rankings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples

## 🎯 Roadmap

- [ ] User authentication and profiles
- [ ] Comment system
- [ ] Newsletter automation
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Advanced AI features
- [ ] E-commerce integration

---

**Built with ❤️ for entrepreneurs and digital marketers** 