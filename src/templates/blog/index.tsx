import { Grid, Typography } from '@mui/material'
import { graphql, PageProps } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

export default ({
  data,
}: PageProps<{
  blog: {
    frontmatter: {
      title: string
    }
    body: string
  }
  metadata: {
    updatedAt: Date
    hidden?: boolean
    featured?: boolean
  }
}>) => {
  return (
    <Grid container direction={'column'} alignItems="stretch">
      <Grid item>
        <Typography variant={'h3'}>{data.blog.frontmatter.title}</Typography>
      </Grid>
      <Grid item>
        <Grid container justifyContent="end" direction="row">
          <Grid item>
            <Typography variant={'caption'}>
              {new Date(data.metadata.updatedAt).toLocaleString()}
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
  query ($language: String!, $name: String!) {
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
      fields: {
        locale: { eq: $language }
        name: { eq: $name }
        sourceInstanceName: { eq: "blogs" }
      }
    ) {
      frontmatter {
        title
      }
      body
    }
    metadata: yaml(
      hidden: { ne: true }
      featured: { eq: true }
      fields: { sourceInstanceName: { eq: "blogs" }, name: { eq: $name } }
    ) {
      updatedAt
      hidden
      featured
    }
  }
`
