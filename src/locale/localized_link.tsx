'use client'

import { ComponentPropsWithoutRef } from 'react'
import useLocale from './use_locale'
import locales from './locales'
import useUnlocalizedPath from './use_unlocalized_path'

/** parse raw link to link that contains locale
 *  href must be an absolute link to the current domain, like `/home`
 * */
export default function LocalizedLink({
  href,
  locale,
  ...other
}: { locale?: (typeof locales)[number] } & ComponentPropsWithoutRef<'a'>) {
  const currentLocale = useLocale()
  const currentUnlocalizedPath = useUnlocalizedPath()
  return (
    <a
      href={`/${locale || currentLocale}${href || currentUnlocalizedPath}`}
      {...other}
    />
  )
}
