'use client';

import { cn } from '@/lib/utils';
import { Hash, TrendingUp } from 'lucide-react';

type SourceType = 'all' | 'weibo' | 'zhihu' | 'twitter';

interface SourceFilterProps {
    selected: SourceType;
    onSelect: (source: SourceType) => void;
    counts?: Record<SourceType, number>;
}

const sources = [
    { value: 'all' as const, label: '全部', icon: Hash },
    { value: 'weibo' as const, label: '微博', icon: TrendingUp, color: 'text-red-500' },
    { value: 'zhihu' as const, label: '知乎', icon: TrendingUp, color: 'text-blue-500' },
    { value: 'twitter' as const, label: 'X', icon: TrendingUp, color: 'text-sky-500' },
];

export function SourceFilter({ selected, onSelect, counts }: SourceFilterProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {sources.map(({ value, label, icon: Icon, color }) => {
                const isSelected = selected === value;
                const count = counts?.[value];

                return (
                    <button
                        key={value}
                        onClick={() => onSelect(value)}
                        className={cn(
                            'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover-lift',
                            isSelected
                                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                                : 'glass-card hover:bg-muted/50'
                        )}
                    >
                        <Icon className={cn('w-4 h-4', isSelected ? '' : color)} />
                        {label}
                        {count !== undefined && (
                            <span className={cn(
                                'px-2 py-0.5 rounded-full text-xs font-semibold',
                                isSelected
                                    ? 'bg-primary-foreground/20'
                                    : 'bg-muted'
                            )}>
                                {count}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}

export type { SourceType };
