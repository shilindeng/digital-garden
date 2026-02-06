'use client';

import { useState, useMemo, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SearchBar } from '@/components/SearchBar';
import { SourceFilter, SourceType } from '@/components/SourceFilter';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Tag, Search as SearchIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Post } from '@/lib/data';
import { createSearchIndex } from '@/lib/searchConfig';

function estimateReadingTime(content: string | null): number {
    if (!content) return 1;
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
}

const sourceLabels: Record<string, string> = {
    weibo: '微博',
    zhihu: '知乎',
    twitter: 'X',
};

interface BlogClientProps {
    initialPosts: Post[];
}

export function BlogClient({ initialPosts }: BlogClientProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSource, setSelectedSource] = useState<SourceType>('all');

    // 创建搜索索引
    const searchIndex = useMemo(() => createSearchIndex(initialPosts), [initialPosts]);

    // 计算各来源的文章数量
    const sourceCounts = useMemo(() => {
        const counts = {
            all: initialPosts.length,
            weibo: 0,
            zhihu: 0,
            twitter: 0,
        };

        initialPosts.forEach((post) => {
            if (post.source === 'weibo') counts.weibo++;
            else if (post.source === 'zhihu') counts.zhihu++;
            else if (post.source === 'twitter') counts.twitter++;
        });

        return counts;
    }, [initialPosts]);

    // 筛选和搜索逻辑
    const filteredPosts = useMemo(() => {
        let results = initialPosts;

        // 1. 按来源筛选
        if (selectedSource !== 'all') {
            results = results.filter((post) => post.source === selectedSource);
        }

        // 2. 搜索
        if (searchQuery.trim()) {
            const searchResults = searchIndex.search(searchQuery);
            const searchedIds = new Set(searchResults.map((r) => r.item.id));
            results = results.filter((post) => searchedIds.has(post.id));
        }

        return results;
    }, [initialPosts, selectedSource, searchQuery, searchIndex]);

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query);
    }, []);

    const handleSourceSelect = useCallback((source: SourceType) => {
        setSelectedSource(source);
    }, []);

    return (
        <>
            <Header />

            <main className="min-h-screen pt-24 pb-12 px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Hero Section */}
                    <div className="mb-8">
                        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                            <Tag className="w-3 h-3 mr-1" />
                            博客
                        </Badge>

                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-balance">
                            技术博客
                        </h1>

                        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-8">
                            关于 AI Agent、Web 开发与自动化工作流的思考与实践。
                        </p>

                        {/* 搜索栏 */}
                        <SearchBar
                            onSearch={handleSearch}
                            placeholder="搜索文章标题、内容或标签..."
                            className="mb-6"
                        />

                        {/* 来源筛选 */}
                        <SourceFilter
                            selected={selectedSource}
                            onSelect={handleSourceSelect}
                            counts={sourceCounts}
                        />
                    </div>

                    {/* 筛选结果提示 */}
                    {(searchQuery || selectedSource !== 'all') && (
                        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
                            <span>找到 {filteredPosts.length} 篇文章</span>
                            {searchQuery && (
                                <Badge variant="secondary" className="text-xs">
                                    关键词: {searchQuery}
                                </Badge>
                            )}
                            {selectedSource !== 'all' && (
                                <Badge variant="secondary" className="text-xs">
                                    来源: {sourceLabels[selectedSource]}
                                </Badge>
                            )}
                        </div>
                    )}

                    {/* Posts List */}
                    {filteredPosts.length === 0 ? (
                        <div className="text-center py-20">
                            <SearchIcon className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                            <h3 className="text-lg font-medium mb-2">
                                {searchQuery ? '未找到相关文章' : '暂无文章'}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                {searchQuery ? '尝试更改搜索关键词或筛选条件' : '敬请期待更多内容...'}
                            </p>
                            {(searchQuery || selectedSource !== 'all') && (
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setSelectedSource('all');
                                    }}
                                    className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover-lift"
                                >
                                    清除筛选
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {filteredPosts.map((post, index) => (
                                <Link
                                    key={post.id}
                                    href={`/blog/${post.slug}`}
                                    className="group block glass-card hover-lift rounded-2xl p-6 animate-in opacity-0"
                                    style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
                                >
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                        <div className="flex-1">
                                            {/* Tags & Source */}
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {post.source && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="text-xs font-semibold"
                                                    >
                                                        {sourceLabels[post.source] || post.source}
                                                    </Badge>
                                                )}
                                                {post.tags && post.tags.length > 0 && (
                                                    <>
                                                        {post.tags.slice(0, 2).map((tag: string) => (
                                                            <Badge
                                                                key={tag}
                                                                variant="outline"
                                                                className="text-xs"
                                                            >
                                                                {tag}
                                                            </Badge>
                                                        ))}
                                                    </>
                                                )}
                                            </div>

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
