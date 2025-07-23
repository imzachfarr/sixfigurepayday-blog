const { supabase } = require('../config/database');
const slugify = require('slugify');

class BlogPost {
  // Create a new blog post
  static async create(postData) {
    try {
      // Generate slug from title
      const slug = slugify(postData.title, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g
      });

      // Generate SEO fields if not provided
      const seoTitle = postData.seoTitle || postData.title;
      // Truncate excerpt to fit PostgreSQL varchar(300) constraint
      const seoDescription = postData.seoDescription || 
        (postData.excerpt && postData.excerpt.length > 300 
          ? postData.excerpt.substring(0, 297) + '...' 
          : postData.excerpt);

      // Ensure all text fields fit within PostgreSQL constraints
      const newPost = {
        slug: slug.substring(0, 200), // Limit slug length
        title: postData.title.substring(0, 200), // Limit title length
        excerpt: postData.excerpt.substring(0, 300), // Limit excerpt length
        content: postData.content.substring(0, 10000), // Limit content length (adjust as needed)
        seo_title: seoTitle.substring(0, 60), // Limit SEO title length
        seo_description: seoDescription, // Already truncated above
        // Ensure tags is an array and limit individual tag lengths
        tags: Array.isArray(postData.tags) 
          ? postData.tags.map(tag => tag.substring(0, 50)).filter(tag => tag.length > 0)
          : [],
        // Limit category and other text fields
        category: postData.category ? postData.category.substring(0, 50) : 'ai',
        source_title: postData.sourceTitle ? postData.sourceTitle.substring(0, 200) : null,
        // Limit URL field lengths
        image_url: postData.imageUrl ? postData.imageUrl.substring(0, 500) : null,
        source_url: postData.sourceUrl ? postData.sourceUrl.substring(0, 500) : null,
        backlink_url: postData.backlinkUrl ? postData.backlinkUrl.substring(0, 500) : null,
        // Ensure numeric fields are valid
        read_time: Math.max(1, Math.min(60, postData.readTime || 5)), // Between 1-60 minutes
        view_count: Math.max(0, postData.viewCount || 0), // Non-negative
        // Ensure boolean fields are valid
        is_published: Boolean(postData.isPublished !== false), // Default to true
        has_backlink: Boolean(postData.hasBacklink),
        ai_generated: Boolean(postData.aiGenerated !== false), // Default to true
        generation_date: postData.generationDate ? new Date(postData.generationDate).toISOString() : new Date().toISOString(),
        published_at: postData.publishedAt ? new Date(postData.publishedAt).toISOString() : new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('blog_posts')
        .insert([newPost])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating blog post:', error);
      throw error;
    }
  }

  // Find all posts with filters
  static async find(query = {}, skip = 0, limit = 10) {
    try {
      let supabaseQuery = supabase
        .from('blog_posts')
        .select('*');

      // Apply filters
      if (query.isPublished !== undefined) {
        supabaseQuery = supabaseQuery.eq('is_published', query.isPublished);
      }

      if (query.category) {
        supabaseQuery = supabaseQuery.eq('category', query.category.substring(0, 50));
      }

      if (query.tags) {
        // For tags, we'll need to use contains or overlap depending on the structure
        const safeTags = Array.isArray(query.tags) 
          ? query.tags.map(tag => tag.substring(0, 50)).filter(tag => tag.length > 0)
          : [];
        supabaseQuery = supabaseQuery.contains('tags', safeTags);
      }

      if (query.search) {
        // Limit search query length to prevent issues
        const searchTerm = query.search.substring(0, 100);
        supabaseQuery = supabaseQuery.or(
          `title.ilike.%${searchTerm}%,excerpt.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`
        );
      }

      // Apply sorting
      supabaseQuery = supabaseQuery.order('published_at', { ascending: false });

      // Apply pagination with safety checks
      const safeSkip = Math.max(0, skip);
      const safeLimit = Math.max(1, Math.min(100, limit)); // Ensure limit is between 1-100
      
      if (safeSkip > 0) {
        supabaseQuery = supabaseQuery.range(safeSkip, safeSkip + safeLimit - 1);
      } else {
        supabaseQuery = supabaseQuery.limit(safeLimit);
      }

      const { data, error } = await supabaseQuery;

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error finding blog posts:', error);
      throw error;
    }
  }

  // Find one post by slug
  static async findOne(query) {
    try {
      let supabaseQuery = supabase
        .from('blog_posts')
        .select('*');

      if (query.slug) {
        supabaseQuery = supabaseQuery.eq('slug', query.slug.substring(0, 200));
      }

      if (query.isPublished !== undefined) {
        supabaseQuery = supabaseQuery.eq('is_published', query.isPublished);
      }

      const { data, error } = await supabaseQuery.single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error finding blog post:', error);
      throw error;
    }
  }

