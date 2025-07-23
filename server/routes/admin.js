const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');

// Middleware to check admin authentication
const requireAuth = (req, res, next) => {
  const { apiKey } = req.headers;
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// Get all posts (including unpublished) for admin
router.get('/posts', requireAuth, async (req, res) => {
  try {
    const { page = 1, limit = 20, status, category } = req.query;
    const skip = (page - 1) * limit;

    let query = {};

    // Filter by status
    if (status === 'published') {
      query.isPublished = true;
    } else if (status === 'draft') {
      query.isPublished = false;
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    const posts = await BlogPost.find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    const total = await BlogPost.countDocuments(query);

    res.json({
      posts,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching admin posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Get a single post for editing
router.get('/posts/:id', requireAuth, async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ post });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// Create a new post
router.post('/posts', requireAuth, async (req, res) => {
  try {
    const {
      title,
      excerpt,
      content,
      category,
      tags,
      isPublished = false,
      seoTitle,
      seoDescription,
      keywords
    } = req.body;

    if (!title || !excerpt || !content || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const post = new BlogPost({
      title,
      excerpt,
      content,
      category,
      tags: tags || [],
      isPublished,
      seoTitle,
      seoDescription,
      keywords: keywords || []
    });

    await post.save();

    res.status(201).json({
      message: 'Post created successfully',
      post
    });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Update a post
router.put('/posts/:id', requireAuth, async (req, res) => {
  try {
    const {
      title,
      excerpt,
      content,
      category,
      tags,
      isPublished,
      seoTitle,
      seoDescription,
      keywords
    } = req.body;

    const post = await BlogPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Update fields
    if (title) post.title = title;
    if (excerpt) post.excerpt = excerpt;
    if (content) post.content = content;
    if (category) post.category = category;
    if (tags) post.tags = tags;
    if (typeof isPublished === 'boolean') post.isPublished = isPublished;
    if (seoTitle) post.seoTitle = seoTitle;
    if (seoDescription) post.seoDescription = seoDescription;
    if (keywords) post.keywords = keywords;

    await post.save();

    res.json({
      message: 'Post updated successfully',
      post
    });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// Delete a post
router.delete('/posts/:id', requireAuth, async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({
      message: 'Post deleted successfully',
      postId: req.params.id
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// Publish/unpublish a post
router.patch('/posts/:id/publish', requireAuth, async (req, res) => {
  try {
    const { isPublished } = req.body;
    
    const post = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { isPublished },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({
      message: `Post ${isPublished ? 'published' : 'unpublished'} successfully`,
      post
    });
  } catch (error) {
    console.error('Error updating post status:', error);
    res.status(500).json({ error: 'Failed to update post status' });
  }
});

// Get dashboard stats
router.get('/dashboard', requireAuth, async (req, res) => {
  try {
    // Total posts
    const totalPosts = await BlogPost.countDocuments();
    
    // Published posts
    const publishedPosts = await BlogPost.countDocuments({ isPublished: true });
    
    // Draft posts
    const draftPosts = await BlogPost.countDocuments({ isPublished: false });
    
    // Posts with backlinks
    const postsWithBacklinks = await BlogPost.countDocuments({ hasBacklink: true });
    
    // Today's posts
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const todayPosts = await BlogPost.countDocuments({
      publishedAt: { $gte: today, $lt: tomorrow }
    });
    
    // This week's posts
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const weekPosts = await BlogPost.countDocuments({
      publishedAt: { $gte: weekAgo }
    });
    
    // Category distribution
    const categoryStats = await BlogPost.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    // Recent posts
    const recentPosts = await BlogPost.find()
      .sort({ publishedAt: -1 })
      .limit(5)
      .select('title publishedAt isPublished viewCount');
    
    // Top performing posts (by views)
    const topPosts = await BlogPost.find({ viewCount: { $gt: 0 } })
      .sort({ viewCount: -1 })
      .limit(5)
      .select('title viewCount publishedAt');

    res.json({
      stats: {
        totalPosts,
        publishedPosts,
        draftPosts,
        postsWithBacklinks,
        todayPosts,
        weekPosts,
        backlinkRatio: totalPosts > 0 ? (postsWithBacklinks / totalPosts * 100).toFixed(1) : 0
      },
      categoryStats,
      recentPosts,
      topPosts
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// Get categories
router.get('/categories', requireAuth, async (req, res) => {
  try {
    const categories = await BlogPost.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Get tags
router.get('/tags', requireAuth, async (req, res) => {
  try {
    const tags = await BlogPost.aggregate([
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 50 }
    ]);

    res.json({ tags });
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
});

// Bulk operations
router.post('/bulk', requireAuth, async (req, res) => {
  try {
    const { action, postIds } = req.body;

    if (!action || !postIds || !Array.isArray(postIds)) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    let result;
    switch (action) {
      case 'publish':
        result = await BlogPost.updateMany(
          { _id: { $in: postIds } },
          { isPublished: true }
        );
        break;
      case 'unpublish':
        result = await BlogPost.updateMany(
          { _id: { $in: postIds } },
          { isPublished: false }
        );
        break;
      case 'delete':
        result = await BlogPost.deleteMany({ _id: { $in: postIds } });
        break;
      default:
        return res.status(400).json({ error: 'Invalid action' });
    }

    res.json({
      message: `Bulk action '${action}' completed`,
      affected: result.modifiedCount || result.deletedCount
    });
  } catch (error) {
    console.error('Error in bulk operation:', error);
    res.status(500).json({ error: 'Failed to perform bulk operation' });
  }
});

module.exports = router; 