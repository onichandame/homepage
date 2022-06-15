import { OpenInNew } from '@mui/icons-material'
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  Link,
  Typography,
} from '@mui/material'
import { graphql, PageProps } from 'gatsby'
import { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'

import { Project } from '../types/project'

export default function ({
  data,
}: PageProps<{ featuredProjects: { edges: { node: Project }[] } }>) {
  const { t } = useTranslation()
  return (
    <Grid container direction="column" alignItems="center" spacing={10}>
      <Grid item mt={theme => theme.spacing(10)}>
        <Typography variant="h5" color="navy">
          {t(`selfDescription`)}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h6" fontStyle="oblique" color="gray">
          {t(`featuredProjects`)}
        </Typography>
      </Grid>
      <Divider flexItem />
      <Grid item>
        <Grid container direction="row" justifyContent="center" spacing={10}>
          {data.featuredProjects.edges.map(({ node: project }, ind) => (
            <Grid item key={ind} sx={{ display: `flex` }}>
              <Card sx={{ width: 240 }} variant="outlined">
                <CardHeader title={project.title} />
                <CardMedia
                  component="img"
                  image={project.image}
                  alt={project.title}
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color={theme => theme.palette.text.secondary}
                  >
                    {project.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                  >
                    {project.git && (
                      <Grid item>
                        <CardButton href={project.git}>Repo</CardButton>
                      </Grid>
                    )}
                    {project.homepage && (
                      <Grid item>
                        <CardButton href={project.homepage}>Link</CardButton>
                      </Grid>
                    )}
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

function CardButton({ children, href }: PropsWithChildren & { href: string }) {
  return (
    <Link href={href} underline="none" target="_blank">
      <Grid container direction="row" alignItems="center" spacing={1}>
        <Grid item>{children}</Grid>
        <Grid item>
          <OpenInNew />
        </Grid>
      </Grid>
    </Link>
  )
}

export const query = graphql`
  # gql
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
    featuredProjects: allProjectsYaml(
      filter: { hidden: { ne: true }, featured: { eq: true } }
    ) {
      edges {
        node {
          description
          git
          homepage
          image
          title
          weight
        }
      }
    }
  }
`
