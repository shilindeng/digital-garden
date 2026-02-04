import { posts } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

export function PostListCard() {
  return (
    <div className="flex flex-col h-full space-y-4 overflow-y-auto pr-2 custom-scrollbar">
      {posts.map((post) => (
        <div key={post.slug} className="group flex flex-col space-y-2 rounded-lg border p-3 hover:bg-muted/50 transition-colors cursor-pointer">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-[10px] px-1 py-0">{post.category}</Badge>
            <div className="flex items-center text-[10px] text-muted-foreground">
              <Calendar className="mr-1 h-3 w-3" />
              {post.date}
            </div>
          </div>
          <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{post.title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {post.abstract}
          </p>
        </div>
      ))}
    </div>
  );
}
