'use client'

import { PropsWithChildren, useEffect, useState } from 'react'
import { defaultLocale, locales as recognizedLocales } from '@/locales'
import { usePathname } from 'next/navigation'

/** 检查pathname，如果不包含locale则重定向至默认locale */
export default function I18n({ children }: PropsWithChildren) {
  const path = usePathname()
  const [checked, setChecked] = useState(false)
  useEffect(() => {
    const userDefaultLang = parseLang(navigator.language)
    const browserDefaultLang = parseLang(
      window.localStorage.getItem(`lang`) || ``,
    )
    const defaultLang = userDefaultLang || browserDefaultLang || defaultLocale
    if (!recognizedLocales.some(v => path.startsWith(`/${v}`))) {
      window.localStorage.setItem(`lang`, defaultLang)
      window.location.href = `/${defaultLang}${path}`
    } else {
      setChecked(true)
    }
  }, [path])
  return checked ? children : <></>
}

function parseLang(locale: string) {
  return (
    // exact match
    recognizedLocales.find(v => v === locale) ||
    // match lang(en) to locale(en-US)
    recognizedLocales.find(v => v.split(`-`)[0] === locale) ||
    null
  )
}
