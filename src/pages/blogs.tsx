import {
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from '@mui/material'
import { graphql, navigate, PageProps } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { PropsWithChildren } from 'react'

export default ({
  data,
}: PageProps<{
  articles: { edges: { node: BlogArticle }[] }
  metadatas: {
    edges: { node: BlogMetadata }[]
  }
}>) => {
  const { t } = useTranslation()
  const articles = data.articles.edges.map(v => v.node)
  const metadatas = data.metadatas.edges.map(v => v.node)
  const blogs: Blog[] = metadatas
    .map(metadata => {
      const article = articles.find(v => v.fields.name === metadata.fields.name)
      if (article) return { article, metadata }
    })
    .filter(v => !!v)
    .sort(
      (a, b) =>
        new Date(b.metadata.updatedAt).getTime() -
        new Date(a.metadata.updatedAt).getTime()
    )
  const featuredBlogs = blogs.filter(v => v.metadata.featured)
  const normalBlogs = blogs.filter(v => !v.metadata.featured)
  return (
    <Grid container direction="column" spacing={10} alignItems="center">
      <Grid item>
        <Grid container direction="column" spacing={3} alignItems="center">
          <Grid item>
            <Typography variant="h6" fontStyle="oblique" color="gray">
              {t(`featuredBlogs`)}
            </Typography>
          </Grid>
          <Divider flexItem />
          <Grid item>
            <Grid container direction="row" spacing={5} justifyContent="center">
              {featuredBlogs.map(blog => (
                <Grid
                  item
                  key={blog.metadata.fields.name}
                  sx={{ display: `flex` }}
                >
                  <BlogTile blog={blog} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="column" spacing={3} alignItems="center">
          <Grid item>
            <Typography variant="h6" fontStyle="oblique" color="gray">
              My Writings
            </Typography>
          </Grid>
          <Divider flexItem />
          <Grid item>
            <Grid container direction="row" spacing={5} justifyContent="center">
              {normalBlogs.map(blog => (
                <Grid
                  item
                  key={blog.metadata.fields.name}
                  sx={{ display: `flex` }}
                >
                  <BlogTile blog={blog} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

function BlogTile({ blog }: PropsWithChildren & { blog: Blog }) {
  return (
    <Card sx={{ width: 240 }} variant="outlined">
      <CardActionArea onClick={() => navigate(blog.metadata.fields.name)}>
        <CardMedia
          component="img"
          image={blog.metadata.image}
          height="200"
          alt={blog.metadata.fields.name}
        />
        <CardHeader
          title={blog.article.frontmatter.title}
          subheader={new Date(blog.metadata.updatedAt).toLocaleDateString()}
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
    articles: allMdx(
      filter: {
        fields: {
          sourceInstanceName: { eq: "blogs" }
          locale: { eq: $language }
        }
      }
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
    metadatas: allYaml(
      filter: {
        fields: { sourceInstanceName: { eq: "blogs" } }
        hidden: { ne: true }
      }
    ) {
      edges {
        node {
          fields {
            name
          }
          updatedAt
          featured
          image
        }
      }
    }
  }
`

type BlogArticle = {
  fields: { name: string }
  frontmatter: { title: string; date: Date }
}
type BlogMetadata = {
  fields: { name: string }
  updatedAt: Date
  featured?: boolean
  image: string
}
type Blog = { article: BlogArticle; metadata: BlogMetadata }
