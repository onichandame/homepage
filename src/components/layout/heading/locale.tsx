import { KeyboardArrowDown } from '@mui/icons-material'
import { useI18next } from 'gatsby-plugin-react-i18next'
import { Button, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'

export const Locale = () => {
  const { t, languages, language, changeLanguage } = useI18next()
  const [anchor, setAnchor] = useState<null | HTMLElement>(null)
  return (
    <>
      <Button
        variant="contained"
        color="inherit"
        endIcon={<KeyboardArrowDown />}
        onClick={e => setAnchor(e.currentTarget)}
      >
        {t(language, { lng: language })}
      </Button>
      <Menu open={!!anchor} anchorEl={anchor} onClose={() => setAnchor(null)}>
        {languages.map(lang => (
          <MenuItem
            key={lang}
            onClick={() => {
              changeLanguage(lang)
              setAnchor(null)
            }}
          >
            {t(lang, { lngs: languages, lng: lang })}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
