import Link from 'next/link';
import { Github, Twitter, Mail, Heart } from 'lucide-react';

const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/shilindeng', icon: Github },
    { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
    { name: 'Email', href: 'mailto:shilin@example.com', icon: Mail },
];

const footerLinks = [
    { name: '首页', href: '/' },
    { name: '博客', href: '/blog' },
    { name: '关于', href: '/about' },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative mt-24 border-t border-border/50">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-muted/30 to-transparent pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg gradient-text">数字花园</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            记录想法、实验与代码片段。探索 AI Agent、自动化工作流与现代 Web 开发的无限可能。
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-sm text-foreground">快速链接</h4>
                        <ul className="space-y-2">
                            {footerLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-sm text-foreground">关注我</h4>
                        <div className="flex gap-2">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2.5 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all hover-lift"
                                        aria-label={social.name}
                                    >
                                        <Icon className="w-4 h-4" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-6 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground">
                        © {currentYear} 士林. All rights reserved.
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                        Made with <Heart className="w-3 h-3 text-red-500 animate-pulse" /> using Next.js & Supabase
                    </p>
                </div>
            </div>
        </footer>
    );
}
