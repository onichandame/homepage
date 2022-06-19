import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { graphql, PageProps } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { CopyBlock, nord } from 'react-code-blocks'

export default ({
  data,
}: PageProps<{
  blog: {
    frontmatter: {
      title: string
    }
    body: string
    timeToRead: number
  }
  metadata: {
    updatedAt: Date
    featured?: boolean
  }
}>) => {
  return (
    <Grid container direction={'column'} alignItems="center">
      <Grid item>
        <Typography variant={'h3'} sx={{ whiteSpace: `pre-wrap` }}>
          {data.blog.frontmatter.title}
        </Typography>
      </Grid>
      <Grid item sx={{ padding: theme => theme.spacing(2) }}>
        <Grid container direction="row" justifyContent="center">
          <Grid item lg={8} xs={12}>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between" direction="row">
                  <Grid item>
                    <Typography variant="caption">
                      {data.blog.timeToRead}min
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant={'caption'}>
                      {new Date(data.metadata.updatedAt).toLocaleDateString()}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <MDXProvider
                  components={{
                    table: ({ children }) => <Table>{children}</Table>,
                    thead: ({ children }) => <TableHead>{children}</TableHead>,
                    tbody: ({ children }) => <TableBody>{children}</TableBody>,
                    tr: ({ children }) => <TableRow>{children}</TableRow>,
                    th: ({ children }) => (
                      <TableCell component="th" align="center">
                        {children}
                      </TableCell>
                    ),
                    td: ({ children }) => <TableCell>{children}</TableCell>,
                    img: props => (
                      <Grid container direction="column" alignItems="center">
                        <Grid item>
                          <Box
                            component="img"
                            sx={{ maxWidth: `100%` }}
                            {...props}
                          />
                        </Grid>{' '}
                      </Grid>
                    ),
                    pre: ({ children }) => (
                      <Box
                        component="pre"
                        sx={{ maxWidth: `100%`, overflowX: `auto` }}
                      >
                        {children}
                      </Box>
                    ),
                    code: ({ children, className }) => (
                      <CopyBlock
                        text={children}
                        language={
                          className?.split(`language-`)[1]?.split(` `).pop() ||
                          `text`
                        }
                        showLineNumbers
                        wrapLongLines
                        theme={nord}
                      />
                    ),
                  }}
                >
                  <MDXRenderer>{data.blog.body}</MDXRenderer>
                </MDXProvider>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
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
      timeToRead
    }
    metadata: yaml(
      hidden: { ne: true }
      fields: { sourceInstanceName: { eq: "blogs" }, name: { eq: $name } }
    ) {
      updatedAt
      featured
    }
  }
`
