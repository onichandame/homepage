import { PropsWithChildren } from 'react'
import { Params } from './type'
import { locales } from '@/locales'

export const dynamicParams = false

export async function generateStaticParams(): Promise<Params[]> {
  return locales.map(v => ({ lang: v }))
}

export default function Layout({
  children,
  params,
}: PropsWithChildren & { params: Params }) {
  return (
    <html lang={params.lang}>
      <body>{children}</body>
    </html>
  )
}
