import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'public', 'posts');
const MANIFEST_PATH = path.join(POSTS_DIR, 'manifest.json');
const SUPPORTED_LANGS = ['en', 'zh'];

function generateManifest() {
  const manifest = {};
  let totalPosts = 0;

  for (const lang of SUPPORTED_LANGS) {
    const langDir = path.join(POSTS_DIR, lang);
    if (!fs.existsSync(langDir)) {
      console.warn(`[Prebuild] Language directory not found: ${langDir}`);
      manifest[lang] = [];
      continue;
    }

    const files = fs.readdirSync(langDir).filter(file => file.endsWith('.md'));
    const posts = files.map(file => {
      const rawContent = fs.readFileSync(path.join(langDir, file), 'utf-8');
      const { data } = matter(rawContent);
          return {
            slug: file.replace(/\.md$/, ''),
            title: data.title || 'Untitled',
            date: data.date || '1970-01-01',
            description: data.description || '',
            image: data.image || null
          };
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    manifest[lang] = posts;
    totalPosts += posts.length;
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`[Prebuild] Generated manifest with ${totalPosts} post(s) across ${SUPPORTED_LANGS.length} languages.`);
}

generateManifest();
