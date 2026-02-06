import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Tag, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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

function estimateReadingTime(content: string | null): number {
    if (!content) return 1;
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export default async function BlogPage() {
    const posts = await getPosts();

    return (
        <>
            <Header />

            <main className="min-h-screen pt-24 pb-12 px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Hero Section */}
                    <div className="mb-12">
                        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                            <Tag className="w-3 h-3 mr-1" />
                            博客
                        </Badge>

                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-balance">
                            技术博客
                        </h1>

                        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                            关于 AI Agent、Web 开发与自动化工作流的思考与实践。
                        </p>
                    </div>

                    {/* Posts List */}
                    {posts.length === 0 ? (
                        <div className="text-center py-20">
                            <Search className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                            <h3 className="text-lg font-medium mb-2">暂无文章</h3>
                            <p className="text-sm text-muted-foreground">
                                敬请期待更多内容...
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {posts.map((post, index) => (
                                <Link
                                    key={post.id}
                                    href={`/blog/${post.slug}`}
                                    className="group block glass-card hover-lift rounded-2xl p-6 animate-in opacity-0"
                                    style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                                >
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                        <div className="flex-1">
                                            {/* Tags */}
                                            {post.tags && post.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {post.tags.slice(0, 3).map((tag: string) => (
                                                        <Badge
                                                            key={tag}
                                                            variant="secondary"
                                                            className="text-xs"
                                                        >
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Title */}
                                            <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                                {post.title}
                                            </h2>

                                            {/* Excerpt */}
                                            {post.excerpt && (
                                                <p className="text-muted-foreground line-clamp-2 mb-4">
                                                    {post.excerpt}
                                                </p>
                                            )}

                                            {/* Meta */}
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    {new Date(post.created_at).toLocaleDateString('zh-CN', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                    })}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    {estimateReadingTime(post.content)} 分钟阅读
                                                </span>
                                            </div>
                                        </div>

                                        {/* Arrow */}
                                        <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-muted/50 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
}
