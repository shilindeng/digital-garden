import { BentoGrid, BentoGridItem } from "@/components/bento/Grid";
import { ProfileCard } from "@/components/ProfileCard";
import { PostList } from "@/components/PostList";
import { StackCard } from "@/components/StackCard";
import { MapCard } from "@/components/MapCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Terminal, Sparkles, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />

      <main className="min-h-screen pt-24 pb-12 px-4 md:px-6">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto mb-16">
          <div className="relative">
            {/* Decorative gradient blob */}
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-50 animate-pulse" />
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-accent/30 rounded-full blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="relative">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                <Sparkles className="w-3 h-3 mr-1" />
                数字花园 v2.0
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
                记录想法，
                <br />
                <span className="gradient-text">探索无限可能</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-8">
                探索 AI Agent、自动化工作流与现代 Web 开发。在这里分享技术见解与数字创作。
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover-lift shadow-lg shadow-primary/25 transition-all"
                >
                  浏览博客
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-card/50 backdrop-blur-sm font-medium hover:bg-muted/50 transition-all"
                >
                  了解更多
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bento Grid */}
        <BentoGrid>
          {/* Profile - Large Hero */}
          <BentoGridItem
            className="md:col-span-2 md:row-span-2 glass-card hover-lift"
            header={<ProfileCard />}
            title=""
            description=""
          />

          {/* Tech Stack - Tall Vertical */}
          <BentoGridItem
            className="md:col-span-1 md:row-span-2 glass-card hover-lift"
            header={<StackCard />}
            title="技术栈"
            description="我的开发利器"
            icon={<Terminal className="h-4 w-4 text-primary" />}
          />

          {/* Map - Small Square */}
          <BentoGridItem
            className="md:col-span-1 md:row-span-1 glass-card hover-lift"
            header={<MapCard />}
            title=""
            description=""
          />

          {/* Status / Placeholder - Small Square */}
          <Link href="/blog/hello-world" className="md:col-span-1 md:row-span-1 block">
            <BentoGridItem
              className="h-full glass-card hover-lift glow-border"
              header={
                <div className="flex items-center justify-center h-full w-full rounded-xl">
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative">
                      <span className="absolute inline-flex h-4 w-4 rounded-full bg-primary/40 animate-ping" />
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-primary" />
                    </div>
                    <span className="text-primary font-bold text-sm flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      Hello World
                    </span>
                  </div>
                </div>
              }
              title=""
              description=""
            />
          </Link>

          {/* Recent Posts - Wide - Client Side Fetched */}
          <BentoGridItem
            className="md:col-span-2 md:row-span-1 glass-card hover-lift"
            header={<PostList />}
            title="最近更新"
            description="关于工程与设计的思考"
            icon={<Terminal className="h-4 w-4 text-primary" />}
          />

          {/* Project / Ad - Wide */}
          <BentoGridItem
            className="md:col-span-2 md:row-span-1 glass-card hover-lift overflow-hidden"
            header={
              <div className="relative flex flex-col justify-center h-full p-4">
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10" />

                <div className="relative">
                  <Badge className="mb-3 bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-500/30">
                    精选项目
                  </Badge>
                  <h3 className="text-xl font-bold mb-2">OpenClaw</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    驱动此 Demo 的 AI Agent 框架，让自动化变得简单。
                  </p>
                  <Link
                    href="https://openclaw.ai"
                    target="_blank"
                    className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    了解更多
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            }
            title=""
            description=""
          />

        </BentoGrid>
      </main>

      <Footer />
    </>
  );
}
