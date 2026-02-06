'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="flex items-center gap-1 p-1 rounded-full bg-muted/50 backdrop-blur-sm">
                <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
                <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
                <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
            </div>
        );
    }

    const options = [
        { value: 'light', icon: Sun, label: '亮色' },
        { value: 'dark', icon: Moon, label: '暗色' },
        { value: 'system', icon: Monitor, label: '系统' },
    ];

    return (
        <div className="flex items-center gap-1 p-1 rounded-full bg-muted/50 backdrop-blur-sm border border-border/50">
            {options.map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    onClick={() => setTheme(value)}
                    className={cn(
                        'relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300',
                        theme === value
                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    )}
                    title={label}
                    aria-label={`切换到${label}模式`}
                >
                    <Icon className="w-4 h-4" />
                    {theme === value && (
                        <span className="absolute inset-0 rounded-full animate-ping bg-primary/20" />
                    )}
                </button>
            ))}
        </div>
    );
}
