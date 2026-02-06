import { supabase } from '@/lib/supabaseClient';
import { MetadataRoute } from 'next';

const BASE_URL = 'https://digital-garden-15m.pages.dev';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static pages
    const staticPages = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1,
        },
        {
            url: `${BASE_URL}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
    ];

    // Dynamic blog posts
    const { data: posts } = await supabase
        .from('posts')
        .select('slug, created_at')
        .eq('published', true)
        .order('created_at', { ascending: false });

    const blogPosts = (posts || []).map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.created_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [...staticPages, ...blogPosts];
}
