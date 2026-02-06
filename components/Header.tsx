'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Menu, X, Leaf, BookOpen, User, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
    { name: '首页', href: '/', icon: Leaf },
    { name: '博客', href: '/blog', icon: BookOpen },
    { name: '关于', href: '/about', icon: User },
];

export function Header() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                isScrolled
                    ? 'glass-card py-3 shadow-lg'
                    : 'py-4 bg-transparent'
            )}
        >
            <nav className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 group"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full group-hover:bg-primary/40 transition-colors" />
                            <Sparkles className="relative w-6 h-6 text-primary" />
                        </div>
                        <span className="font-bold text-lg gradient-text hidden sm:block">
                            数字花园
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href ||
                                (item.href !== '/' && pathname?.startsWith(item.href));

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        'relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                                        isActive
                                            ? 'text-primary bg-primary/10'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                    )}
                                >
                                    <Icon className="w-4 h-4" />
                                    {item.name}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right side: Theme Toggle + Mobile Menu */}
                    <div className="flex items-center gap-2">
                        <ThemeToggle />

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 rounded-full hover:bg-muted/50 transition-colors"
                            aria-label="切换菜单"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-5 h-5" />
                            ) : (
                                <Menu className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div
                    className={cn(
                        'md:hidden overflow-hidden transition-all duration-300 ease-out',
                        isMobileMenuOpen ? 'max-h-64 mt-4' : 'max-h-0'
                    )}
                >
                    <div className="flex flex-col gap-1 pb-4">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href ||
                                (item.href !== '/' && pathname?.startsWith(item.href));

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={cn(
                                        'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                                        isActive
                                            ? 'text-primary bg-primary/10'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                    )}
                                >
                                    <Icon className="w-5 h-5" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </nav>
        </header>
    );
}
