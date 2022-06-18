import { Divider, Grid, Typography } from '@mui/material'
import { graphql } from 'gatsby'
import { Link } from 'gatsby-plugin-react-i18next'

export default () => {
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <Grid container justifyContent="center" alignItems="center" spacing={4}>
          <Grid item>
            <Typography variant="h5" fontWeight="bold">
              404
            </Typography>
          </Grid>
          <Divider flexItem orientation="vertical" />
          <Grid item>
            The page you are looking for does not exist yet. Explore{' '}
            <Link to="/">the home page</Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
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
  }
`
