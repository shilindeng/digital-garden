const fs = require('fs');
const path = require('path');

// Load env
const envPath = path.join(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) env[key.trim()] = value.trim();
});

const SUPABASE_URL = env['NEXT_PUBLIC_SUPABASE_URL'];
const SUPABASE_KEY = env['SUPABASE_SERVICE_ROLE_KEY'] || env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

async function main() {
  // Read trends
  const trendsPath = '/usr/share/nginx/html/trends.json';
  if (!fs.existsSync(trendsPath)) {
    console.error('Trends file not found!');
    process.exit(1);
  }
  const trends = JSON.parse(fs.readFileSync(trendsPath, 'utf8'));

  // Generate Markdown
  const date = new Date();
  const dateStr = date.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  const title = `全网热点聚合 (${dateStr})`;
  
  const pad = (n) => n.toString().padStart(2, '0');
  const slug = `trends-${date.getFullYear()}${pad(date.getMonth()+1)}${pad(date.getDate())}-${pad(date.getHours())}${pad(date.getMinutes())}`;

  let content = `> 自动聚合 Weibo、Zhihu、X (Twitter) 的最新热门话题。更新于 ${date.toLocaleString('zh-CN')}\n\n`;

  // Weibo
  if (trends.weibo && trends.weibo.data) {
    content += `## 🔴 微博热搜\n\n`;
    trends.weibo.data.slice(0, 15).forEach((item, index) => {
      content += `${index + 1}. [${item.title}](${item.url}) ${item.hot === 'HOT' ? '🔥' : ''}\n`;
    });
    content += `\n---\n\n`;
  }

  // Zhihu
  if (trends.zhihu && trends.zhihu.data) {
    content += `## 🔵 知乎热榜\n\n`;
    trends.zhihu.data.slice(0, 10).forEach((item, index) => {
      content += `### ${index + 1}. [${item.title}](${item.url})\n`;
      content += `*🔥 ${item.hot}*\n`;
      if (item.desc) content += `> ${item.desc.replace(/\n/g, ' ').substring(0, 120)}...\n\n`;
    });
    content += `\n---\n\n`;
  }

  // X
  if (trends.x && trends.x.data) {
    content += `## ⚫ X (Twitter) 趋势\n\n`;
    trends.x.data.forEach((item) => {
      const author = item.title.split(':')[0];
      content += `### ${author}\n`;
      content += `> ${item.desc.replace(/\n/g, ' ').substring(0, 200)}...\n\n`;
      content += `[🔗 查看原文](${item.url}) | ${item.hot}\n\n`;
    });
  }

  console.log(`Prepared post: ${title} (slug: ${slug})`);

  // POST to Supabase via REST
  const url = `${SUPABASE_URL}/rest/v1/posts`;
  const payload = {
    title: title,
    slug: slug,
    content: content,
    excerpt: `🔥 微博: ${trends.weibo?.data?.[0]?.title || '...'} | 🔵 知乎: ${trends.zhihu?.data?.[0]?.title || '...'}`,
    tags: ['Trends', 'Daily'],
    published: true
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Supabase Error:', response.status, text);
      process.exit(1);
    }

    const result = await response.json();
    console.log('Successfully published post:', result[0].slug);
  } catch (err) {
    console.error('Fetch Error:', err);
    process.exit(1);
  }
}

main();
