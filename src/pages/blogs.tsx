import {
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  Grid,
} from '@mui/material'
import { graphql, PageProps } from 'gatsby'
import { useI18next } from 'gatsby-plugin-react-i18next'
import { PropsWithChildren } from 'react'

export default ({
  data,
}: PageProps<{
  blogs: { edges: { node: Blog }[] }
}>) => {
  const blogs = data.blogs.edges.map(v => v.node)
  return (
    <Grid container direction="row" spacing={5}>
      {blogs.map(blog => (
        <Grid item key={blog.fields.name} sx={{ display: `flex` }}>
          <BlogTile blog={blog} />
        </Grid>
      ))}
    </Grid>
  )
}

function BlogTile({ blog }: PropsWithChildren & { blog: Blog }) {
  const { navigate } = useI18next()
  return (
    <Card sx={{ width: 240 }} variant="outlined">
      <CardActionArea onClick={() => navigate(blog.fields.name)}>
        <CardMedia
          component="img"
          image={blog.image}
          height="200"
          alt={blog.slug}
        />
        <CardHeader
          title={blog.title[router.locale || ``]}
          subheader={new Date(blog.updatedAt).toLocaleDateString()}
        />
      </CardActionArea>
    </Card>
  )
}

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    blogs: allMdx(
      filter: { fields: { sourceInstanceName: "posts", locale: $language } }
    ) {
      edges {
        node {
          fields {
            name
          }
          frontmatter {
            title
            date
          }
        }
      }
    }
  }
`

type Blog = {
  fields: { name: string }
  frontmatter: { title: string; date: Date }
}
