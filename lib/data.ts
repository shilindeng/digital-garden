import { supabase } from './supabaseClient';

// --- Interfaces ---
export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  tags: string[] | null;
  published: boolean;
  created_at: string;
  source?: 'weibo' | 'zhihu' | 'twitter' | null;  // 来源
  category?: string | null;  // 分类
  view_count?: number;  // 阅读量
  is_trending?: boolean;  // 热门标记
}

// --- Static Data (Profile & Stack) ---
export const profile = {
  name: "士林",
  role: "全栈工程师 & AI 探索者",
  bio: "在这里记录我的数字足迹。探索 AI Agent、自动化工作流与现代 Web 开发的无限可能。",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix", // 可以换成你的头像
  location: "Shanghai, China",
  email: "shilin@example.com",
  socials: [
    { name: "GitHub", url: "https://github.com/shilindeng", icon: "Github" },
    { name: "Twitter", url: "https://twitter.com", icon: "Twitter" },
  ]
};

export const stack = [
  { name: "Next.js", icon: "cpu" },
  { name: "React", icon: "atom" },
  { name: "Tailwind", icon: "wind" },
  { name: "Supabase", icon: "database" },
  { name: "Python", icon: "code" },
  { name: "AI Agents", icon: "layers" }
];

// --- Data Fetching ---
export async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  return data || [];
}
