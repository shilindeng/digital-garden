'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import Link from "next/link";

interface Post {
  title: string;
  slug: string;
  excerpt: string | null;
  created_at: string;
  tags: string[] | null;
}

export function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      console.log('Fetching posts from client...');
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    }

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col h-full space-y-4 p-4">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full space-y-4 overflow-y-auto pr-2 custom-scrollbar">
      {posts.length === 0 ? (
          <div className="text-muted-foreground text-sm p-4 text-center">No posts found.</div>
      ) : (
          posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
              <div className="group flex flex-col space-y-2 rounded-lg border p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-[10px] px-1 py-0">
                    {post.tags?.[0] || 'Uncategorized'}
                  </Badge>
                  <div className="flex items-center text-[10px] text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    {new Date(post.created_at).toLocaleDateString()}
                  </div>
                </div>
                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))
      )}
    </div>
  );
}
