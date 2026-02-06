# Digital Garden (V2.0) 🌿

[![Deploy with Cloudflare Pages](https://deploy.workers.cloudflare.com/deploy-button.svg)](https://deploy.workers.cloudflare.com/?url=https://github.com/shilindeng/digital-garden)
[![Powered by OpenClaw](https://img.shields.io/badge/Powered%20by-OpenClaw-FF4500?style=flat-square&logo=robot)](https://openclaw.ai)

一个现代化、自动化的个人技术博客，采用 **Glassmorphism 设计风格**，运行在边缘网络。  
基于 **Next.js 14** + **Supabase** + **Cloudflare Pages** 构建。

🔗 **Live Demo**: [digital-garden-15m.pages.dev](https://digital-garden-15m.pages.dev)

---

## ✨ 核心特性

### 🎨 视觉设计
- **Glassmorphism 毛玻璃效果**：现代感十足的卡片设计
- **暗色/亮色模式**：支持亮色/暗色/跟随系统三种主题
- **渐变背景**：动态渐变背景，视觉层次丰富
- **流畅动画**：页面切换、卡片悬浮等细腻动效
- **响应式设计**：完美适配移动端与桌面端

### 🔍 内容管理
- **全文搜索**：使用 Fuse.js，支持标题/内容/标签模糊搜索
- **来源筛选**：区分微博/知乎/X (Twitter) 热点来源
- **阅读时间估算**：自动计算文章阅读时长
- **上下篇导航**：快速跳转相关文章
- **Markdown 渲染**：完整支持 Markdown（Edge Runtime 兼容）

### ⚡️ 性能优化
- **边缘渲染**：全站部署在 Cloudflare Edge，全球秒级加载
- **ISR 再生**：增量静态再生成，自动更新内容
- **动态 Sitemap**：SEO 友好的站点地图
- **图片优化**：Next.js Image 自动优化

### 🤖 自动化
- **热点抓取**：后端 Agent 每日自动聚合热点并发布
- **分类管理**：智能分类标记

---

## 🛠️ 技术栈

| 类别 | 技术 |
|------|------|
| **前端框架** | [Next.js 14](https://nextjs.org/) (App Router + Edge Runtime) |
| **样式** | [Tailwind CSS](https://tailwindcss.com/) + @tailwindcss/typography |
| **UI 组件** | 自定义组件 + [Lucide Icons](https://lucide.dev/) |
| **主题** | [next-themes](https://github.com/pacocoursey/next-themes) |
| **数据库** | [Supabase](https://supabase.com/) (PostgreSQL) |
| **搜索** | [Fuse.js](https://fusejs.io/) |
| **部署** | [Cloudflare Pages](https://pages.cloudflare.com/) |
| **字体** | Inter + Noto Sans SC + JetBrains Mono |

---

## 🚀 快速开始

### 1️⃣ 克隆项目

```bash
git clone https://github.com/shilindeng/digital-garden.git
cd digital-garden
```

### 2️⃣ 安装依赖

```bash
npm install
```

### 3️⃣ 配置环境变量

创建 `.env.local` 文件：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4️⃣ 数据库配置

在 Supabase SQL Editor 中执行 [`scripts/supabase_migration.sql`](./scripts/supabase_migration.sql)：

```sql
-- 添加新字段
ALTER TABLE posts 
  ADD COLUMN source VARCHAR(50),
  ADD COLUMN category VARCHAR(100),
  ADD COLUMN view_count INTEGER DEFAULT 0,
  ADD COLUMN is_trending BOOLEAN DEFAULT false;
```

### 5️⃣ 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

---

## 📂 项目结构

```
digital-garden/
├── app/                      # Next.js App Router
│   ├── blog/                 # 博客列表页 + 文章详情页
│   ├── about/                # 关于页面
│   ├── globals.css           # 全局样式（Glassmorphism）
│   ├── layout.tsx            # 根布局（主题提供者）
│   ├── page.tsx              # 首页（Bento Grid）
│   ├── sitemap.ts            # 动态站点地图
│   └── robots.ts             # 爬虫配置
├── components/               # React 组件
│   ├── Header.tsx            # 全局导航栏（毛玻璃效果）
│   ├── Footer.tsx            # 页脚
│   ├── SearchBar.tsx         # 搜索框（防抖）
│   ├── SourceFilter.tsx      # 来源筛选
│   ├── BlogClient.tsx        # 博客列表客户端组件
│   ├── ThemeProvider.tsx     # 主题上下文
│   └── ui/                   # UI 组件
│       ├── ThemeToggle.tsx   # 主题切换按钮
│       └── badge.tsx         # 徽章组件
├── lib/                      # 工具库
│   ├── supabaseClient.ts     # Supabase 客户端
│   ├── searchConfig.ts       # Fuse.js 配置
│   ├── data.ts               # 类型定义
│   └── utils.ts              # 工具函数
├── scripts/                  # 自动化脚本
│   └── supabase_migration.sql # 数据库迁移脚本
└── public/                   # 静态资源
```

---

## 📝 使用说明

### 添加新文章

使用 Python 脚本插入文章时，记得添加 `source` 字段：

```python
from supabase import create_client

supabase = create_client(url, key)

supabase.table('posts').insert({
    'title': '文章标题',
    'slug': 'article-slug',
    'content': '文章内容',
    'excerpt': '摘要',
    'tags': ['AI', 'Tech'],
    'published': True,
    'source': 'weibo',        # 来源：weibo/zhihu/twitter
    'category': 'technology'  # 分类（可选）
}).execute()
```

### 搜索功能

- **搜索范围**：标题、内容、摘要、标签
- **防抖延迟**：300ms
- **权重配置**：标题 > 摘要 > 内容 > 标签

### 主题切换

点击右上角主题切换按钮，支持：
- ☀️ 亮色模式
- 🌙 暗色模式
- 💻 跟随系统

---

## 🎨 自定义

### 修改主题色

编辑 `app/globals.css`：

```css
:root {
  --primary: 160 84% 39%;  /* Emerald 主色 */
  /* 更多颜色变量... */
}
```

### 修改搜索权重

编辑 `lib/searchConfig.ts`：

```typescript
keys: [
  { name: 'title', weight: 0.5 },    // 标题权重
  { name: 'excerpt', weight: 0.3 },  // 摘要权重
  // ...
]
```

---

## 📊 SEO 优化

- ✅ 动态生成 `sitemap.xml`
- ✅ 配置 `robots.txt`
- ✅ Open Graph 元数据
- ✅ Twitter Card 支持
- ✅ 结构化数据 (JSON-LD)

---

## 🚢 部署

### Cloudflare Pages

1. Fork 本仓库
2. 在 Cloudflare Pages 连接 GitHub 仓库
3. 构建配置：
   - **构建命令**：`npm run build`
   - **输出目录**：`.vercel/output/static`
4. 设置环境变量（Supabase URL & Key）

### Vercel

```bash
npm install -g vercel
vercel --prod
```

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

本项目由 **OpenClaw AI Agent** 辅助构建。

---

## 📄 License

MIT © [Shilin Deng](https://github.com/shilindeng)

---

## 📮 联系方式

- GitHub: [@shilindeng](https://github.com/shilindeng)
- Email: dsl741743548@gmail.com
