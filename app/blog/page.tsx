import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { supabase } from '@/lib/supabaseClient';
import { BlogClient } from '@/components/BlogClient';

export const runtime = 'edge';
export const revalidate = 60;

async function getPosts() {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
    return data || [];
}

export default async function BlogPage() {
    const posts = await getPosts();

    return <BlogClient initialPosts={posts} />;
}