  // Count documents
  static async countDocuments(query = {}) {
    try {
      let supabaseQuery = supabase
        .from('blog_posts')
        .select('*', { count: 'exact', head: true });

      // Apply filters
      if (query.isPublished !== undefined) {
        supabaseQuery = supabaseQuery.eq('is_published', query.isPublished);
      }

      if (query.category) {
        supabaseQuery = supabaseQuery.eq('category', query.category.substring(0, 50));
      }

      if (query.tags) {
        // Ensure tags is an array and limit individual tag lengths
        const safeTags = Array.isArray(query.tags) 
          ? query.tags.map(tag => tag.substring(0, 50)).filter(tag => tag.length > 0)
          : [];
        supabaseQuery = supabaseQuery.contains('tags', safeTags);
      }

      if (query.search) {
        // Limit search query length to prevent issues
        const searchTerm = query.search.substring(0, 100);
        supabaseQuery = supabaseQuery.or(
          `title.ilike.%${searchTerm}%,excerpt.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`
        );
      }

      const { count, error } = await supabaseQuery;

      if (error) throw error;
      return count;
    } catch (error) {
      console.error('Error counting blog posts:', error);
      throw error;
    }
  }

  // Get posts by category
  static async getByCategory(category, limit = 10) {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('category', category ? category.substring(0, 50) : 'ai')
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .limit(Math.max(1, Math.min(50, limit))); // Ensure limit is between 1-50

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting posts by category:', error);
      throw error;
    }
  }

  // Get related posts
  static async getRelated(currentPostId, category, tags, limit = 3) {
    try {
      // Ensure tags is an array and limit individual tag lengths
      const safeTags = Array.isArray(tags) 
        ? tags.map(tag => tag.substring(0, 50)).filter(tag => tag.length > 0)
        : [];
      
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .neq('id', currentPostId)
        .eq('category', category ? category.substring(0, 50) : 'ai')
        .eq('is_published', true)
        .overlaps('tags', safeTags)
        .order('published_at', { ascending: false })
        .limit(Math.max(1, Math.min(10, limit))); // Ensure limit is between 1-10

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting related posts:', error);
      throw error;
    }
  }

  // Increment view count
  static async incrementViews(postId) {
    try {
      // First get the current view count
      const { data: currentPost, error: fetchError } = await supabase
        .from('blog_posts')
        .select('view_count')
        .eq('id', postId)
        .single();

      if (fetchError) throw fetchError;

      // Update with incremented count
      const { data, error } = await supabase
        .from('blog_posts')
        .update({ 
          view_count: Math.max(0, (currentPost.view_count || 0) + 1), // Ensure non-negative
          updated_at: new Date().toISOString()
        })
        .eq('id', postId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error incrementing view count:', error);
      throw error;
    }
  }

  // Aggregate for category stats
  static async aggregate(pipeline) {
    try {
      // For category stats
      if (pipeline[0]?.$match?.isPublished === true && pipeline[1]?.$group?._id === '$category') {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('category')
          .eq('is_published', true);

        if (error) throw error;

        // Group by category and count
        const categoryCounts = data.reduce((acc, post) => {
          const safeCategory = post.category ? post.category.substring(0, 50) : 'ai';
          acc[safeCategory] = (acc[safeCategory] || 0) + 1;
          return acc;
        }, {});

        return Object.entries(categoryCounts).map(([category, count]) => ({
          _id: category,
          count
        })).sort((a, b) => b.count - a.count);
      }

      // For tag stats
      if (pipeline[0]?.$match?.isPublished === true && pipeline[1]?.$unwind === '$tags') {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('tags')
          .eq('is_published', true);

        if (error) throw error;

        // Flatten tags and count
        const tagCounts = {};
        data.forEach(post => {
          if (post.tags && Array.isArray(post.tags)) {
            post.tags.forEach(tag => {
              const safeTag = tag ? tag.substring(0, 50) : '';
              if (safeTag.length > 0) {
                tagCounts[safeTag] = (tagCounts[safeTag] || 0) + 1;
              }
            });
          }
        });

        return Object.entries(tagCounts)
          .map(([tag, count]) => ({ _id: tag, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 20);
      }

      throw new Error('Unsupported aggregation pipeline');
    } catch (error) {
      console.error('Error in aggregation:', error);
      throw error;
    }
  }
}

module.exports = BlogPost; 