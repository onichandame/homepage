import { GatsbyNode } from 'gatsby'
import * as path from 'path'

const locales = [`en`, `cn`] as const
const defLocale: typeof locales[number] = `en`
const getLocalPath = (locale: string, path: string) =>
  [locale !== defLocale && `/${locale}`, path].filter(v => !!v).join(``)

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  actions,
  getNode,
}) => {
  const { createNodeField } = actions
  switch (node.internal.type) {
    case `Mdx`: {
      const { name, relativeDirectory, sourceInstanceName } = getNode(
        node.parent
      )
      createNodeField({
        node,
        name: 'sourceInstanceName',
        value: sourceInstanceName,
      })
      switch (sourceInstanceName) {
        case `blogs`:
          createNodeField({ node, name: 'locale', value: name })
          createNodeField({ node, name: 'name', value: relativeDirectory })
          break
      }
      break
    }
    case `Yaml`: {
      const { relativeDirectory, sourceInstanceName } = getNode(node.parent)
      createNodeField({
        node,
        name: 'sourceInstanceName',
        value: sourceInstanceName,
      })
      switch (sourceInstanceName) {
        case `blogs`:
          createNodeField({ node, name: 'name', value: relativeDirectory })
          break
      }
      break
    }
  }
}

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
}) => {
  const blogTemplate = path.resolve('./src/templates/blog/index.tsx')
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
        filter: { fields: { sourceInstanceName: { eq: "blogs" } } }
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
    createPage({
      path: getLocalPath(locale, `/blogs/${name}`),
      component: blogTemplate,
      context: {
        language: locale,
        name,
      },
    })
  })
}
