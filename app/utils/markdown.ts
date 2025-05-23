import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeStringify from 'rehype-stringify'
import remarkFrontmatter from 'remark-frontmatter'
import { visit } from 'unist-util-visit'
import { toString } from 'mdast-util-to-string'

export async function markdownToHtml(markdown: string) {
  let headings: Array<{ id: string, text: string, depth: number }> = []
  const result = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml', 'toml']) // This strips frontmatter
    .use(() => (tree) => {
      visit(tree, 'heading', (node: any) => {
        const text = toString(node)
        headings.push({
          id: text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
          text,
          depth: node.depth
        })
      })
    })
    .use(remarkGfm) // GitHub Flavored Markdown
    .use(remarkRehype)
    .use(rehypeSlug) // Add IDs to headings
    .use(rehypeAutolinkHeadings) // Add links to headings
    .use(rehypeStringify)
    .process(markdown)

  return { html: result.toString(), headings }
}