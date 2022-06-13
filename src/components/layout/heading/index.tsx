import { GitHub } from '@mui/icons-material'
import { AppBar, Grid, IconButton, Toolbar } from '@mui/material'

import { Locale } from './locale'
import { TitleLink } from './titleLink'

export const Heading = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: theme => theme.palette.background.paper,
      }}
    >
      <Toolbar>
        <Grid container direction="row" spacing={3}>
          <Grid item>
            <TitleLink href="/">Home</TitleLink>
          </Grid>
          <Grid item>
            <TitleLink href="/blogs">Blog</TitleLink>
          </Grid>
          <Grid item>
            <TitleLink href="/about">About</TitleLink>
          </Grid>
          <Grid item sx={{ flexGrow: 1 }} />
          <Grid item>
            <Locale />
          </Grid>
          <Grid item>
            <IconButton href="https://github.com/onichandame" target="_blank">
              <GitHub />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
