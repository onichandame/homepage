'use client'

import { useParams } from 'next/navigation'
import locales from './locales'

/** 获取当前生效的locale */
export default function useLocale() {
  const {lang} = useParams<{ lang: string }>()
  return lang as (typeof locales)[number]
}
