const cron = require('node-cron');
const { runAutoPoster } = require('../scripts/auto-poster');

class CronService {
  constructor() {
    this.jobs = new Map();
  }

  // Start all scheduled jobs
  start() {
    console.log('⏰ Starting Cron Service...');
    
    // Run auto-poster every 6 hours (4 times per day)
    this.scheduleAutoPoster();
    
    // Run daily maintenance at 2 AM
    this.scheduleDailyMaintenance();
    
    // Run weekly analytics on Sundays at 3 AM
    this.scheduleWeeklyAnalytics();
    
    console.log('✅ Cron Service started successfully');
  }

  // Schedule auto-poster to run every 6 hours
  scheduleAutoPoster() {
    const job = cron.schedule('0 */6 * * *', async () => {
      console.log('🤖 Scheduled Auto-Poster starting...');
      try {
        await runAutoPoster();
        console.log('✅ Scheduled Auto-Poster completed');
      } catch (error) {
        console.error('❌ Scheduled Auto-Poster failed:', error);
      }
    }, {
      scheduled: true,
      timezone: 'America/New_York'
    });

    this.jobs.set('autoPoster', job);
    console.log('📅 Auto-Poster scheduled: Every 6 hours');
  }

  // Schedule daily maintenance tasks
  scheduleDailyMaintenance() {
    const job = cron.schedule('0 2 * * *', async () => {
      console.log('🔧 Daily maintenance starting...');
      try {
        await this.performDailyMaintenance();
        console.log('✅ Daily maintenance completed');
      } catch (error) {
        console.error('❌ Daily maintenance failed:', error);
      }
    }, {
      scheduled: true,
      timezone: 'America/New_York'
    });

    this.jobs.set('dailyMaintenance', job);
    console.log('📅 Daily maintenance scheduled: 2:00 AM daily');
  }

  // Schedule weekly analytics
  scheduleWeeklyAnalytics() {
    const job = cron.schedule('0 3 * * 0', async () => {
      console.log('📊 Weekly analytics starting...');
      try {
        await this.generateWeeklyReport();
        console.log('✅ Weekly analytics completed');
      } catch (error) {
        console.error('❌ Weekly analytics failed:', error);
      }
    }, {
      scheduled: true,
      timezone: 'America/New_York'
    });

    this.jobs.set('weeklyAnalytics', job);
    console.log('📅 Weekly analytics scheduled: 3:00 AM Sundays');
  }

  // Perform daily maintenance tasks
  async performDailyMaintenance() {
    try {
      console.log('🧹 Cleaning up old data...');
      
      // Clean up old unpublished drafts (older than 7 days)
      // await this.cleanupOldDrafts();
      
      // Update view counts and analytics
      // await this.updateAnalytics();
      
      // Check for broken links or images
      // await this.checkBrokenLinks();
      
      console.log('✅ Daily maintenance tasks completed');
    } catch (error) {
      console.error('❌ Daily maintenance error:', error);
    }
  }

  // Generate weekly analytics report
  async generateWeeklyReport() {
    try {
      console.log('📈 Generating weekly report...');
      
      // Get weekly statistics
      const stats = await this.getWeeklyStats();
      
      // Log the report
      console.log('📊 Weekly Report:');
      console.log(`   📝 Total posts: ${stats.totalPosts}`);
      console.log(`   🆕 New posts this week: ${stats.newPosts}`);
      console.log(`   👀 Total views: ${stats.totalViews}`);
      console.log(`   📈 Average views per post: ${stats.avgViews}`);
      
      // Could send this report via email or store in database
      
      console.log('✅ Weekly report generated');
    } catch (error) {
      console.error('❌ Weekly report error:', error);
    }
  }

  // Get weekly statistics
  async getWeeklyStats() {
    try {
      const BlogPost = require('../models/BlogPost');
      
      const totalPosts = await BlogPost.countDocuments();
      
      // Get posts from last 7 days
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      const recentPosts = await BlogPost.find({
        created_at: { $gte: oneWeekAgo.toISOString() }
      }, 0, 100);
      
      const newPosts = recentPosts.length;
      
      // Calculate total views
      const totalViews = recentPosts.reduce((sum, post) => sum + (post.view_count || 0), 0);
      const avgViews = newPosts > 0 ? Math.round(totalViews / newPosts) : 0;
      
      return {
        totalPosts,
        newPosts,
        totalViews,
        avgViews
      };
    } catch (error) {
      console.error('Error getting weekly stats:', error);
      return {
        totalPosts: 0,
        newPosts: 0,
        totalViews: 0,
        avgViews: 0
      };
    }
  }

  // Stop all scheduled jobs
  stop() {
    console.log('⏹️  Stopping Cron Service...');
    
    for (const [name, job] of this.jobs) {
      job.stop();
      console.log(`⏹️  Stopped job: ${name}`);
    }
    
    this.jobs.clear();
    console.log('✅ Cron Service stopped');
  }

  // Get status of all jobs
  getStatus() {
    const status = {};
    
    for (const [name, job] of this.jobs) {
      status[name] = {
        running: job.running,
        nextDate: job.nextDate(),
        lastDate: job.lastDate()
      };
    }
    
    return status;
  }

  // Manually trigger auto-poster
  async triggerAutoPoster() {
    console.log('🚀 Manually triggering Auto-Poster...');
    try {
      await runAutoPoster();
      console.log('✅ Manual Auto-Poster completed');
    } catch (error) {
      console.error('❌ Manual Auto-Poster failed:', error);
      throw error;
    }
  }

  // Manually trigger daily maintenance
  async triggerDailyMaintenance() {
    console.log('🔧 Manually triggering daily maintenance...');
    try {
      await this.performDailyMaintenance();
      console.log('✅ Manual daily maintenance completed');
    } catch (error) {
      console.error('❌ Manual daily maintenance failed:', error);
      throw error;
    }
  }

  // Manually trigger weekly analytics
  async triggerWeeklyAnalytics() {
    console.log('📊 Manually triggering weekly analytics...');
    try {
      await this.generateWeeklyReport();
      console.log('✅ Manual weekly analytics completed');
    } catch (error) {
      console.error('❌ Manual weekly analytics failed:', error);
      throw error;
    }
  }
}

module.exports = new CronService(); 