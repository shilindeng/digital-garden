export const runtime = 'edge';
export const revalidate = 60; // ISR: 每60秒重新生成

import { BentoGrid, BentoGridItem } from "@/components/bento/Grid";

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen p-4 md:p-24 bg-background">
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">数字花园</h1>
        <p className="text-muted-foreground text-lg">
          记录想法、实验与代码片段。
        </p>
      </div>

      <BentoGrid>
        {/* Profile - Large Hero */}
        <BentoGridItem
          className="md:col-span-2 md:row-span-2"
          header={<ProfileCard />}
          title=""
          description=""
        />

        {/* Tech Stack - Tall Vertical */}
        <BentoGridItem
          className="md:col-span-1 md:row-span-2"
          header={<StackCard />}
          title="技术栈"
          description="我的开发利器"
          icon={<Terminal className="h-4 w-4 text-neutral-500" />}
        />

        {/* Map - Small Square */}
        <BentoGridItem
          className="md:col-span-1 md:row-span-1"
          header={<MapCard />}
          title=""
          description=""
        />

        {/* Status / Placeholder - Small Square */}
        <BentoGridItem
          className="md:col-span-1 md:row-span-1"
          header={
            <div className="flex items-center justify-center h-full w-full bg-emerald-500/10 rounded-xl border border-emerald-500/20">
               <div className="flex flex-col items-center gap-2">
                 <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="text-emerald-500 font-bold text-sm">寻找机会中</span>
               </div>
            </div>
          }
        />

        {/* Recent Posts - Wide */}
        <BentoGridItem
          className="md:col-span-2 md:row-span-1"
          header={<PostListCard posts={posts} />}
          title="最近更新"
          description="关于工程与设计的思考"
          icon={<Terminal className="h-4 w-4 text-neutral-500" />}
        />

         {/* Project / Ad - Wide */}
         <BentoGridItem
          className="md:col-span-2 md:row-span-1 bg-gradient-to-br from-indigo-500/10 to-purple-500/10"
          header={
             <div className="flex flex-col justify-center h-full p-4">
                <Badge className="w-fit mb-2">精选项目</Badge>
                <h3 className="text-lg font-bold">OpenClaw</h3>
                <p className="text-sm text-muted-foreground">驱动此 Demo 的 AI Agent 框架。</p>
             </div>
          }
          title="项目聚焦"
          description="正在构建中"
          icon={<Terminal className="h-4 w-4 text-neutral-500" />}
        />

      </BentoGrid>
    </main>
  );
}
