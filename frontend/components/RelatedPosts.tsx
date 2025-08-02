'use client'

import Link from 'next/link'
import { trackBlogEngagement, trackZephryxLabsEngagement } from '../utils/analytics'
import { safeFormatDateShort } from '../utils/dateUtils'

interface BlogPost {
  id: string
  title: string
  slug: string
  published_at: string
  read_time: number
  category: string
}

interface RelatedPostsProps {
  posts: BlogPost[]
  currentPostSlug: string
}

export default function RelatedPosts({ posts, currentPostSlug }: RelatedPostsProps) {
  const handleRelatedPostClick = (relatedPost: BlogPost) => {
    trackBlogEngagement('click_related', relatedPost.slug, relatedPost.category);
    if (relatedPost.category === 'zephryx-labs') {
      trackZephryxLabsEngagement('click_related', relatedPost.slug);
    }
  };

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="sidebar-heading">Related Articles</h3>
      <div className="space-y-4">
        {posts.map((relatedPost) => (
          <Link
            key={relatedPost.id}
            href={`/blog/${relatedPost.slug}`}
            className="block group"
            onClick={() => handleRelatedPostClick(relatedPost)}
          >
            <article className="sidebar-article">
              <h4 className="sidebar-title">
                {relatedPost.title}
              </h4>
              <div className="sidebar-meta">
                <span>{safeFormatDateShort(relatedPost.published_at)}</span>
                <span>•</span>
                <span>{relatedPost.read_time} min read</span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
} 