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
import { OpenInNew } from '@mui/icons-material'
import { parse } from 'yaml'
import { readdir } from 'fs/promises'
import type { GetStaticProps, NextPage } from 'next'
import { resolve } from 'path'
import { cwd } from 'process'
import { readFileSync } from 'fs'
import { PropsWithChildren } from 'react'
import { Project } from '../types/project'

export default (({ projects }) => {
  return (
    <Grid container direction="column" alignItems="center" spacing={10}>
      <Grid item mt={theme => theme.spacing(10)}>
        <Typography variant="h5" color="navy">
          Master in web, Amateur in everything
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h6" fontStyle="oblique" color="gray">
          Featured projects
        </Typography>
      </Grid>
      <Divider flexItem />
      <Grid item>
        <Grid container direction="row" justifyContent="center" spacing={10}>
          {projects.map((project, ind) => (
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
}) as NextPage<Props>

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

export const getStaticProps: GetStaticProps<Props> = async () => {
  const projects: Project[] = []
  const rootPath = resolve(cwd(), `contents`, `showcase`)
  for await (const file of (await readdir(rootPath)).filter(v =>
    /.*\.(yaml|yml)$/.test(v)
  )) {
    const project: Project = parse(
      readFileSync(resolve(rootPath, file), `utf8`)
    )
    if (!project.hidden && project.featured) {
      projects.push(project)
    }
  }
  projects.sort((a, b) => b.weight - a.weight)
  return { props: { projects } }
}

type Props = { projects: Project[] }
