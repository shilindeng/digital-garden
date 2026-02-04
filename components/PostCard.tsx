import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import type { Post } from "@/lib/data";

export function PostListCard({ posts }: { posts: Post[] }) {
  return (
    <div className="flex flex-col h-full space-y-4 overflow-y-auto pr-2 custom-scrollbar">
      {posts.length === 0 ? (
          <div className="text-muted-foreground text-sm p-4 text-center">No posts found.</div>
      ) : (
          posts.map((post) => (
            <div key={post.slug} className="group flex flex-col space-y-2 rounded-lg border p-3 hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-[10px] px-1 py-0">
                  {post.tags?.[0] || 'Uncategorized'}
                </Badge>
                <div className="flex items-center text-[10px] text-muted-foreground">
                  <Calendar className="mr-1 h-3 w-3" />
                  {new Date(post.created_at).toLocaleDateString()}
                </div>
              </div>
              <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{post.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {post.excerpt}
              </p>
            </div>
          ))
      )}
    </div>
  );
}
