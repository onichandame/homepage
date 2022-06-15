import { Grid, Typography } from '@mui/material'
import { graphql, PageProps } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

export default ({
  data,
}: PageProps<{
  blog: {
    frontmatter: {
      title: string
      author: string
      date: string
    }
    body: string
  }
}>) => {
  return (
    <Grid container direction={'column'} alignItems="stretch">
      <Grid item>
        <Typography variant={'h3'}>{data.blog.frontmatter.title}</Typography>
      </Grid>
      <Grid item>
        <Grid container justifyContent="space-between" direction="row">
          <Grid item>
            <Typography variant={'caption'}>
              {data.blog.frontmatter.author}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant={'caption'}>
              {new Date(data.blog.frontmatter.date).toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sx={{ padding: theme => theme.spacing(2) }}>
        <MDXRenderer>{data.blog.body}</MDXRenderer>
      </Grid>
    </Grid>
  )
}

export const query = graphql`
  query ($language: String!, $title: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    blog: mdx(
      frontmatter: { title: { eq: $title } }
      fields: { locale: { eq: $language }, sourceInstanceName: { eq: "posts" } }
    ) {
      frontmatter {
        title
        author
        date
      }
      body
    }
  }
`
