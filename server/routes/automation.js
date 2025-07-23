const express = require('express');
const router = express.Router();
const cronService = require('../services/cronService');
const { runAutoPoster } = require('../scripts/auto-poster');
const BlogPost = require('../models/BlogPost');

// Manual trigger for auto-poster (protected route)
router.post('/trigger-auto-poster', async (req, res) => {
  try {
    // Basic authentication check
    const { apiKey } = req.headers;
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    console.log('🚀 Manual auto-poster triggered');
    await cronService.triggerAutoPoster();

    res.json({ 
      message: 'Auto-poster completed successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in manual auto-poster:', error);
    res.status(500).json({ error: 'Failed to run auto-poster' });
  }
});

// Get auto-poster status
router.get('/auto-poster-status', async (req, res) => {
  try {
    const { apiKey } = req.headers;
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const status = cronService.getStatus();
    const weeklyStats = await cronService.getWeeklyStats();

    res.json({
      cronJobs: status,
      weeklyStats,
      autoPosterEnabled: process.env.ENABLE_AUTO_POSTER === 'true',
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting auto-poster status:', error);
    res.status(500).json({ error: 'Failed to get status' });
  }
});

// Start/stop cron service
router.post('/cron-control', async (req, res) => {
  try {
    const { apiKey } = req.headers;
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { action } = req.body;
    
    if (action === 'start') {
      cronService.start();
      res.json({ message: 'Cron service started' });
    } else if (action === 'stop') {
      cronService.stop();
      res.json({ message: 'Cron service stopped' });
    } else {
      res.status(400).json({ error: 'Invalid action. Use "start" or "stop"' });
    }
  } catch (error) {
    console.error('Error controlling cron service:', error);
    res.status(500).json({ error: 'Failed to control cron service' });
  }
});

// Test auto-poster with mock data
router.post('/test-auto-poster', async (req, res) => {
  try {
    const { apiKey } = req.headers;
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    console.log('🧪 Testing auto-poster with mock data...');
    
    // Run auto-poster (it will use mock data if no news API key)
    await runAutoPoster();

    res.json({
      message: 'Auto-poster test completed',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error testing auto-poster:', error);
    res.status(500).json({ error: 'Failed to test auto-poster' });
  }
});

// Get automation status and stats
router.get('/status', async (req, res) => {
  try {
    const { apiKey } = req.headers;
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get today's posts
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayPosts = await BlogPost.countDocuments({
      published_at: { $gte: today.toISOString(), $lt: tomorrow.toISOString() }
    });

    // Get total posts
    const totalPosts = await BlogPost.countDocuments();

    // Get AI-generated posts
    const aiGeneratedPosts = await BlogPost.countDocuments({ ai_generated: true });

    // Get recent activity
    const recentPosts = await BlogPost.find({}, 0, 5);

    res.json({
      status: 'active',
      todayPosts,
      totalPosts,
      aiGeneratedPosts,
      aiGeneratedRatio: totalPosts > 0 ? (aiGeneratedPosts / totalPosts * 100).toFixed(1) : 0,
      recentPosts: recentPosts.map(post => ({
        title: post.title,
        published_at: post.published_at,
        ai_generated: post.ai_generated,
        view_count: post.view_count
      })),
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting status:', error);
    res.status(500).json({ error: 'Failed to get status' });
  }
});

// Get automation logs
router.get('/logs', async (req, res) => {
  try {
    const { apiKey } = req.headers;
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get recent posts as logs
    const logs = await BlogPost.find({}, 0, 20);

    res.json({
      logs: logs.map(log => ({
        action: 'POST_CREATED',
        title: log.title,
        timestamp: log.published_at,
        ai_generated: log.ai_generated,
        source: log.source_url,
        category: log.category
      }))
    });
  } catch (error) {
    console.error('Error getting logs:', error);
    res.status(500).json({ error: 'Failed to get logs' });
  }
});

// Regenerate a specific post
router.post('/regenerate/:postId', async (req, res) => {
  try {
    const { apiKey } = req.headers;
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { postId } = req.params;
    const post = await BlogPost.findOne({ id: postId });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    console.log(`🔄 Regenerating post: ${post.title}`);

    // Generate new content using the auto-poster logic
    const mockTrendingTopic = {
      title: post.title,
      description: post.excerpt,
      url: post.source_url || 'https://example.com'
    };

    const blogData = await generateBlogPost(mockTrendingTopic);

    // Update the post
    const updatedPost = await supabase
      .from('blog_posts')
      .update({
        title: blogData.title,
        excerpt: blogData.excerpt,
        content: blogData.content,
        tags: blogData.tags,
        read_time: blogData.read_time,
        updated_at: new Date().toISOString()
      })
      .eq('id', postId)
      .select()
      .single();

    res.json({
      message: 'Post regenerated successfully',
      post: {
        title: updatedPost.data.title,
        slug: updatedPost.data.slug,
        published_at: updatedPost.data.published_at
      }
    });
  } catch (error) {
    console.error('Error regenerating post:', error);
    res.status(500).json({ error: 'Failed to regenerate post' });
  }
});

// Bulk operations
router.post('/bulk-action', async (req, res) => {
  try {
    const { apiKey } = req.headers;
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { action, postIds } = req.body;

    if (!action || !postIds || !Array.isArray(postIds)) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    let result;
    switch (action) {
      case 'publish':
        result = await supabase
          .from('blog_posts')
          .update({ is_published: true })
          .in('id', postIds);
        break;
      case 'unpublish':
        result = await supabase
          .from('blog_posts')
          .update({ is_published: false })
          .in('id', postIds);
        break;
      case 'delete':
        result = await supabase
          .from('blog_posts')
          .delete()
          .in('id', postIds);
        break;
      default:
        return res.status(400).json({ error: 'Invalid action' });
    }

    res.json({
      message: `Bulk action '${action}' completed`,
      affected: result.data?.length || 0
    });
  } catch (error) {
    console.error('Error in bulk action:', error);
    res.status(500).json({ error: 'Failed to perform bulk action' });
  }
});

module.exports = router; 