import { Box, CssBaseline, Toolbar } from '@mui/material'
import { PropsWithChildren } from 'react'

import { Heading } from './heading'

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: `flex`, maxWidth: `100vw` }}>
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
    </>
  )
}
