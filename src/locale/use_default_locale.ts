import { useEffect, useState } from 'react'
import locales, { defaultLocale as appDefaultLocale } from './locales'

/** 获取defaultLocale和setDefaultLocale
 *
 * - defaultLocale: 有效的默认locale，按以下顺序查找：
 *     1. local storage
 *     2. navigator.language
 *     3. defaultLocale
 * - setDefaultLocale: 修改默认locale
 * */
export default function useDefaultLocale() {
  const key = `locale`
  const [defaultLocale, setDefaultLocale] = useState<
    (typeof locales)[number] | null
  >(null)

  useEffect(() => {
    setDefaultLocale(
      parseLang(window.localStorage.getItem(key) || ``) ||
        parseLang(navigator.language) ||
        appDefaultLocale,
    )
  }, [setDefaultLocale])

  return {
    defaultLocale,
    setDefaultLocale(locale: (typeof locales)[number]) {
      window.localStorage.setItem(key, locale)
    },
  }
}

/** 将string转换为locale。如果不合法，返回null */
function parseLang(locale: string) {
  return (
    // exact match
    locales.find(v => v === locale) ||
    // match lang(en) to locale(en-US)
    locales.find(v => v.split(`-`)[0] === locale) ||
    null
  )
}
