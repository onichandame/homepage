import { MenuItem, Typography } from '@mui/material'
import { useI18next } from 'gatsby-plugin-react-i18next'
import { PropsWithChildren } from 'react'

export const TitleLink = ({
  children,
  href,
}: PropsWithChildren & { href: string }) => {
  const { navigate } = useI18next()
  return (
    <MenuItem
      onClick={() => {
        navigate(href)
      }}
    >
      <Typography variant="h6">{children}</Typography>
    </MenuItem>
  )
}
