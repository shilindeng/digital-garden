'use client';

import { Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
    className?: string;
}

export function SearchBar({
    onSearch,
    placeholder = '搜索文章...',
    className
}: SearchBarProps) {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        const handler = setTimeout(() => {
            onSearch(query);
        }, 300); // 防抖 300ms

        return () => clearTimeout(handler);
    }, [query, onSearch]);

    const handleClear = () => {
        setQuery('');
        onSearch('');
    };

    return (
        <div
            className={cn(
                'relative flex items-center gap-2 px-4 py-3 rounded-xl glass-card transition-all duration-300',
                isFocused && 'ring-2 ring-primary/20',
                className
            )}
        >
            <Search className={cn(
                'w-5 h-5 transition-colors',
                isFocused ? 'text-primary' : 'text-muted-foreground'
            )} />

            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            />

            {query && (
                <button
                    onClick={handleClear}
                    className="p-1 rounded-full hover:bg-muted/50 transition-colors"
                    aria-label="清除搜索"
                >
                    <X className="w-4 h-4 text-muted-foreground" />
                </button>
            )}

            {/* 快捷键提示 */}
            {!query && !isFocused && (
                <kbd className="hidden md:flex items-center gap-1 px-2 py-1 text-xs bg-muted/50 rounded border border-border/50">
                    <span className="text-muted-foreground">⌘K</span>
                </kbd>
            )}
        </div>
    );
}
