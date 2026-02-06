import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { profile, stack } from '@/lib/data';
import { User, MapPin, Mail, Github, Twitter, Linkedin, Code, Cpu, Database, Wind, Layers, Atom } from 'lucide-react';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '关于我',
    description: '了解士林 - 一位全栈工程师与 AI 探索者',
};

const iconMap: Record<string, any> = {
    cpu: Cpu,
    atom: Atom,
    wind: Wind,
    database: Database,
    code: Code,
    layers: Layers,
};

export default function AboutPage() {
    return (
        <>
            <Header />

            <main className="min-h-screen pt-24 pb-12 px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Hero Section */}
                    <div className="mb-16">
                        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                            <User className="w-3 h-3 mr-1" />
                            关于
                        </Badge>

                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-balance">
                            关于我
                        </h1>
                    </div>

                    {/* Profile Card */}
                    <div className="glass-card rounded-2xl p-8 mb-12">
                        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                            {/* Avatar */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                                <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-card shadow-xl">
                                    <Image
                                        src={profile.avatar}
                                        alt={profile.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-2xl font-bold mb-2">{profile.name}</h2>
                                <p className="text-primary font-medium mb-4">{profile.role}</p>

                                <p className="text-muted-foreground leading-relaxed mb-6">
                                    {profile.bio}
                                </p>

                                {/* Location & Contact */}
                                <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-muted-foreground mb-6">
                                    <span className="flex items-center gap-1.5">
                                        <MapPin className="w-4 h-4" />
                                        {profile.location}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Mail className="w-4 h-4" />
                                        {profile.email}
                                    </span>
                                </div>

                                {/* Social Links */}
                                <div className="flex gap-2 justify-center md:justify-start">
                                    {profile.socials.map((social) => {
                                        const IconComponent = social.icon === 'Github' ? Github
                                            : social.icon === 'Twitter' ? Twitter
                                                : social.icon === 'Linkedin' ? Linkedin
                                                    : Mail;

                                        return (
                                            <a
                                                key={social.name}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2.5 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all hover-lift"
                                                aria-label={social.name}
                                            >
                                                <IconComponent className="w-4 h-4" />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-12">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Code className="w-5 h-5 text-primary" />
                            技术栈
                        </h3>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {stack.map((tech) => {
                                const Icon = iconMap[tech.icon] || Code;
                                return (
                                    <div
                                        key={tech.name}
                                        className="glass-card hover-lift rounded-xl p-4 flex items-center gap-3"
                                    >
                                        <div className="p-2 rounded-lg bg-primary/10">
                                            <Icon className="w-5 h-5 text-primary" />
                                        </div>
                                        <span className="font-medium">{tech.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* About This Site */}
                    <div className="glass-card rounded-2xl p-8">
                        <h3 className="text-xl font-bold mb-4">关于这个网站</h3>
                        <div className="prose prose-emerald dark:prose-invert max-w-none">
                            <p>
                                这是我的数字花园 —— 一个用于记录想法、实验和技术探索的空间。
                            </p>
                            <p>
                                网站使用 <strong>Next.js 14</strong> 构建，采用 App Router 架构，
                                部署在 <strong>Cloudflare Pages</strong> 的边缘网络上，
                                数据存储使用 <strong>Supabase</strong>。
                            </p>
                            <p>
                                设计灵感来自现代极简主义，使用 Tailwind CSS 打造流畅的用户体验，
                                支持明暗主题切换。
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
