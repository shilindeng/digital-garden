import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, ChevronLeft, ChevronRight, Share2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Metadata } from 'next';

export const runtime = 'edge';
export const revalidate = 60;

interface Post {
  id: number;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  tags: string[] | null;
  created_at: string;
}

async function getPost(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching post:', error);
    return null;
  }
  return data;
}

async function getAdjacentPosts(currentDate: string) {
  const [prevResult, nextResult] = await Promise.all([
    supabase
      .from('posts')
      .select('slug, title')
      .eq('published', true)
      .lt('created_at', currentDate)
      .order('created_at', { ascending: false })
      .limit(1),
    supabase
      .from('posts')
      .select('slug, title')
      .eq('published', true)
      .gt('created_at', currentDate)
      .order('created_at', { ascending: true })
      .limit(1),
  ]);

  return {
    prev: prevResult.data?.[0] || null,
    next: nextResult.data?.[0] || null,
  };
}

function estimateReadingTime(content: string | null): number {
  if (!content) return 1;
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: '文章未找到' };
  }

  return {
    title: post.title,
    description: post.excerpt || `阅读 ${post.title}`,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      type: 'article',
      publishedTime: post.created_at,
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return notFound();
  }

  const adjacentPosts = await getAdjacentPosts(post.created_at);
  const readingTime = estimateReadingTime(post.content);

  return (
    <>
      <Header />

      <main className="min-h-screen pt-24 pb-12 px-4 md:px-6">
        <article className="max-w-3xl mx-auto">
          {/* Navigation */}
          <Link
            href="/blog"
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">返回博客</span>
          </Link>

          {/* Header */}
          <header className="mb-12">
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-balance gradient-text">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-8 border-b border-border/50">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(post.created_at).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {readingTime} 分钟阅读
              </span>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-lg prose-emerald dark:prose-invert max-w-none mb-16">
            <MarkdownRenderer content={post.content} />
          </div>

          {/* Share Section */}
          <div className="flex items-center justify-center gap-4 py-8 border-t border-b border-border/50 mb-12">
            <span className="text-sm text-muted-foreground">分享文章</span>
            <button
              className="p-2.5 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all hover-lift"
              aria-label="分享"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Adjacent Posts Navigation */}
          <nav className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {adjacentPosts.prev ? (
              <Link
                href={`/blog/${adjacentPosts.prev.slug}`}
                className="group glass-card hover-lift rounded-xl p-5"
              >
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <ChevronLeft className="w-4 h-4" />
                  上一篇
                </div>
                <h4 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                  {adjacentPosts.prev.title}
                </h4>
              </Link>
            ) : (
              <div />
            )}

            {adjacentPosts.next && (
              <Link
                href={`/blog/${adjacentPosts.next.slug}`}
                className="group glass-card hover-lift rounded-xl p-5 text-right"
              >
                <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground mb-2">
                  下一篇
                  <ChevronRight className="w-4 h-4" />
                </div>
                <h4 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                  {adjacentPosts.next.title}
                </h4>
              </Link>
            )}
          </nav>
        </article>
      </main>

      <Footer />
    </>
  );
}
