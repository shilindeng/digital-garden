'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from "next/link";
import { Loader2 } from "lucide-react";

export function PostList() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        console.log('Fetching posts...');
        // Only fetch trends posts (exclude hardcoded ones if needed)
        // Use default anon key config
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false })
          .limit(10); // Limit to 10 latest

        if (error) {
          console.error('Supabase fetch error:', error);
          throw error;
        }
        
        console.log('Posts fetched:', data?.length);
        setPosts(data || []);
      } catch (err: any) {
        console.error('Error in fetchPosts:', err);
        setError(err.message || 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[100px] text-muted-foreground gap-2">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="text-xs">Loading trends...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[100px] text-red-500 gap-2 p-4 border border-red-500/20 bg-red-500/5 rounded-lg">
        <span className="text-xs font-semibold">Error loading data</span>
        <span className="text-[10px] opacity-75 text-center">{error}</span>
        <button 
          onClick={() => window.location.reload()} 
          className="text-[10px] underline hover:text-red-400 mt-1"
        >
          Retry
        </button>
      </div>
    );
  }

  if (posts.length === 0) {
     return (
      <div className="flex items-center justify-center h-full min-h-[100px] text-muted-foreground">
        <span className="text-xs">No posts found.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 p-1 h-full overflow-y-auto custom-scrollbar pr-2 max-h-[300px]">
      {posts.map((post) => (
        <Link 
          key={post.id} 
          href={`/blog/${post.slug}`} 
          className="group block p-3 rounded-lg border bg-card hover:bg-accent hover:text-accent-foreground transition-all"
        >
          <div className="flex justify-between items-center mb-1.5">
            <div className="flex items-center gap-2">
               {post.tags?.[0] && (
                 <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                   {post.tags[0]}
                 </span>
               )}
            </div>
            <span className="text-[10px] text-muted-foreground font-mono">
              {new Date(post.created_at).toLocaleDateString('zh-CN')}
            </span>
          </div>
          <h3 className="font-semibold text-sm leading-tight mb-1 group-hover:underline decoration-primary decoration-2 underline-offset-2">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </Link>
      ))}
    </div>
  );
}
