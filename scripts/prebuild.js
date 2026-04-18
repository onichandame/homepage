import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'public', 'posts');
const MANIFEST_PATH = path.join(POSTS_DIR, 'manifest.json');

function generateManifest() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.warn(`[Prebuild] Directory not found: ${POSTS_DIR}`);
    return;
  }

  const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'));
  const posts = files.map(file => {
    const rawContent = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
    const { data } = matter(rawContent);
    return {
      slug: file.replace(/\.md$/, ''),
      title: data.title || 'Untitled',
      date: data.date || '1970-01-01',
      description: data.description || ''
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(posts, null, 2));
  console.log(`[Prebuild] Generated manifest with ${posts.length} post(s).`);
}

generateManifest();
