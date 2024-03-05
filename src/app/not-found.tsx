'use client'

import locales from '@/locale/locales'
import useDefaultLocale from '@/locale/use_default_locale'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { FaSpinner } from 'react-icons/fa'

export default function NotFound() {
  const path = usePathname()
  const { defaultLocale, setDefaultLocale } = useDefaultLocale()
  useEffect(() => {
    if (defaultLocale && !locales.some(v => path.startsWith(`/${v}`))) {
      setDefaultLocale(defaultLocale)
      window.location.href = `/${defaultLocale}${path}`
    }
  }, [path, defaultLocale])
  return (
    <html>
      <body>
        <FaSpinner className="animate-spin" />
      </body>
    </html>
  )
}
