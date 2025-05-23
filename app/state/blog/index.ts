import * as YAML from 'yaml';
import { Locale } from "~/translation";
import { getFileContent, listEntries } from "../cms";
import { unified } from 'unified';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { matter } from 'vfile-matter';
import { cache } from '../cache';

type BlogMetadata = {
  updatedAt: string;
  featured: boolean;
  image: string;
  slug: string;
};

type BlogContent = {
  title: string;
  content: string;
  intro: string;
  timeToRead: string;
};

type Blog = {
  metadata: BlogMetadata;
  content: BlogContent;
};

/** depends on cms */
export async function listBlogs(locale: Locale) {
  const blogFolders = await listEntries(`homepage/blogs`);
  const cachedBlogs = await cache.mget(blogFolders.map(folder => getCacheKey(folder.name, locale)));
  const nonCachedBlogs = cachedBlogs.map((blog, index) => !blog && blogFolders[index].name);
  const files = await getFileContent(
    nonCachedBlogs.map(slug => `homepage/blogs/${slug}/${locale}.mdx`)
      .concat(nonCachedBlogs.map(slug => `homepage/blogs/${slug}/metadata.yaml`))
  );

  const blogs = nonCachedBlogs.map((_, index) => {
    const contentFile = files[index];
    const metadataFile = files[blogFolders.length + index];
    if (!contentFile || !metadataFile) {
      return null;
    }
    return parseBlog(blogFolders[index].name, contentFile, metadataFile, locale);
  });

  await cache.mset(blogs.map((blog) => blog && ({ key: getCacheKey(blog.metadata.slug, locale), value: blog })).filter(v => !!v));

  return cache.mget<Blog>(blogFolders.map(folder => getCacheKey(folder.name, locale))).then(blogs => blogs.filter(v => !!v).sort((a, b) => {
    if (a.metadata.featured && !b.metadata.featured) {
      return -1;
    }
    if (b.metadata.featured && !a.metadata.featured) {
      return 1;
    }
    return new Date(b.metadata.updatedAt).getTime() - new Date(a.metadata.updatedAt).getTime();
  }));
}

export async function getBlog(name: string, locale: Locale) {
  const cacheKey = getCacheKey(name, locale)
  const cachedBlog = await cache.get<Blog>(cacheKey);
  if (cachedBlog) {
    return cachedBlog;
  }

  const files = await getFileContent([
    `homepage/blogs/${name}/${locale}.mdx`,
    `homepage/blogs/${name}/metadata.yaml`
  ]);

  if (!files[0] || !files[1]) {
    return null;
  }

  await cache.set(cacheKey, parseBlog(name, files[0], files[1], locale))
  return cache.get<Blog>(cacheKey);
}

function getCacheKey(name: string, locale: Locale) {
  return `${name}-${locale}`
}

function parseBlog(name: string, contentRaw: string, metadataRaw: string, locale: Locale) {
  const blogContent = parseContent(contentRaw);
  const blogMetadata = { slug: name, ...YAML.parse(metadataRaw) } as BlogMetadata; //YAML.parse(metadataRaw) as BlogMetadata;

  const textContent = String(blogContent.value);
  const introParagraph = extractIntroParagraph(textContent);
  const timeToRead = calculateReadingTime(textContent, locale);

  return {
    metadata: blogMetadata,
    content: {
      title: (<{ title: string }>blogContent.data.matter).title,
      content: textContent,
      intro: introParagraph,
      timeToRead: `${timeToRead} min`,
    } as BlogContent,
  };
}

function parseContent(content: string) {
  return unified()
    .use(remarkParse)
    .use(remarkStringify)
    .use(remarkFrontmatter, ['yaml', 'toml'])
    .use(() => (tree, file) => matter(file))
    .processSync(content);
}

function extractIntroParagraph(text: string): string {
  // Remove front matter and code blocks first
  const cleanedText = text
    .replace(/^---[\s\S]*?---/g, '')
    .replace(/```[\s\S]*?```/g, '')
    .trim();

  // Extract first paragraph
  const firstParagraphMatch = cleanedText.match(
    /^(.*?)(?:\n\s*\n|#|\n#|\n\s*[-=]{3,}\s*\n|$)/s
  );

  let intro = firstParagraphMatch ? firstParagraphMatch[1].trim() : '';

  // Remove Markdown formatting
  intro = intro
    // Remove images and links
    .replace(/!?\[(.*?)\]\(.*?\)/g, '$1')
    // Remove inline code
    .replace(/`([^`]+)`/g, '$1')
    // Remove bold and italic
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    // Remove strikethrough
    .replace(/~~([^~]+)~~/g, '$1')
    // Remove blockquotes
    .replace(/^\s*>+\s*/gm, '')
    // Remove headers
    .replace(/^#+\s+/gm, '')
    // Remove footnotes
    .replace(/\[\^.*?\]/g, '')
    // Remove reference-style links
    .replace(/\[.*?\]:.*$/gm, '')
    // Remove HTML tags if any
    .replace(/<[^>]+>/g, '');

  // Trim again after all replacements
  intro = intro.trim();

  // Limit to 3 sentences if it's too long
  if (intro.split(/[.!?。！？]\s+/).length > 3) {
    const sentences = intro.split(/(?<=[.!?。！？])\s+/);
    intro = sentences.slice(0, 3).join(' ');
  }

  return intro || cleanedText.slice(0, 160).replace(/[#*_`~\[\]]/g, '');
}

function calculateReadingTime(text: string, locale: Locale): number {
  const isChinese = ['zh', 'zh-CN', 'zh-TW'].includes(locale);

  const cleanedText = text
    .replace(/^---[\s\S]*?---/g, '')
    .replace(/#{1,6}\s*.*?\n/g, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!?\[.*?\]\(.*?\)/g, '')
    .replace(/[*_`~]/g, '');

  const wordCount = isChinese
    ? cleanedText.replace(/[\u0000-\u007F]/g, '').length
    : cleanedText.split(/\s+/).filter(word => word.length > 0).length;

  const wordsPerMinute = isChinese ? 500 : 200;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}



