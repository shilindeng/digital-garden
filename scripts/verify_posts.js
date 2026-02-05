const fs = require('fs');
const path = require('path');
const { createClient } = require('../node_modules_temp/@supabase/supabase-js');

const envPath = path.join(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) env[key.trim()] = value.trim();
});

const supabase = createClient(env['NEXT_PUBLIC_SUPABASE_URL'], env['SUPABASE_SERVICE_ROLE_KEY']);

async function main() {
  console.log('Checking recent posts...');
  const { data, error } = await supabase
    .from('posts')
    .select('title, created_at, published')
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Recent posts in DB:');
    console.table(data);
  }
}

main();
