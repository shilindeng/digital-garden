-- ==========================================
-- Digital Garden 博客数据库升级脚本
-- ==========================================
-- 用途：添加搜索和筛选功能所需的字段
-- 执行方式：在 Supabase SQL Editor 中运行此脚本
-- ==========================================

-- 1. 添加新字段到 posts 表
ALTER TABLE posts 
  ADD COLUMN IF NOT EXISTS source VARCHAR(50),           -- 来源：weibo/zhihu/twitter
  ADD COLUMN IF NOT EXISTS category VARCHAR(100),        -- 分类
  ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0, -- 阅读量
  ADD COLUMN IF NOT EXISTS is_trending BOOLEAN DEFAULT false; -- 热门标记

-- 2. 创建索引以提升查询性能
CREATE INDEX IF NOT EXISTS idx_posts_source ON posts(source);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_trending ON posts(is_trending);
CREATE INDEX IF NOT EXISTS idx_posts_created_at_desc ON posts(created_at DESC);

-- 3. 添加 source 字段的约束（可选，限制只能是特定值）
ALTER TABLE posts 
  ADD CONSTRAINT check_source_value 
  CHECK (source IS NULL OR source IN ('weibo', 'zhihu', 'twitter'));

-- 4. 更新现有数据（示例：将所有旧数据标记为微博来源）
-- 根据实际情况调整，如果不需要可以注释掉
-- UPDATE posts SET source = 'weibo' WHERE source IS NULL;

-- 5. 查看表结构确认
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'posts'
ORDER BY ordinal_position;

-- ==========================================
-- 执行完成后，Python 脚本需要对应更新：
-- ==========================================
-- 示例代码：
-- supabase.table('posts').insert({
--     'title': title,
--     'content': content,
--     'source': 'weibo',      # 添加这行
--     'category': 'tech',     # 添加这行（可选）
--     # ...其他字段
-- }).execute()
-- ==========================================
