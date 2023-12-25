'use client'

import { usePathname } from 'next/navigation'
import useLocale from './use_locale'

/** get the current path without the locale section */
export default function useUnlocalizedPath() {
  const locale = useLocale()
  const pathname = usePathname()
  return pathname.replace(new RegExp(`^/${locale}`), ``)
}
