import {
  Box,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Toolbar,
} from '@mui/material'
import { Helmet } from 'gatsby-plugin-react-i18next'
import { PropsWithChildren } from 'react'

import { Heading } from './heading'

const theme = createTheme({ palette: { mode: `dark` } })

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: `flex`, maxWidth: `100vw` }}>
        <Helmet>
          <title>onichandame's Homepage</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="icon" type="image/png" href="/icon.png" />
        </Helmet>
        <Heading />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            m: theme => theme.spacing(2),
            maxWidth: theme => `calc(100% - ${theme.spacing(2)}*2)`,
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  )
}
