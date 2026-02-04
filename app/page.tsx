import { BentoGrid, BentoGridItem } from "@/components/bento/Grid";
import { ProfileCard } from "@/components/ProfileCard";
import { PostListCard } from "@/components/PostCard";
import { StackCard } from "@/components/StackCard";
import { MapCard } from "@/components/MapCard";
import { Badge } from "@/components/ui/badge";
import { Terminal } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-24 bg-background">
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Digital Garden</h1>
        <p className="text-muted-foreground text-lg">
          A collection of thoughts, experiments, and code snippets.
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
          title="Tech Stack"
          description="My preferred weapons of choice."
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
                  <span className="text-emerald-500 font-bold text-sm">Open to Work</span>
               </div>
            </div>
          }
        />

        {/* Recent Posts - Wide */}
        <BentoGridItem
          className="md:col-span-2 md:row-span-1"
          header={<PostListCard />}
          title="Recent Writings"
          description="Thoughts on engineering and design."
          icon={<Terminal className="h-4 w-4 text-neutral-500" />}
        />

         {/* Project / Ad - Wide */}
         <BentoGridItem
          className="md:col-span-2 md:row-span-1 bg-gradient-to-br from-indigo-500/10 to-purple-500/10"
          header={
             <div className="flex flex-col justify-center h-full p-4">
                <Badge className="w-fit mb-2">Featured Project</Badge>
                <h3 className="text-lg font-bold">OpenClaw</h3>
                <p className="text-sm text-muted-foreground">The AI Agent framework powering this demo.</p>
             </div>
          }
          title="Project Spotlight"
          description="Currently building."
          icon={<Terminal className="h-4 w-4 text-neutral-500" />}
        />

      </BentoGrid>
    </main>
  );
}
