import { Divider, Grid, IconButton, Link, Typography } from '@mui/material'
import { ContentCopy } from '@mui/icons-material'
import { graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'

export default () => {
  const { t } = useTranslation()
  const email = `zxinmyth@gmail.com`
  return (
    <Grid container direction="column" spacing={8}>
      <Grid item mt={theme => theme.spacing(5)}>
        <Typography variant="subtitle1" color="gray" align="center">
          "{t(`selfDescription`)}"
        </Typography>
      </Grid>
      <Grid item>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h4">{t(`aboutMe`)}</Typography>
          </Grid>
          <Divider flexItem />
          <Grid item>
            <Typography variant="body1" sx={{ textIndent: `2rem` }}>
              {t(`aboutMeContent`)}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4">{t(`background`)}</Typography>
          </Grid>
          <Divider flexItem />
          <Grid item>
            <Typography variant="body1" sx={{ textIndent: `2rem` }}>
              {t(`backgroundContent`)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        Contact: <Link href={`mailto:${email}`}>Email</Link>
        <IconButton onClick={() => navigator.clipboard.writeText(email)}>
          <ContentCopy />
        </IconButton>
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
