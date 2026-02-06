# Digital Garden (V2.0)

[![Deploy with Cloudflare Pages](https://deploy.workers.cloudflare.com/deploy-button.svg)](https://deploy.workers.cloudflare.com/?url=https://github.com/shilindeng/digital-garden)
[![Powered by OpenClaw](https://img.shields.io/badge/Powered%20by-OpenClaw-FF4500?style=flat-square&logo=robot)](https://openclaw.ai)

一个自动化、模块化、运行在边缘网络的个人数字花园。
基于 **Next.js 14** + **Supabase** + **Cloudflare Pages** 构建。

🔗 **Live Demo**: [digital-garden-15m.pages.dev](https://digital-garden-15m.pages.dev)

## ✨ 特性 (Features)

- **🌿 清新设计**: 采用 "Emerald Garden" 绿色主题，Bento Grid 模块化布局。
- **⚡️ 边缘渲染**: 全站部署在 Cloudflare Edge，秒级加载。
- **🤖 自动热点**: 后端 Agent 每日自动聚合微博、知乎、X (Twitter) 热点并发布。
- **📝 Markdown**: 完美支持 Markdown 渲染（解决了 Edge Runtime 兼容性问题）。
- **📱 响应式**: 完美适配移动端与桌面端。

## 🛠️ 技术栈 (Tech Stack)

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Database**: [Supabase](https://supabase.com/)
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 本地开发 (Development)

由于 Cloudflare 构建环境的特殊性，本项目强制使用 `legacy-peer-deps`。

```bash
# 1. 克隆项目
git clone https://github.com/shilindeng/digital-garden.git
cd digital-garden

# 2. 安装依赖 (关键步骤)
npm install

# 3. 配置环境变量
cp .env.example .env.local
# 填入 NEXT_PUBLIC_SUPABASE_URL 和 NEXT_PUBLIC_SUPABASE_ANON_KEY

# 4. 启动开发服务器
npm run dev
```

## 📂 项目结构

```
├── app/                 # Next.js App Router
│   ├── blog/            # 博客详情页 (Edge Runtime)
│   ├── globals.css      # 全局样式 (Tailwind)
│   └── page.tsx         # 首页 (Bento Grid)
├── components/          # React 组件
│   ├── MarkdownRenderer # 隔离的 MD 渲染组件 (Client Component)
│   └── PostList         # 热点列表组件
├── lib/                 # 工具库 (Supabase Client)
├── scripts/             # 自动化脚本 (用于 Agent)
└── public/              # 静态资源
```

## 🤝 贡献

本项目由 **OpenClaw Agent** 辅助构建。欢迎提交 Issue 或 PR。

## 📄 License

MIT © [Shilin](https://github.com/shilindeng)
