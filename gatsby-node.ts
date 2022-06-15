import { GatsbyNode } from 'gatsby'
import * as path from 'path'

const locales = [`en`, `cn`] as const
const defLocale: typeof locales[number] = `en`
const getLocalPath = (locale: string, path: string) =>
  [locale !== defLocale && `/${locale}`, path].filter(v => !!v).join(``)

//export const onCreatePage: GatsbyNode['onCreatePage'] = ({ page, actions ,}) => {
//  const { createPage, deletePage } = actions
//  deletePage(page)
//  Object.keys(locales).map(locale => {
//    return createPage({
//      ...page,
//      path: getLocalPath(locale, page.path),
//      context: {
//        ...page.context,
//        locale,
//      },
//    })
//  })
//}

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  actions,
  getNode,
}) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    const { name, relativeDirectory, sourceInstanceName } = getNode(node.parent)
    createNodeField({
      node,
      name: 'sourceInstanceName',
      value: sourceInstanceName,
    })
    if (sourceInstanceName === `posts`) {
      createNodeField({ node, name: 'locale', value: name })
      createNodeField({ node, name: 'name', value: relativeDirectory })
    }
  }
}

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
}) => {
  const blogTemplate = path.resolve('./src/components/blog/detail.tsx')
  const { createPage } = actions
  const blogs = await graphql<{
    blogs: {
      edges: {
        node: {
          frontmatter: { title: string; author: string; date: Date }
          rawMarkdownBody: string
          fields: {
            locale: string
            name: string
          }
        }
      }[]
    }
  }>(`
    #graphql
    {
      blogs: allMdx(
        filter: { fields: { sourceInstanceName: { eq: "posts" } } }
      ) {
        edges {
          node {
            frontmatter {
              title
              author
              date
            }
            body
            fields {
              locale
              name
            }
          }
        }
      }
    }
  `)
  if (blogs.errors) throw blogs.errors
  const postList = blogs.data.blogs.edges.map(v => v.node)
  postList.forEach(post => {
    const { name, locale } = post.fields
    const { title, author, date } = post.frontmatter
    createPage({
      path: getLocalPath(locale, `/blogs/${name}`),
      component: blogTemplate,
      context: {
        language: locale,
        title,
        date,
        author,
      },
    })
  })
}
