const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');

// Get all published blog posts
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, tag, search } = req.query;
    const skip = (page - 1) * limit;

    let query = { isPublished: true };

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by tag
    if (tag) {
      query.tags = [tag];
    }

    // Search functionality
    if (search) {
      query.search = search;
    }

    const posts = await BlogPost.find(query, skip, parseInt(limit));
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
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

// Get a single blog post by slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    const post = await BlogPost.findOne({ 
      slug, 
      isPublished: true 
    });

    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Increment view count
    await BlogPost.incrementViews(post.id);

    // Get related posts
    const relatedPosts = await BlogPost.getRelated(
      post.id,
      post.category,
      post.tags,
      3
    );

    res.json({
      post,
      relatedPosts
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
});

// Get posts by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const posts = await BlogPost.find({ 
      category, 
      isPublished: true 
    }, skip, parseInt(limit));

    const total = await BlogPost.countDocuments({ 
      category, 
      isPublished: true 
    });

    res.json({
      posts,
      category,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching category posts:', error);
    res.status(500).json({ error: 'Failed to fetch category posts' });
  }
});

// Get posts by tag
router.get('/tag/:tag', async (req, res) => {
  try {
    const { tag } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const posts = await BlogPost.find({ 
      tags: [tag],
      isPublished: true 
    }, skip, parseInt(limit));

    const total = await BlogPost.countDocuments({ 
      tags: [tag],
      isPublished: true 
    });

    res.json({
      posts,
      tag,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching tag posts:', error);
    res.status(500).json({ error: 'Failed to fetch tag posts' });
  }
});

// Get recent posts
router.get('/recent/:limit?', async (req, res) => {
  try {
    const limit = parseInt(req.params.limit) || 5;

    const posts = await BlogPost.find({ isPublished: true }, 0, limit);

    res.json({ posts });
  } catch (error) {
    console.error('Error fetching recent posts:', error);
    res.status(500).json({ error: 'Failed to fetch recent posts' });
  }
});

// Get popular posts (by view count)
router.get('/popular/:limit?', async (req, res) => {
  try {
    const limit = parseInt(req.params.limit) || 5;

    const posts = await BlogPost.find({ 
      isPublished: true
    }, 0, limit);

    res.json({ posts });
  } catch (error) {
    console.error('Error fetching popular posts:', error);
    res.status(500).json({ error: 'Failed to fetch popular posts' });
  }
});

// Search posts
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const searchQuery = {
      isPublished: true,
      search: query
    };

    const posts = await BlogPost.find(searchQuery, skip, parseInt(limit));
    const total = await BlogPost.countDocuments(searchQuery);

    res.json({
      posts,
      query,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error searching posts:', error);
    res.status(500).json({ error: 'Failed to search posts' });
  }
});

// Get categories with post counts
router.get('/categories/stats', async (req, res) => {
  try {
    const stats = await BlogPost.aggregate([
      { $match: { isPublished: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({ categories: stats });
  } catch (error) {
    console.error('Error fetching category stats:', error);
    res.status(500).json({ error: 'Failed to fetch category stats' });
  }
});

// Get tags with post counts
router.get('/tags/stats', async (req, res) => {
  try {
    const stats = await BlogPost.aggregate([
      { $match: { isPublished: true } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);

    res.json({ tags: stats });
  } catch (error) {
    console.error('Error fetching tag stats:', error);
    res.status(500).json({ error: 'Failed to fetch tag stats' });
  }
});

module.exports = router; 