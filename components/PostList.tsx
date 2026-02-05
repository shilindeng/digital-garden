'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from "next/link";

export function PostList() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        console.log('Fetching posts...');
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPosts(data || []);
      } catch (err: any) {
        console.error('Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) return <div className="p-4 text-zinc-500">Loading trends data...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="flex flex-col gap-4 p-2 h-full overflow-auto">
      {posts.map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}`} className="block p-3 border rounded hover:bg-zinc-900 transition">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-mono text-zinc-500">{new Date(post.created_at).toLocaleDateString()}</span>
            {post.tags?.[0] && <span className="text-[10px] bg-zinc-800 px-1 rounded">{post.tags[0]}</span>}
          </div>
          <h3 className="font-bold text-sm mb-1">{post.title}</h3>
          {post.excerpt && <p className="text-xs text-zinc-400 line-clamp-2">{post.excerpt}</p>}
        </Link>
      ))}
    </div>
  );
}
